(() => {
  "use strict";

  const TRIP = globalThis.HAWAII_TRIP_DATA;
  const BOOKING = globalThis.BOOKING_TABLE_DATA;
  if (!TRIP || !BOOKING) throw new Error("行程数据未加载");

  const $ = selector => document.querySelector(selector);
  const storageKey = "hawaii-trip-unified-table-v2";
  const oldAssignmentStorageKey = "hawaii-trip-assignment-roster-v1";
  const oldBookingStorageKey = "hawaii-trip-booking-checklist-v1";
  const priorityRank = {最高:0, 高:1, 中:2, 低:3};
  const editableFields = ["completion","priority","owner","participantCount","names","status","deadline","quote","reference","notes"];
  let showAllBookings = false;
  let workbookReady = false;
  let budgetReady = false;

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
    })[char]);
  }

  function parseStored(key) {
    try { return JSON.parse(localStorage.getItem(key) || "{}"); }
    catch (_) { return {}; }
  }

  let workbookState = parseStored(storageKey);
  const oldAssignmentState = parseStored(oldAssignmentStorageKey);
  const oldBookingState = parseStored(oldBookingStorageKey);

  BOOKING.rows.forEach(row => {
    const current = workbookState[row.key] || {};
    const legacyRoster = oldAssignmentState[row.key] || {};
    const legacyBookingKey = row.legacyKey || row.key;
    if (!("participantCount" in current) && legacyRoster.count) current.participantCount = legacyRoster.count;
    if (!("names" in current) && legacyRoster.names) current.names = legacyRoster.names;
    if (!("completion" in current) && Object.prototype.hasOwnProperty.call(oldBookingState, legacyBookingKey)) {
      current.completion = oldBookingState[legacyBookingKey] ? "☑ 已完成" : "☐ 未完成";
    }
    workbookState[row.key] = current;
  });

  // This release contains authoritative supplier confirmations. Clear only the
  // stale locally editable fields that would otherwise mask those updates.
  const reservationSyncKey = "hawaii-trip-reservation-sync-20260904r6";
  if (!localStorage.getItem(reservationSyncKey)) {
    const authoritativeFields = {
      "rental-oahu": ["completion","status","deadline","quote","reference","notes"],
      "helicopter": ["completion","confirmation","status","deadline","quote","reference","notes"],
      "koolau-distillery": ["completion","status"],
      "kualoa": ["completion","confirmation","status","deadline","quote","reference","notes"],
      "marriott-yoga": ["completion","confirmation","status","deadline","notes"],
      "oahu-bar": ["completion","priority","status","deadline","notes"],
      "stay-tokyo": ["completion","status"]
    };
    Object.entries(authoritativeFields).forEach(([key, fields]) => {
      if (!workbookState[key]) return;
      fields.forEach(field => delete workbookState[key][field]);
    });
    localStorage.setItem(reservationSyncKey, "1");
  }
  persistState();

  function persistState() {
    localStorage.setItem(storageKey, JSON.stringify(workbookState));
  }

  function rowValue(row, field) {
    const state = workbookState[row.key] || {};
    return Object.prototype.hasOwnProperty.call(state, field) ? state[field] : row[field];
  }

  function rosterNames(value) {
    return String(value || "").split(/[、,，;；\n]+/).map(item => item.trim()).filter(Boolean);
  }

  function confirmationFor(row) {
    const original = rowValue(row, "confirmation");
    if (["不参加","已确认","部分确认"].includes(original)) return original;
    const count = Number(rowValue(row, "participantCount") || 0);
    const names = rosterNames(rowValue(row, "names"));
    if (!names.length) return "待填写";
    if (count > 0 && names.length === count) return "已确认";
    return "部分确认";
  }

  function mergedRow(row) {
    const merged = {...row};
    editableFields.forEach(field => { merged[field] = rowValue(row, field); });
    merged.confirmation = confirmationFor(row);
    return merged;
  }

  function allRows() {
    return BOOKING.rows.map(mergedRow);
  }

  function isDone(row) {
    return row.completion === "☑ 已完成";
  }

  function needsReservation(row) {
    return row.taskType === "booking" && !["已取消","无需预订"].includes(row.status);
  }

  function deadlineValue(deadline) {
    return /^\d{4}-\d{2}-\d{2}$/.test(deadline || "") ? deadline : "9999-99-99";
  }

  function deadlineLabel(row) {
    if (/^\d{4}-\d{2}-\d{2}$/.test(row.deadline || "")) {
      const [,month,day] = row.deadline.split("-");
      return `${Number(month)}/${Number(day)} 前`;
    }
    return row.deadline || "尽快";
  }

  function sortedTasks(rows) {
    return [...rows].sort((a,b) =>
      deadlineValue(a.deadline).localeCompare(deadlineValue(b.deadline)) ||
      (priorityRank[a.priority] ?? 9) - (priorityRank[b.priority] ?? 9) ||
      a.item.localeCompare(b.item, "zh-CN")
    );
  }

  function updateRow(key, field, value) {
    workbookState[key] = {...(workbookState[key] || {}), [field]:value};
    persistState();
    renderTaskHub();
    renderDayNav();
    renderActiveDay();
    if (workbookReady) renderWorkbookTable();
  }

  function renderOverview() {
    const overview = TRIP.overview;
    $("#tripTitle").textContent = overview.title;
    $("#tripDates").textContent = overview.dates;
    $("#tripParty").textContent = overview.party;
    $("#tripRoute").textContent = overview.route;
    $("#bigIslandStay").textContent = overview.bigIslandStay;
    $("#oahuStay").textContent = overview.oahuStay;
    $("#vehiclePlan").textContent = overview.vehicle;
    $("#keyFlights").textContent = overview.keyFlights;
  }

  function taskRowHtml(row, compact = false) {
    const placement = row.placements?.[0];
    const jump = placement ? `data-jump-day="${placement.dayId}" data-jump-stop="${placement.stopId}"` : "";
    return `<article class="task-row ${isDone(row) ? "done" : ""}" data-task-key="${escapeHtml(row.key)}">
      <input type="checkbox" data-task-complete="${escapeHtml(row.key)}" aria-label="标记 ${escapeHtml(row.item)} 完成" ${isDone(row) ? "checked" : ""}>
      <button type="button" class="task-main" ${jump}>
        <b>${escapeHtml(row.item)}</b>
        <span>${escapeHtml(row.when)} · 负责人：${escapeHtml(row.owner || "待分配")}${compact ? "" : ` · ${escapeHtml(row.status)}`}</span>
      </button>
      <span class="task-deadline">${escapeHtml(deadlineLabel(row))}</span>
    </article>`;
  }

  function renderTaskHub() {
    const rows = allRows();
    const reservable = rows.filter(needsReservation);
    const pending = sortedTasks(reservable.filter(row => !isDone(row)));
    const doneCount = reservable.filter(isDone).length;
    const urgentCount = pending.filter(row => row.priority === "最高").length;
    $("#taskKpis").innerHTML = `
      <div class="task-kpi urgent"><b>${pending.length}</b><span>待预约</span></div>
      <div class="task-kpi"><b>${urgentCount}</b><span>最高优先</span></div>
      <div class="task-kpi"><b>${doneCount}</b><span>已完成</span></div>`;
    const visible = showAllBookings ? pending : pending.slice(0,6);
    $("#urgentTaskList").innerHTML = visible.length
      ? visible.map(row => taskRowHtml(row)).join("")
      : '<p class="support-note">当前没有待预约事项。</p>';
    const toggle = $("#toggleAllTasks");
    toggle.hidden = pending.length <= 6;
    toggle.textContent = showAllBookings ? "收起预约列表" : `查看全部 ${pending.length} 项预约`;

    const preparations = sortedTasks(rows.filter(row => row.taskType === "preparation" && !isDone(row)));
    $("#prepCount").textContent = preparations.length ? `${preparations.length} 项待处理` : "全部完成";
    $("#prepTaskList").innerHTML = preparations.length
      ? preparations.map(row => taskRowHtml(row, true)).join("")
      : '<p class="support-note">其他行前准备已全部完成。</p>';

    $("#workbookSummary").textContent = `${rows.length} 项 · ${rows.filter(isDone).length} 项已完成`;
  }

  function activeDayFromHash() {
    const match = location.hash.match(/^#(d(?:[1-9]|1[0-3]))$/);
    return match && TRIP.days.some(day => day.id === match[1]) ? match[1] : "d1";
  }

  let activeDayId = activeDayFromHash();

  function dayPendingCount(dayId) {
    return allRows().filter(row =>
      needsReservation(row) && !isDone(row) &&
      (row.placements || []).some(item => item.dayId === dayId)
    ).length;
  }

  function renderDayNav() {
    $("#dayNav").innerHTML = TRIP.days.map(day => {
      const pending = dayPendingCount(day.id);
      const shortTheme = day.theme.split("·")[0].trim();
      return `<button type="button" data-day-id="${day.id}" class="${day.id === activeDayId ? "active" : ""}" aria-pressed="${day.id === activeDayId}">
        <b>${escapeHtml(day.date)} · ${escapeHtml(day.weekday)}</b>
        <span class="nav-theme">${escapeHtml(shortTheme)}</span>
        <span>${pending ? `<i class="nav-task-count">${pending}项待预约</i>` : "行程已就绪"}</span>
      </button>`;
    }).join("");
    $("#dayNav button.active")?.scrollIntoView({block:"nearest",inline:"center"});
  }

  function stopRows(dayId, stopId) {
    return allRows().filter(row =>
      (row.placements || []).some(item => item.dayId === dayId && item.stopId === stopId)
    );
  }

  function bookingInlineHtml(rows) {
    if (!rows.length) return "";
    return `<div class="booking-inline ${rows.every(isDone) ? "done" : ""}">
      ${rows.map(row => `<div class="booking-line">
        <input type="checkbox" data-task-complete="${escapeHtml(row.key)}" aria-label="标记 ${escapeHtml(row.item)} 完成" ${isDone(row) ? "checked" : ""}>
        <div><b>${escapeHtml(row.item)}</b><span>${escapeHtml(row.owner || "待分配")} · ${escapeHtml(row.status)}${row.deadline ? ` · 截止 ${escapeHtml(row.deadline)}` : ""}</span></div>
        <button class="booking-link" type="button" data-open-workbook="${escapeHtml(row.key)}">完整信息</button>
      </div>`).join("")}
    </div>`;
  }

  function parkingHtml(items) {
    if (!items?.length) return "";
    const summary = items.length === 1
      ? `停车 · ${escapeHtml(items[0].fee)}`
      : `停车 · ${items.length} 处`;
    return `<details class="inline-detail parking-detail">
      <summary>🅿️ ${summary}</summary>
      <div class="inline-detail-body">${items.map(item => `<div class="parking-entry">
        <b>${escapeHtml(item.name)}</b>
        <span class="parking-fee">${escapeHtml(item.fee)}</span>
        <p>${escapeHtml(item.location)}</p>
        <p>${escapeHtml(item.note)}</p>
        <a href="https://www.google.com/maps/search/?api=1&amp;query=${encodeURIComponent(item.mapQuery)}" target="_blank" rel="noopener">导航到停车点</a>
        ${item.sourceUrl ? `<a href="${escapeHtml(item.sourceUrl)}" target="_blank" rel="noopener">规则 / 来源</a>` : ""}
      </div>`).join("")}</div>
    </details>`;
  }

  function diningHtml(items) {
    if (!items?.length) return "";
    const [primary,...alternatives] = items;
    const primaryBooking = primary.bookingKey ? allRows().find(row => row.key === primary.bookingKey) : null;
    return `<div class="dining-primary">
      <b>🍽 ${escapeHtml(primary.role)} · ${escapeHtml(primary.name)}</b>
      <span>${escapeHtml(primary.hours)} · ${escapeHtml(primary.note)}${primaryBooking && needsReservation(primaryBooking) ? ` · ${isDone(primaryBooking) ? "已完成预约" : "需要提前预约"}` : ""}</span>
      ${primary.url ? `<a href="${escapeHtml(primary.url)}" target="_blank" rel="noopener">查看官网</a>` : ""}
    </div>
    ${alternatives.length ? `<div class="stop-tools"><details class="inline-detail dining-detail">
      <summary>🍴 查看 ${alternatives.length} 个餐厅备选</summary>
      <div class="inline-detail-body">${alternatives.map(item => `<div class="dining-entry">
        <b>${escapeHtml(item.role)} · ${escapeHtml(item.name)}</b>
        <span class="dining-role">${escapeHtml(item.hours)}</span>
        <p>${escapeHtml(item.note)}</p>
        ${item.url ? `<a href="${escapeHtml(item.url)}" target="_blank" rel="noopener">查看官网</a>` : ""}
      </div>`).join("")}</div>
    </details></div>` : ""}`;
  }

  function resourcesHtml(resources) {
    if (!resources?.length) return "";
    return resources.map(resource => `<details class="inline-detail resource-detail">
      <summary>📎 ${escapeHtml(resource.title)}</summary>
      <div class="inline-detail-body resource-entry">
        <p>${escapeHtml(resource.note)}</p>
        ${(resource.links || []).map(link => `<a href="${escapeHtml(link.url)}" ${/^https?:|^tel:|^mailto:/.test(link.url) ? 'target="_blank" rel="noopener"' : ""}>${escapeHtml(link.label)}</a>${link.meta ? `<p>${escapeHtml(link.meta)}</p>` : ""}`).join("")}
        ${resource.rule ? `<p><b>${escapeHtml(resource.rule)}</b></p>` : ""}
      </div>
    </details>`).join("");
  }

  function renderStop(day, stopId, nested = false) {
    const stop = day.stops.find(item => item.id === stopId);
    if (!stop) return "";
    const rows = stopRows(day.id, stop.id);
    const actionable = rows.filter(needsReservation);
    const badge = actionable.length
      ? `<span class="stop-badge ${actionable.every(isDone) ? "complete" : "reserve"}">${actionable.every(isDone) ? "预约已完成" : "需提前预约"}</span>`
      : "";
    return `<article class="stop ${stop.emphasis ? "emphasis" : ""}" id="${stop.id}">
      <span class="stop-dot" aria-hidden="true"></span>
      <div class="stop-card">
        <div class="stop-title-row"><h3 class="stop-title">${stop.title}</h3>${badge}</div>
        <p class="stop-copy">${stop.description}</p>
        ${bookingInlineHtml(rows)}
        ${diningHtml(stop.dining)}
        <div class="stop-tools">${parkingHtml(stop.parking)}${resourcesHtml(stop.resources)}</div>
      </div>
    </article>`;
  }

  function renderFlow(day) {
    return day.flow.map(entry => {
      if (entry.kind === "stop") return renderStop(day, entry.stopId);
      const merge = renderStop(day, entry.mergeStopId, true);
      return `<section class="branch-group" aria-label="并行分组行程">
        <div class="branch-head">分组行动 · 两条支线完成后重新汇合</div>
        <div class="branch-lanes">${entry.lanes.map(lane => `<div class="branch-lane">
          <h4>支线 ${lane.key.toUpperCase()} · ${escapeHtml(lane.label)}</h4>
          <div class="timeline">${lane.stopIds.map(stopId => renderStop(day, stopId, true)).join("")}</div>
        </div>`).join("")}</div>
        <div class="branch-merge">${merge}</div>
      </section>`;
    }).join("");
  }

  function reminderHtml(day) {
    const primary = day.reminders.slice(0,4);
    const extra = [...day.reminders.slice(4).map(item => item.text), ...day.notes, ...day.context];
    return `<section class="reminder-strip">
      <h3>今日执行提醒</h3>
      <ul>${primary.map(item => `<li>${item.text}</li>`).join("")}</ul>
      ${extra.length ? `<details><summary>展开全部提醒（${extra.length + primary.length}项）</summary><ul>${extra.map(item => `<li>${item}</li>`).join("")}</ul></details>` : ""}
    </section>`;
  }

  function renderActiveDay() {
    const day = TRIP.days.find(item => item.id === activeDayId) || TRIP.days[0];
    activeDayId = day.id;
    const wakeMetric = day.wake && day.depart ? `<span class="metric"><strong>起床 ${escapeHtml(day.wake)}</strong> · 出发 ${escapeHtml(day.depart)}</span>` : "";
    const budgetClass = String(day.budget || "").length > 26 ? " long" : "";
    $("#dayView").innerHTML = `<article class="day-canvas" data-active-day="${day.id}">
      <header class="day-header">
        <div class="day-heading">
          <div class="day-date" style="background:${escapeHtml(day.color)}"><b>${escapeHtml(day.date)}</b><span>${escapeHtml(day.weekday)}</span></div>
          <div class="day-title"><p class="eyebrow">${escapeHtml(day.month)} · DAILY PLAN</p><h2>${escapeHtml(day.theme)}</h2><p>${escapeHtml(day.tag)}</p></div>
          <div class="day-budget${budgetClass}"><span>当日预算 / 人</span><b>${escapeHtml(day.budget)}</b></div>
        </div>
        <div class="day-metrics">
          ${wakeMetric}
          <span class="metric"><strong>驾驶</strong> · ${escapeHtml(day.route.drive)}</span>
          <span class="metric"><strong>距离</strong> · ${escapeHtml(day.route.dist)}</span>
          <span class="metric"><strong>用车</strong> · ${escapeHtml(day.vehicle)}</span>
          <span class="metric"><strong>餐饮</strong> · ${escapeHtml(day.meals)}</span>
        </div>
        ${reminderHtml(day)}
      </header>
      <div class="timeline-wrap">
        <div class="timeline-label"><h3>当日时间线</h3><span>停车、餐厅和预约均已放入对应节点</span></div>
        <div class="timeline">${renderFlow(day)}</div>
        <details class="route-disclosure" data-route-day="${day.id}">
          <summary>${day.route.noMap ? "查看交通衔接" : day.route.liveOnly ? "查看分组路线与实时导航说明" : "查看高清路线图与实时导航"}</summary>
          <div class="map-host"><p class="map-loading">展开后加载该日地图。</p></div>
        </details>
      </div>
    </article>`;
  }

  function mapsUrl(route) {
    const segments = [route.origin,...(route.waypoints || []),route.dest].filter(Boolean);
    return "https://www.google.com/maps/dir/" + segments.map(encodeURIComponent).join("/") + "/";
  }

  function renderRouteMaps(day, host) {
    if (host.dataset.loaded) return;
    const route = day.route;
    if (route.noMap) {
      host.innerHTML = `<div class="transit-line">${(route.transitNodes || []).map((node,index) =>
        `${index ? '<span class="transit-arrow">→</span>' : ""}<div class="transit-node"><b>${escapeHtml(node.name)}</b><span>${escapeHtml(node.sub)}</span></div>`
      ).join("")}</div>`;
    } else if (route.liveOnly) {
      host.innerHTML = `<p class="map-loading">${escapeHtml(route.mapNote || "当天按实际选择使用实时导航。")}</p>`;
    } else {
      const maps = route.maps?.length ? route.maps : [{
        img:`day-${day.id}.png`,
        label:`${day.date} 完整驾车路线`,
        origin:route.origin,waypoints:route.waypoints,dest:route.dest
      }];
      const secureAssetLoader = typeof globalThis.HAWAII_LOAD_SECURE_ASSET === "function"
        ? globalThis.HAWAII_LOAD_SECURE_ASSET
        : null;
      host.innerHTML = maps.map((map,index) => {
        const src = `maps/${encodeURIComponent(map.img)}`;
        return `<section class="map-segment">
          <h4>${escapeHtml(map.label)}</h4>
          <a class="image-link" ${secureAssetLoader ? `data-secure-map-link="${index}"` : `href="${src}"`} target="_blank" rel="noopener" title="打开原始高清大图">
            <img ${secureAssetLoader ? `data-secure-map-image="${index}"` : `src="${src}"`} alt="${escapeHtml(day.date + " " + map.label)}">
          </a>
          <div class="map-actions"><a href="${mapsUrl(map)}" target="_blank" rel="noopener">${escapeHtml(map.btn || (index ? "打开分段导航" : "在 Google Maps 中打开"))}</a></div>
        </section>`;
      }).join("");
      if (secureAssetLoader) {
        maps.forEach((map,index) => {
          secureAssetLoader(`maps/${map.img}`).then(url => {
            const link = host.querySelector(`[data-secure-map-link="${index}"]`);
            const image = host.querySelector(`[data-secure-map-image="${index}"]`);
            if (!link || !image) return;
            link.href = url;
            image.src = url;
          }).catch(() => {
            const image = host.querySelector(`[data-secure-map-image="${index}"]`);
            if (image) image.alt = `${day.date} 路线图加载失败，请使用下方实时导航`;
          });
        });
      }
    }
    host.dataset.loaded = "true";
  }

  function selectOptions(values, current, emptyLabel = "") {
    const empty = emptyLabel ? `<option value="">${escapeHtml(emptyLabel)}</option>` : "";
    return empty + values.map(value => `<option value="${escapeHtml(value)}" ${String(value) === String(current) ? "selected" : ""}>${escapeHtml(value)}</option>`).join("");
  }

  function setupWorkbook() {
    if (workbookReady) return;
    workbookReady = true;
    const ownerValues = [...new Set(BOOKING.rows.map(row => row.owner))].sort((a,b) => a.localeCompare(b,"zh-CN"));
    const categoryValues = [...new Set(BOOKING.rows.map(row => row.category))].sort((a,b) => a.localeCompare(b,"zh-CN"));
    $("#workbookOwnerFilter").innerHTML += ownerValues.map(value => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join("");
    $("#workbookCategoryFilter").innerHTML += categoryValues.map(value => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join("");
    $("#workbookPriorityFilter").innerHTML += BOOKING.options.priority.map(value => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join("");
    const columnWidths = [90,80,100,150,220,130,90,230,110,120,120,150,170,120,300,220];
    $("#bookingWorkbookCols").innerHTML = columnWidths.map(width => `<col style="width:${width}px">`).join("");
    $("#bookingWorkbookHead").innerHTML = BOOKING.columns.map(column => `<th scope="col">${escapeHtml(column.label)}</th>`).join("");
    renderWorkbookTable();
  }

  function renderWorkbookTable(focusKey = "") {
    if (!workbookReady) return;
    const rows = allRows();
    const search = $("#workbookSearch").value.trim().toLowerCase();
    const owner = $("#workbookOwnerFilter").value;
    const category = $("#workbookCategoryFilter").value;
    const priority = $("#workbookPriorityFilter").value;
    const pendingOnly = $("#workbookPendingOnly").checked;
    const owners = [...new Set(BOOKING.rows.map(row => row.owner))].sort((a,b) => a.localeCompare(b,"zh-CN"));
    const filtered = rows.filter(row => {
      const haystack = [row.item,row.owner,row.category,row.when,row.names,row.checklist,row.notes].join(" ").toLowerCase();
      return (!search || haystack.includes(search)) && (!owner || row.owner === owner) && (!category || row.category === category) &&
        (!priority || row.priority === priority) && (!pendingOnly || !isDone(row));
    });
    $("#bookingWorkbookBody").innerHTML = filtered.map(row => {
      const safeUrl = /^https?:\/\//i.test(row.url || "") ? row.url : "";
      return `<tr data-row-key="${escapeHtml(row.key)}" class="${isDone(row) ? "row-done" : ""}">
        <td><label><input type="checkbox" data-field="completion" ${isDone(row) ? "checked" : ""}> ${isDone(row) ? "已完成" : "未完成"}</label></td>
        <td><select data-field="priority">${selectOptions(BOOKING.options.priority,row.priority)}</select></td>
        <td>${escapeHtml(row.category)}</td>
        <td>${escapeHtml(row.when)}</td>
        <td><b>${escapeHtml(row.item)}</b></td>
        <td><select data-field="owner">${selectOptions(owners,row.owner)}</select></td>
        <td><select data-field="participantCount">${selectOptions(BOOKING.options.participantCount,row.participantCount,"待确认")}</select></td>
        <td><input type="text" data-field="names" value="${escapeHtml(row.names)}" placeholder="用顿号分隔姓名"></td>
        <td>${escapeHtml(row.confirmation)}</td>
        <td><select data-field="status">${selectOptions(BOOKING.options.status,row.status)}</select></td>
        <td><input type="date" data-field="deadline" value="${escapeHtml(row.deadline)}"></td>
        <td><input type="text" data-field="quote" value="${escapeHtml(row.quote)}"></td>
        <td><input type="text" data-field="reference" value="${escapeHtml(row.reference)}"></td>
        <td>${safeUrl ? `<a class="cell-link" href="${escapeHtml(safeUrl)}" target="_blank" rel="noopener">打开链接</a>` : "—"}</td>
        <td>${escapeHtml(row.checklist)}</td>
        <td><input type="text" data-field="notes" value="${escapeHtml(row.notes)}"></td>
      </tr>`;
    }).join("") || '<tr><td colspan="16">没有符合筛选条件的事项</td></tr>';
    $("#workbookVisibleCount").textContent = `显示 ${filtered.length} / ${rows.length} 项`;
    if (focusKey) {
      requestAnimationFrame(() => $("#bookingWorkbookBody").querySelector(`tr[data-row-key="${CSS.escape(focusKey)}"]`)?.scrollIntoView({block:"center"}));
    }
  }

  function renderBudget() {
    if (budgetReady) return;
    budgetReady = true;
    $("#budgetRows").innerHTML = TRIP.budget.map(item => `<tr>
      <td>${escapeHtml(item.item)}</td><td class="num">${escapeHtml(item.usd)}</td><td class="num">${escapeHtml(item.cny)}</td><td>${escapeHtml(item.note)}</td>
    </tr>`).join("");
  }

  document.addEventListener("change", event => {
    const checkbox = event.target.closest("[data-task-complete]");
    if (checkbox) {
      updateRow(checkbox.dataset.taskComplete,"completion",checkbox.checked ? "☑ 已完成" : "☐ 未完成");
      return;
    }
    const control = event.target.closest("#bookingWorkbookBody [data-field]");
    const rowElement = event.target.closest("tr[data-row-key]");
    if (control && rowElement) {
      let value = control.type === "checkbox" ? (control.checked ? "☑ 已完成" : "☐ 未完成") : control.value;
      if (control.dataset.field === "participantCount") value = value ? Number(value) : "";
      updateRow(rowElement.dataset.rowKey,control.dataset.field,value);
    }
  });

  document.addEventListener("click", event => {
    const dayButton = event.target.closest("[data-day-id]");
    if (dayButton) {
      activeDayId = dayButton.dataset.dayId;
      history.replaceState(null,"",`#${activeDayId}`);
      renderDayNav();
      renderActiveDay();
      $("#dayView").focus({preventScroll:true});
      $("#dayView").scrollIntoView({block:"start"});
      return;
    }
    const jump = event.target.closest("[data-jump-day]");
    if (jump) {
      activeDayId = jump.dataset.jumpDay;
      history.replaceState(null,"",`#${activeDayId}`);
      renderDayNav();
      renderActiveDay();
      requestAnimationFrame(() => {
        const target = document.getElementById(jump.dataset.jumpStop);
        target?.scrollIntoView({block:"center"});
        target?.classList.add("flash");
        setTimeout(() => target?.classList.remove("flash"),1900);
      });
      return;
    }
    const openWorkbook = event.target.closest("[data-open-workbook]");
    if (openWorkbook) {
      $("#workbookDetails").open = true;
      setupWorkbook();
      renderWorkbookTable(openWorkbook.dataset.openWorkbook);
    }
  });

  $("#toggleAllTasks").addEventListener("click", () => {
    showAllBookings = !showAllBookings;
    renderTaskHub();
  });

  $("#dayView").addEventListener("toggle", event => {
    const details = event.target.closest("[data-route-day]");
    if (!details?.open) return;
    const day = TRIP.days.find(item => item.id === details.dataset.routeDay);
    renderRouteMaps(day,details.querySelector(".map-host"));
  },true);

  $("#workbookDetails").addEventListener("toggle", event => {
    if (event.target.open) setupWorkbook();
  });

  $("#budgetDetails").addEventListener("toggle", event => {
    if (event.target.open) renderBudget();
  });

  ["workbookSearch","workbookOwnerFilter","workbookCategoryFilter","workbookPriorityFilter","workbookPendingOnly"].forEach(id => {
    $(`#${id}`).addEventListener(id === "workbookSearch" ? "input" : "change", () => renderWorkbookTable());
  });

  addEventListener("hashchange", () => {
    const next = activeDayFromHash();
    if (next !== activeDayId) {
      activeDayId = next;
      renderDayNav();
      renderActiveDay();
    }
  });

  renderOverview();
  renderTaskHub();
  renderDayNav();
  renderActiveDay();
  if (location.hash === `#${activeDayId}`) {
    requestAnimationFrame(() => $("#dayView").scrollIntoView({block:"start"}));
  }
})();
