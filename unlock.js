(() => {
  "use strict";

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const form = document.querySelector("#gateForm");
  const input = document.querySelector("#gatePassword");
  const button = document.querySelector("#gateSubmit");
  const status = document.querySelector("#gateStatus");
  const blobUrls = new Set();
  let manifestPromise;

  function decodeBase64Url(value) {
    const normalized = String(value || "").replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
    const binary = atob(padded);
    return Uint8Array.from(binary, character => character.charCodeAt(0));
  }

  function safePublishedPath(value, pattern) {
    const path = String(value || "");
    if (!pattern.test(path) || path.includes("..") || path.includes("\\")) {
      throw new Error("加密资源清单无效");
    }
    return path;
  }

  async function fetchJson(path) {
    const response = await fetch(path, { cache: "no-store", credentials: "same-origin" });
    if (!response.ok) throw new Error(`无法加载门禁配置（${response.status}）`);
    return response.json();
  }

  async function fetchBytes(path) {
    const response = await fetch(path, { cache: "no-store", credentials: "same-origin" });
    if (!response.ok) throw new Error(`无法加载加密内容（${response.status}）`);
    return response.arrayBuffer();
  }

  async function loadManifest() {
    const manifest = await fetchJson("secure/manifest.json");
    if (manifest?.version !== 1 ||
        manifest.kdf?.name !== "PBKDF2" ||
        manifest.kdf?.hash !== "SHA-256" ||
        !Number.isInteger(manifest.kdf?.iterations) ||
        manifest.kdf.iterations < 600_000 ||
        manifest.cipher?.name !== "AES-GCM" ||
        manifest.cipher?.length !== 256 ||
        manifest.cipher?.tagLength !== 128 ||
        manifest.cipher?.additionalData !== "hawaii-gate:v1:payload") {
      throw new Error("加密资源版本不受支持");
    }
    safePublishedPath(manifest.payload, /^secure\/payload\.bin$/);
    return manifest;
  }

  async function deriveKey(password, manifest) {
    const material = await crypto.subtle.importKey(
      "raw",
      encoder.encode(password),
      "PBKDF2",
      false,
      ["deriveKey"]
    );
    return crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        hash: manifest.kdf.hash,
        salt: decodeBase64Url(manifest.kdf.salt),
        iterations: manifest.kdf.iterations
      },
      material,
      { name: "AES-GCM", length: manifest.cipher.length },
      false,
      ["decrypt"]
    );
  }

  function decrypt(key, ciphertext, iv, additionalData) {
    return crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: decodeBase64Url(iv),
        additionalData: encoder.encode(additionalData),
        tagLength: 128
      },
      key,
      ciphertext
    );
  }

  function validatePayload(payload) {
    if (payload?.version !== 1 ||
        typeof payload.title !== "string" ||
        typeof payload.body !== "string" ||
        !payload.trip?.days ||
        !payload.booking?.rows ||
        !payload.assets ||
        typeof payload.assets !== "object") {
      throw new Error("解锁后的内容格式无效");
    }
  }

  function installAssetLoader(key, assets) {
    const pending = new Map();
    globalThis.HAWAII_LOAD_SECURE_ASSET = relativePath => {
      const path = String(relativePath || "");
      if (pending.has(path)) return pending.get(path);
      const record = assets[path];
      if (!record) return Promise.reject(new Error("地图资源未包含在加密包中"));
      const promise = (async () => {
        const file = safePublishedPath(record.file, /^secure\/assets\/[a-f0-9]{32}\.bin$/);
        const ciphertext = await fetchBytes(file);
        const plaintext = await decrypt(
          key,
          ciphertext,
          record.iv,
          `hawaii-gate:v1:asset:${path}`
        );
        const url = URL.createObjectURL(new Blob([plaintext], { type: record.type || "application/octet-stream" }));
        blobUrls.add(url);
        return url;
      })();
      pending.set(path, promise);
      promise.catch(() => pending.delete(path));
      return promise;
    };
  }

  function loadApplicationScript() {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "hawaii-trip.js?v=20260829g2";
      script.onload = resolve;
      script.onerror = () => reject(new Error("网页程序加载失败"));
      document.body.append(script);
    });
  }

  async function unlock(password) {
    if (!globalThis.crypto?.subtle) throw new Error("当前浏览器不支持安全解锁，请使用最新版浏览器并通过 HTTPS 访问");
    manifestPromise ||= loadManifest();
    const manifest = await manifestPromise;
    const key = await deriveKey(password, manifest);
    const ciphertext = await fetchBytes(manifest.payload);
    const plaintext = await decrypt(
      key,
      ciphertext,
      manifest.cipher.iv,
      manifest.cipher.additionalData
    );
    const payload = JSON.parse(decoder.decode(plaintext));
    validatePayload(payload);

    installAssetLoader(key, payload.assets);
    globalThis.TRIP_SHARED_STATE_CONFIG = payload.sharedConfig || {};
    globalThis.HAWAII_TRIP_DATA = payload.trip;
    globalThis.BOOKING_TABLE_DATA = payload.booking;

    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "hawaii-trip.css?v=20260829g2";
    document.head.append(stylesheet);
    document.title = payload.title;
    document.body.className = "";
    document.body.innerHTML = payload.body;
    await loadApplicationScript();
  }

  form.addEventListener("submit", async event => {
    event.preventDefault();
    const password = input.value;
    input.value = "";
    button.disabled = true;
    status.dataset.state = "busy";
    status.textContent = "正在本机解锁加密行程…";
    try {
      await unlock(password);
    } catch (error) {
      console.warn("行程解锁失败", error);
      status.dataset.state = "error";
      status.textContent = "无法解锁。请检查共享密码和网络后重试。";
      button.disabled = false;
      input.focus();
    }
  });

  addEventListener("pagehide", () => {
    blobUrls.forEach(url => URL.revokeObjectURL(url));
    blobUrls.clear();
  });
})();
