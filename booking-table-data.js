globalThis.BOOKING_TABLE_DATA = {
  "version": "2026-10-08.public",
  "columns": [
    {
      "key": "completion",
      "label": "完成"
    },
    {
      "key": "priority",
      "label": "优先级"
    },
    {
      "key": "category",
      "label": "分类"
    },
    {
      "key": "when",
      "label": "日期 / 时间"
    },
    {
      "key": "item",
      "label": "项目"
    },
    {
      "key": "owner",
      "label": "负责人"
    },
    {
      "key": "participantCount",
      "label": "参与人数"
    },
    {
      "key": "names",
      "label": "具体名单"
    },
    {
      "key": "confirmation",
      "label": "名单 / 确认状态"
    },
    {
      "key": "status",
      "label": "预约 / 处理状态"
    },
    {
      "key": "deadline",
      "label": "建议截止"
    },
    {
      "key": "quote",
      "label": "报价 / 总价"
    },
    {
      "key": "reference",
      "label": "订单号 / 证明编号"
    },
    {
      "key": "url",
      "label": "供应商 / 链接"
    },
    {
      "key": "checklist",
      "label": "核对要点"
    },
    {
      "key": "notes",
      "label": "备注"
    }
  ],
  "options": {
    "completion": [
      "☐ 未完成",
      "☑ 已完成"
    ],
    "priority": [
      "最高",
      "高",
      "中",
      "低"
    ],
    "confirmation": [
      "待填写",
      "部分确认",
      "已确认",
      "不参加"
    ],
    "status": [
      "待处理",
      "询价中",
      "待付款",
      "已预订",
      "无需预订",
      "已取消"
    ],
    "participantCount": [
      1,
      2,
      3,
      4,
      5
    ]
  },
  "rows": [
    {
      "key": "flight-international-extra-two",
      "completion": "☑ 已完成",
      "priority": "最高",
      "category": "航班",
      "when": "全程国际航班",
      "item": "另外 2 人国际航班机票",
      "owner": "待分配",
      "participantCount": 2,
      "names": "",
      "confirmation": "待填写",
      "status": "已预订",
      "deadline": "2026-08-21",
      "quote": "",
      "reference": "",
      "url": "",
      "checklist": "核对是否已另单购票，并确保与前 3 人全程同航班",
      "notes": "",
      "taskType": "booking",
      "placements": []
    },
    {
      "key": "flight-hnl-koa",
      "completion": "☑ 已完成",
      "priority": "最高",
      "category": "航班",
      "when": "9/25 · 14:50–15:52",
      "item": "AS1158 · HNL→KOA · 5 人",
      "owner": "待分配",
      "participantCount": 5,
      "names": "",
      "confirmation": "待填写",
      "status": "已预订",
      "deadline": "2026-08-21",
      "quote": "",
      "reference": "",
      "url": "",
      "checklist": "锁定 AS1158：14:50 HNL 起飞、15:52 抵达 KOA。AS850 10:05 抵达 HNL 后需入境、提行李，再为岛际段重新值机和托运；确认每人 23kg 行李额度",
      "notes": "衔接 4 小时 45 分；完成付款后回填票号 / 确认号",
      "taskType": "booking",
      "placements": [
        {
          "dayId": "d1",
          "stopId": "d1-s5"
        }
      ]
    },
    {
      "key": "flight-koa-hnl",
      "completion": "☑ 已完成",
      "priority": "最高",
      "category": "航班",
      "when": "10/1 · 10:51–11:40",
      "item": "AS1057 · KOA→HNL · 5 人",
      "owner": "待分配",
      "participantCount": 5,
      "names": "",
      "confirmation": "待填写",
      "status": "已预订",
      "deadline": "2026-08-21",
      "quote": "当前Saver $69/人；Main $89/人；首件托运行李$30/人",
      "reference": "Hawaiian Airlines执飞 · 官网已按10/1与5名成人核实",
      "url": "https://www.alaskaair.com/search/results?O=KOA&D=HNL&OD=2026-10-01&A=5&RT=false&locale=en-us",
      "checklist": "在Alaska Airlines官网选择AS1057：10:51 KOA起飞、11:40 HNL抵达，不再使用AS1067 11:34→12:23档。5人姓名逐一核对；每人1件20kg托运行李，均低于50 lb / 22.7 kg上限，三边合计须不超过62 in / 157 cm；首件$30/人，5件共$150，可在线值机或机场柜台支付。7:15起床、7:45离开、8:30前还车，目标9:00前完成值机托运",
      "notes": "2026-08-20官网5人查询价：Saver机票＋5件行李约$495；Main机票＋5件行李约$595，付款页以实时库存和最终总价为准。HNL取齐行李后先去Waikiki Marriott寄存 / 入住",
      "taskType": "booking",
      "placements": [
        {
          "dayId": "d7",
          "stopId": "d7-s3"
        }
      ]
    },
    {
      "key": "stay-big-island",
      "completion": "☑ 已完成",
      "priority": "最高",
      "category": "住宿",
      "when": "9/25–10/1 · 6 晚",
      "item": "Mauna Lani Golf Villas · Airbnb 47705858",
      "owner": "待分配",
      "participantCount": 5,
      "names": "",
      "confirmation": "待填写",
      "status": "已预订",
      "deadline": "2026-08-21",
      "quote": "待重新核价",
      "reference": "Mauna Lani Resort（地图与周边搜索参考点）",
      "url": "https://zh.airbnb.com/rooms/47705858",
      "checklist": "下单前输入9/25–10/1、5人，确认含税总价与取消政策；确认Beach Club通行证、停车车辆数、泳池/热水池/健身房规则。16:00后入住、10:00前退房，入住指南在抵达前72小时发送；已确认不含网球场或运动场权益",
      "notes": "3卧3卫、2 King＋2 Twin，最多6人。地图/车程统一以Mauna Lani Resort为参考；实际入住导航以房东发送的社区入口和门牌为准",
      "taskType": "booking",
      "placements": [
        {
          "dayId": "d1",
          "stopId": "d1-s6"
        },
        {
          "dayId": "d7",
          "stopId": "d7-s1"
        }
      ]
    },
    {
      "key": "stay-oahu",
      "completion": "☐ 未完成",
      "priority": "最高",
      "category": "住宿",
      "when": "10/1–10/5 · 4 晚",
      "item": "Waikiki Beach Marriott Resort & Spa",
      "owner": "小林",
      "participantCount": 5,
      "names": "小斯、小涵、小高、小赵（已订）；小林（未订，自行解决）",
      "confirmation": "部分确认",
      "status": "已预订",
      "deadline": "2026-08-21",
      "quote": "",
      "reference": "",
      "url": "https://www.marriott.com/en-us/hotels/hnlmc-waikiki-beach-marriott-resort-and-spa/overview/",
      "checklist": "小斯、小涵、小高、小赵4人已预订；仅小林尚未预订，由小林自行解决，剩余住宿待办负责人为小林。10/2、10/3的两辆敞篷已改为SIXT Waikiki/Alohilani门店单日订单，不使用Marriott的Enterprise",
      "notes": "4人已订；小林未订，自行解决。两日租车当前均为09:00–22:00；Kualoa已改为10/3 12:20开团，10/3保留09:00取车即可",
      "taskType": "booking",
      "placements": [
        {
          "dayId": "d7",
          "stopId": "d7-s5"
        },
        {
          "dayId": "d11",
          "stopId": "d11-s2"
        }
      ]
    },
    {
      "key": "stay-tokyo",
      "completion": "☐ 未完成",
      "priority": "最高",
      "category": "住宿",
      "when": "10/6–10/7 · 1 晚",
      "item": "涩谷东急 REI 酒店｜禁烟标准双床房",
      "owner": "小林",
      "participantCount": 5,
      "names": "小斯、小涵、小高、小赵（已订）；小林（未订，自行解决）",
      "confirmation": "部分确认",
      "status": "已预订",
      "deadline": "2026-10-04",
      "quote": "小高、小赵1间：¥1,607.78（离店扣款；住宿税到店另付）；其他房费未回填",
      "reference": "入住凭证已收到；确认号和订单号不写入共享页面",
      "url": "https://www.tokyuhotels.co.jp/shibuya-r/",
      "checklist": "小斯、小涵、小高、小赵4人已预订；仅小林尚未预订，由小林自行解决。已收到的小高、小赵凭证为1间禁烟标准双床房，10/6 15:00–次日02:00入住、10/7 10:00前退房，无早餐；该订单10/4 12:00（酒店当地时间）前免费取消，之后不可取消；另确认退房后可寄存行李",
      "notes": "4人已订；小林未订，自行解决。已收到的凭证住客为小高、小赵，2张1米单人床，离店扣款¥1,607.78，住宿税到店另付；该凭证注明未入住收全额房费¥1,687.78；小斯、小涵住宿已订，房型与金额未回填",
      "taskType": "booking",
      "placements": [
        {
          "dayId": "d12",
          "stopId": "d12-s3"
        },
        {
          "dayId": "d13",
          "stopId": "d13-s1"
        }
      ]
    },
    {
      "key": "rental-big-island-x7",
      "completion": "☑ 已完成",
      "priority": "最高",
      "category": "租车",
      "when": "9/25约16:30取–10/1约08:30还",
      "item": "大岛全程 · SIXT BMW X7 xDrive / 同级大型AWD SUV",
      "owner": "小林",
      "participantCount": 5,
      "names": "",
      "confirmation": "待填写",
      "status": "已预订",
      "deadline": "2026-08-21",
      "quote": "待按新时段重报",
      "reference": "",
      "url": "https://www.sixt.com/car-rental/usa/kailua-kona/big-island-kona-int-airport/",
      "checklist": "AS1158 15:52 抵达 KOA，取齐行李并搭接驳后取车。一张订单、全程不换车；优先Guaranteed Model。确认7座长椅版、手动低挡/HDC、附加驾驶员，并现场试装5件23kg托运行李",
      "notes": "9/27 Mauna Kea是否登顶以Ranger对实车、轮胎、制动、传动与当天道路的检查为准；不获放行则止步游客中心",
      "taskType": "booking",
      "placements": [
        {
          "dayId": "d1",
          "stopId": "d1-s5"
        },
        {
          "dayId": "d7",
          "stopId": "d7-s2"
        }
      ]
    },
    {
      "key": "rental-big-island-x7-pickup-check",
      "completion": "☐ 未完成",
      "priority": "最高",
      "category": "租车准备",
      "when": "9/25约16:30–17:00 · SIXT Kona取车现场",
      "item": "X7实车与5人行李核验",
      "owner": "小林",
      "participantCount": 5,
      "names": "",
      "confirmation": "待填写",
      "status": "待处理",
      "deadline": "2026-09-25",
      "quote": "",
      "reference": "",
      "url": "https://www.sixt.com/car-rental/usa/kailua-kona/big-island-kona-int-airport/",
      "checklist": "核对xDrive/AWD标识、7座长椅版、第三排完全放倒、手动低挡/HDC、轮胎与制动；把5件23kg托运行李全部试装后再离店",
      "notes": "若交付or similar且不是大型AWD或装不下5人行李，当场要求同组换车；拍摄车况、轮胎、油量和仪表里程",
      "taskType": "preparation",
      "placements": [
        {
          "dayId": "d1",
          "stopId": "d1-s5"
        }
      ]
    },
    {
      "key": "rental-oahu",
      "completion": "☑ 已完成",
      "priority": "最高",
      "category": "租车",
      "when": "10/2、10/3 · 各09:00–22:00 · 两辆敞篷",
      "item": "SIXT Waikiki/Alohilani · Fullsize Convertible ×2",
      "owner": "小林",
      "participantCount": 5,
      "names": "",
      "confirmation": "部分确认",
      "status": "已预订",
      "deadline": "2026-09-10",
      "quote": "邮件所示一辆：10/2 $126.87、10/3 $139.20；另一辆金额待回填",
      "reference": "SIXT邮件已收到；订单号不写入共享页面",
      "url": "https://www.sixt.com/car-rental/usa/honolulu/",
      "checklist": "两辆车均由用户确认已在SIXT Waikiki/Alohilani同店预订，车型组为Fullsize Ford Mustang Convertible或同级，自动挡、4座、约3件行李。Kualoa已改为10/3 12:20开团，原09:00–22:00租车时段可继续使用；目标09:15前办完取车，10:20–10:30从Waikiki出发。",
      "notes": "门店：Alohilani Resort Waikiki Beach, 2490 Kalakaua Ave；官方页面显示06:30营业、支持24小时还车。邮件所示含Peace of Mind保障及每份合同$200信用卡预授权。邮件措辞仍为checking availability，出发前须看到两辆车两天均为最终confirmed。",
      "taskType": "booking",
      "placements": [
        {
          "dayId": "d8",
          "stopId": "d8-s1"
        },
        {
          "dayId": "d8",
          "stopId": "d8-s9"
        },
        {
          "dayId": "d9",
          "stopId": "d9-s3"
        },
        {
          "dayId": "d9",
          "stopId": "d9-s11"
        }
      ]
    },
    {
      "key": "rental-oahu-kualoa-time-adjustment",
      "completion": "☑ 已完成",
      "priority": "低",
      "category": "租车调整",
      "when": "10/3 · 保留09:00–22:00",
      "item": "无需调整SIXT取车时间｜Kualoa已改12:20",
      "owner": "小林",
      "participantCount": 5,
      "names": "",
      "confirmation": "已确认",
      "status": "无需预订",
      "deadline": "",
      "quote": "保留原订单与原时段",
      "reference": "关联两辆SIXT订单；订单号不写入共享页面",
      "url": "https://www.sixt.com/car-rental/usa/honolulu/",
      "checklist": "10/3 Movie Sites & Ranch Tour已改为12:20开始，原09:00取车不再冲突。保留两辆车的09:00–22:00订单，取车时核对车型、保障、总价与最终confirmed状态。",
      "notes": "SIXT Waikiki/Alohilani官方页面显示06:30营业并支持24小时还车。目标09:15前办完取车，10:20–10:30离开Waikiki，11:30–11:40抵达Kualoa。",
      "taskType": "preparation",
      "placements": [
        {
          "dayId": "d9",
          "stopId": "d9-s3"
        }
      ]
    },
    {
      "key": "paniolo-sunset",
      "completion": "☑ 已完成",
      "priority": "高",
      "category": "活动",
      "when": "9/26 · 16:30签到 / 18:30时段结束（已确认）",
      "item": "Paniolo Adventures · Sunset Ride日落骑马",
      "owner": "小斯 + 小涵",
      "participantCount": 2,
      "names": "小斯、小涵",
      "confirmation": "已确认",
      "status": "已预订",
      "deadline": "",
      "quote": "$386.54 / 2人（已全额支付）",
      "reference": "确认邮件已收到；订单号与私人确认链接不写入共享页面",
      "url": "https://www.panioloadventures.com/horsebackrides.php",
      "checklist": "夏威夷当地时间9/26周六16:30签到、16:30–18:30预订时段，骑行约1.5小时；五人目标16:00–16:10到场。小斯开X7到马场，小涵同行；两人穿长裤、包脚鞋并带轻外套，每位携带有效政府签发照片证件和付款信用卡；卡上姓名必须与预订联系人 预订人 完全一致。现场签免责协议。导航到Hwy 250约13.2英里处、过13英里路标约300码后左侧红色谷仓。",
      "notes": "时间底线：12:00五人离开民宿、14:15结束Hāwī午餐、15:25离开Hāwī地区、16:00–16:10到马场；延误时先取消Kapaʻau、咖啡和山路停拍。签到前不足24小时取消收100%骑行费用。骑马期间其余3人由已登记驾驶员接手X7自由活动，18:15前返场；18:30五人会合返家。",
      "taskType": "booking",
      "placements": [
        {
          "dayId": "d2",
          "stopId": "d2-s10"
        }
      ]
    },
    {
      "key": "helicopter",
      "completion": "☑ 已完成",
      "priority": "高",
      "category": "活动",
      "when": "10/2 · 10:00报到 / 11:00–12:00飞行（已确认）",
      "item": "Royal Crown of Oahu Door-off直升机",
      "owner": "小斯",
      "participantCount": 4,
      "names": "",
      "confirmation": "已确认",
      "status": "已预订",
      "deadline": "",
      "quote": "$540/人 · 4人共$2,160",
      "reference": "Rainbow确认邮件已收到；确认号不写入共享页面",
      "url": "https://rainbowhelicopters.com/tours/royal-crown-oahu/",
      "checklist": "10/2 11:00 Door-off航班已确认，4人参加；必须10:00在155 Kapalulu Pl报到。两位主驾驶约08:50到SIXT Waikiki/Alohilani，09:00取两辆敞篷，目标09:15前离店、09:40左右到基地。必须带证件、外套 / 卫衣和包脚鞋，建议长裤；长发扎紧，不带松散物。",
      "notes": "两车停Rainbow免费现场停车场，确认邮件含准确入口与停车图；第5人随车到基地等候。12:10飞完取车后直接走H-3 E，去Windward Mall午餐、平等院与张学良墓，再到Koʻolau Distillery",
      "taskType": "booking",
      "placements": [
        {
          "dayId": "d8",
          "stopId": "d8-s3"
        }
      ]
    },
    {
      "key": "koolau-distillery",
      "completion": "☑ 已完成",
      "priority": "低",
      "category": "无需预约",
      "when": "10/2 · 当天决定（去则约14:40–15:10）",
      "item": "可选｜Koʻolau Distillery · 路过买威士忌伴手礼",
      "owner": "小高",
      "participantCount": 5,
      "names": "",
      "confirmation": "不预订",
      "status": "无需预订",
      "deadline": "",
      "quote": "购物按现场选购另计；不安排付费导览",
      "reference": "905 Kapaa Quarry Pl, Building 50, Unit 14",
      "url": "https://www.koolaudistillery.com/tasting-room/",
      "checklist": "酒厂为顺路可选项，当天看兴趣、时间、路况和营业情况决定，可去可不去；不预约导览、不设必须到店时间，不为买酒压缩已订活动或主要景点。所列时段仅供选择去店时参考；跳过时从导航中删除酒厂途经点，直接去下一站。 只逛零售区、买两瓶Old Pali Road Whiskey作伴手礼，预留20–30分钟；不安排导览、不需要预约导览。买酒带有效证件，两位主驾驶不试饮，瓶装酒封好放后备箱。",
      "notes": "不去酒厂则从平等院直接去东南岸。官网周五零售与tasting room营业12:00–21:00。平等院后目标14:35–14:40抵达，按Building 50 Unit 14及酒厂标识进入后侧入口；约15:10离开去东南岸，库存与价格以现场为准。",
      "taskType": "reference",
      "placements": [
        {
          "dayId": "d8",
          "stopId": "d8-s8"
        }
      ]
    },
    {
      "key": "captain-cook",
      "completion": "☑ 已完成",
      "priority": "高",
      "category": "活动支线A",
      "when": "9/29 · 12:30报到 / 12:45–15:45",
      "item": "Sea Quest · Captain Cook Exclusive午后浮潜（Groupon）",
      "owner": "小高",
      "participantCount": 3,
      "names": "小赵、小高、小林",
      "confirmation": "已确认",
      "status": "已预订",
      "deadline": "2026-09-02",
      "quote": "$90/人 × 3 + $1/人Ocean Stewardship Fee；约$273",
      "reference": "3张Groupon已购；兑换码不写入页面",
      "url": "https://www.seaquesthawaii.com/groupon/",
      "checklist": "使用3张已购买的Groupon兑换9/29 12:45场；确认小赵、小高、小林三人，12:30前报到。提交前逐人确认无孕期、无背颈问题并能爬短梯；保存Sea Quest最终确认邮件和订单号",
      "notes": "3小时行程，约1小时实际下水浮潜；15:45返回后由小斯、小涵从South Point回Keauhou接人",
      "taskType": "booking",
      "placements": [
        {
          "dayId": "d5",
          "stopId": "d5-s3"
        }
      ]
    },
    {
      "key": "coffee-branch",
      "completion": "☑ 已完成",
      "priority": "中",
      "category": "自驾支线B",
      "when": "9/29 · 12:45–15:45",
      "item": "小斯、小涵｜South Point自驾往返＋接浮潜组",
      "owner": "小斯＋小涵",
      "participantCount": 2,
      "names": "小斯、小涵",
      "confirmation": "已确认",
      "status": "无需预订",
      "deadline": "",
      "quote": "无门票；油费计入租车行程",
      "reference": "",
      "url": "",
      "checklist": "至少一人必须是X7登记驾驶员。送三人到Sea Quest后保留车辆，经Hwy 11 / South Point Rd往返；南端只停20–25分钟，最迟14:20返程，目标15:45–16:00到Keauhou接人",
      "notes": "不走Papakōlea绿沙滩、不跳崖、不下水；五人会合后，咖啡庄园仅在仍营业、顺路且不影响夜场时机动安排",
      "taskType": "preparation",
      "placements": [
        {
          "dayId": "d5",
          "stopId": "d5-s4"
        }
      ]
    },
    {
      "key": "manta",
      "completion": "☑ 已完成",
      "priority": "高",
      "category": "活动",
      "when": "9/29 · 17:30报到 / 18:00–20:00",
      "item": "C Big Island · Manta Boat #2魔鬼鱼浮潜（4人）",
      "owner": "小高",
      "participantCount": 4,
      "names": "小高、小林、小斯、小涵",
      "confirmation": "已确认",
      "status": "已预订",
      "deadline": "2026-09-04",
      "quote": "$543.30 / 4人（已全额支付）",
      "reference": "确认邮件与PDF已收到；编号不写入共享页面",
      "url": "https://www.cbigisland.com/manta-ray-snorkel",
      "checklist": "9/29 Manta Ray Experience（Manta Boat #2）已确认：17:30前到74-380 Kealakehe Pkwy的Honokohau Harbor / IRUKA标志处报到，18:00–20:00。下水前应向船员说明自身游泳能力，并按需申请协助；自带传统分体面镜和呼吸管须经船员检查，禁止全脸式面罩",
      "notes": "小赵不参加并在近场自由活动；72小时内取消或未按时报到收全款，供应商因恶劣天气取消则全额退款。四人20:00上岸换干衣后，全队去Kailua-Kona吃晚饭",
      "taskType": "booking",
      "placements": [
        {
          "dayId": "d5",
          "stopId": "d5-s8"
        }
      ]
    },
    {
      "key": "kualoa",
      "completion": "☑ 已完成",
      "priority": "高",
      "category": "活动",
      "when": "10/3 · 12:20–约13:50（已改期）",
      "item": "Kualoa · Movie Sites & Ranch Tour",
      "owner": "小斯",
      "participantCount": 5,
      "names": "",
      "confirmation": "已确认",
      "status": "已预订",
      "deadline": "",
      "quote": "已预订；金额待回填",
      "reference": "预订人 小赵；最新改期截图已收到；订单号不写入共享页面",
      "url": "https://www.kualoa.com/tours-and-activities/movie-sites-ranch-tour",
      "checklist": "10/3周六12:20 Movie Sites & Ranch Tour，5位成人，时长约1.5小时。以最新确认单的最终报到要求为准；目标11:30–11:40抵达，预留停车、取票和步行时间。10:20–10:30从Waikiki出发，原09:00取车时间可保留。",
      "notes": "5人参加同一项目，不再分组；预计约13:50结束后在Kualoa用餐，约14:30–14:40进入北岸路线。原因早场取消的Marriott瑜伽现时间不再冲突，如想恢复须另行确认。",
      "taskType": "booking",
      "placements": [
        {
          "dayId": "d9",
          "stopId": "d9-s6"
        }
      ]
    },
    {
      "key": "marriott-yoga",
      "completion": "☐ 未完成",
      "priority": "低",
      "category": "活动支线A",
      "when": "10/3 · 08:00–09:00",
      "item": "可选恢复｜10/3 Marriott住客瑜伽",
      "owner": "待分配",
      "participantCount": "",
      "names": "",
      "confirmation": "待填写",
      "status": "无需预订",
      "deadline": "",
      "quote": "住客免费",
      "reference": "",
      "url": "https://event.marriott.com/hnlmc-waikiki-beach-marriott-resort-and-spa/events/honolulu/fitness?dates=Oct%203%2C%202026",
      "checklist": "Kualoa已改12:20开团，08:00–09:00瑜伽不再与出发时间冲突。如想恢复，两位主驾需提前离场或不参加，确保09:00到SIXT办理两辆车取车。",
      "notes": "先保留为可选项，不自动视为参加；当天仍以12:20 Kualoa按时报到为优先。",
      "taskType": "preparation",
      "placements": [
        {
          "dayId": "d9",
          "stopId": "d9-s1"
        }
      ]
    },
    {
      "key": "surf",
      "completion": "☐ 未完成",
      "priority": "高",
      "category": "活动支线A",
      "when": "10/4 · 15:00–17:00（待预订）",
      "item": "自愿参加｜Waikiki 初学者冲浪 · Marriott楼内集合",
      "owner": "小高",
      "participantCount": "",
      "names": "",
      "confirmation": "待填写",
      "status": "15:00场待预订",
      "deadline": "",
      "quote": "开放团体约$120/实际参加者；专属小组约$150/实际参加者",
      "reference": "2026-09-10核对Ohana官网：两小时课每天9:00 / 12:00 / 15:00",
      "url": "https://ohanasurfproject.com/lessons/surfing-lessons/",
      "checklist": "选10/4 15:00–17:00两小时冲浪课，自愿参加，由小高确认实际名单并预订。计划14:30到Marriott P159/P160集合，最终报到时间以确认单为准。核对10/4余位、教练配置、费用、游泳要求和取消规则；尚未下单。",
      "notes": "已核实官方常规课表，10/4实时余位未确认。12:45午餐后13:30–14:15休息，再14:30集合；不参加者自由购物、休息或打包。学校负责教学点接驳。",
      "taskType": "booking",
      "placements": [
        {
          "dayId": "d10",
          "stopId": "d10-s2"
        }
      ]
    },
    {
      "key": "diamond-head-backup",
      "completion": "☑ 已完成",
      "priority": "中",
      "category": "活动 / 已预约",
      "when": "10/4 · 10:00–11:00入园时段",
      "item": "已预约｜Diamond Head Summit Trail · 4人",
      "owner": "小赵",
      "participantCount": "4",
      "names": "小涵、小高、小赵、小林",
      "confirmation": "已确认",
      "status": "已预订",
      "deadline": "",
      "quote": "4人Entry only已订；票面未列实付金额",
      "reference": "已脱敏（原始预约票仅私人保管）",
      "url": "https://gostateparks.hawaii.gov/diamondhead",
      "checklist": "小斯不去，其余4人参加。预订人小赵；小赵带好预约票，四人一同验票。9:20从Marriott叫车，目标10:00入园，最晚10:30到达；10:00–12:00徒步，12:15左右叫车返回，12:45午餐。带水、防晒、帽子和徒步鞋。",
      "notes": "已核对用户提供的预约PDF：10/04/2026、10:00 am–11:00 am、Entry only、4人。不含停车；票上二维码仅可用一次。下午冲浪改为自愿参加，时段待确认。",
      "taskType": "booking",
      "placements": [
        {
          "dayId": "d10",
          "stopId": "d10-s5"
        }
      ]
    },
    {
      "key": "tennis",
      "completion": "☐ 未完成",
      "priority": "中",
      "category": "活动支线A",
      "when": "9/26 · 08:00–09:00",
      "item": "自愿参加｜Island Slice Tennis自主网球",
      "owner": "小赵",
      "participantCount": "",
      "names": "",
      "confirmation": "待填写",
      "status": "待处理",
      "deadline": "2026-09-01",
      "quote": "$50/实际打球者/小时 + 税；含练习球及最多4支球拍",
      "reference": "Fairmont Orchid内；官网明确接待普通公众；免费停车",
      "url": "https://www.islandslicetennis.com/",
      "checklist": "不是集体活动。先填写实际打球人数与名单，再自行拨打808-887-7532预约9/26 08:00–09:00；确认场地、实际人数、球拍数量、练习球、免费停车、报到位置和取消政策",
      "notes": "未报名者进入49 Black Sand Plan B。7:30网球组开X7、7:45报到；9:00后两组回民宿，9:50全员北上",
      "taskType": "booking",
      "placements": [
        {
          "dayId": "d2",
          "stopId": "d2-s4"
        }
      ]
    },
    {
      "key": "big-island-brewhaus",
      "completion": "☐ 未完成",
      "priority": "中",
      "category": "餐饮/酒吧",
      "when": "9/28 · 约19:30–20:30",
      "item": "Big Island Brewhaus · 晚餐＋啤酒外带",
      "owner": "待分配",
      "participantCount": 5,
      "names": "",
      "confirmation": "待填写",
      "status": "无需预订",
      "deadline": "",
      "quote": "按现场点餐",
      "reference": "每日11:00–21:00；不接受预订",
      "url": "https://bigislandbrewhaus.com/",
      "checklist": "火山公园离园后到Waimea堂食；现场选罐装、quart / half-gallon mason jar或half-gallon growler外带。负责继续开X7的人不在店内饮酒；外带酒保持封闭并放后备箱，到民宿停车后再喝",
      "notes": "若抵达接近关门则先点外带餐和啤酒；不为晚餐压缩火山公园",
      "taskType": "reference",
      "placements": [
        {
          "dayId": "d4",
          "stopId": "d4-s6"
        }
      ]
    },
    {
      "key": "dinner-keauhou",
      "completion": "☑ 已完成",
      "priority": "低",
      "category": "无需预约",
      "when": "9/29 · 16:05–16:40",
      "item": "Keauhou Shopping Center快速加餐 / 夜场准备",
      "owner": "无需安排",
      "participantCount": 5,
      "names": "",
      "confirmation": "不预订",
      "status": "无需预订",
      "deadline": "",
      "quote": "按现场点餐",
      "reference": "首选KTA便当 / poke；Tropics仅在无需等位时选择",
      "url": "https://keauhoushoppingcenter.com/",
      "checklist": "Sea Quest返回后先换干衣，再去Keauhou Shopping Center快速补给；16:40开始收拾，16:50必须离开。避免饮酒和过饱，为17:30 Honokohau Harbor报到留出25–30分钟",
      "notes": "取消咖啡庄园机动安排；下午只吃轻食，正式晚饭放到20:30魔鬼鱼结束以后",
      "taskType": "reference",
      "placements": [
        {
          "dayId": "d5",
          "stopId": "d5-s6"
        }
      ]
    },
    {
      "key": "dinner-after-manta",
      "completion": "☐ 未完成",
      "priority": "中",
      "category": "餐饮",
      "when": "9/29 · 建议预订20:30",
      "item": "建议预约｜Big Kahuna Beach Grill · 魔鬼鱼后晚餐",
      "owner": "小高",
      "participantCount": 5,
      "names": "小斯、小涵、小高、小赵、小林",
      "confirmation": "已确认",
      "status": "待处理",
      "deadline": "2026-09-20",
      "quote": "按现场点餐",
      "reference": "每日营业至22:00；消费验证后90分钟停车免费",
      "url": "https://www.bigkahunabeachgrill.com/",
      "checklist": "预订9/29 20:30、5位；C Big Island预计20:00返港，四人擦干换衣后约20:20出发，约20:30到店。若船班晚于20:10返港，途中电话通知餐厅；负责回Mauna Lani的司机不饮酒",
      "notes": "首选Big Kahuna是因为营业到22:00。Bite Me虽在港区但标注21:00关门且最后点餐时间不明；Umekes也在21:00关门，仅作提前返港时的备选",
      "taskType": "booking",
      "placements": [
        {
          "dayId": "d5",
          "stopId": "d5-s10"
        }
      ]
    },
    {
      "key": "ready-passports",
      "completion": "☐ 未完成",
      "priority": "最高",
      "category": "证件",
      "when": "出发前",
      "item": "5 人护照姓名、有效期与机票拼写核对",
      "owner": "待分配",
      "participantCount": 5,
      "names": "",
      "confirmation": "待填写",
      "status": "待处理",
      "deadline": "2026-09-01",
      "quote": "",
      "reference": "",
      "url": "",
      "checklist": "逐人核对护照拼音、生日、有效期和所有航段姓名",
      "notes": "",
      "taskType": "preparation",
      "placements": []
    },
    {
      "key": "ready-esta",
      "completion": "☐ 未完成",
      "priority": "最高",
      "category": "证件",
      "when": "出发前",
      "item": "ESTA / 美国入境许可",
      "owner": "待分配",
      "participantCount": 5,
      "names": "",
      "confirmation": "待填写",
      "status": "待处理",
      "deadline": "2026-09-01",
      "quote": "",
      "reference": "",
      "url": "",
      "checklist": "逐人确认授权状态、申请号和护照号一致",
      "notes": "",
      "taskType": "preparation",
      "placements": []
    },
    {
      "key": "ready-insurance",
      "completion": "☐ 未完成",
      "priority": "高",
      "category": "保险",
      "when": "出发前",
      "item": "旅行保险",
      "owner": "待分配",
      "participantCount": 5,
      "names": "",
      "confirmation": "待填写",
      "status": "待处理",
      "deadline": "2026-09-10",
      "quote": "",
      "reference": "",
      "url": "",
      "checklist": "覆盖医疗、航班延误、活动取消与租车相关风险；保存保单号",
      "notes": "",
      "taskType": "preparation",
      "placements": []
    },
    {
      "key": "ready-drivers",
      "completion": "☐ 未完成",
      "priority": "高",
      "category": "租车准备",
      "when": "出发前",
      "item": "租车驾驶员证件与信用卡",
      "owner": "小林",
      "participantCount": "",
      "names": "",
      "confirmation": "待填写",
      "status": "待处理",
      "deadline": "2026-09-10",
      "quote": "",
      "reference": "",
      "url": "",
      "checklist": "确认主/附加驾驶员、有效驾照、翻译件/国际驾照要求和同名信用卡",
      "notes": "",
      "taskType": "preparation",
      "placements": [
        {
          "dayId": "d1",
          "stopId": "d1-s5"
        },
        {
          "dayId": "d8",
          "stopId": "d8-s1"
        }
      ]
    },
    {
      "key": "ready-baggage",
      "completion": "☐ 未完成",
      "priority": "高",
      "category": "行李",
      "when": "出发前",
      "item": "全航段托运行李与不直挂规则",
      "owner": "待分配",
      "participantCount": 5,
      "names": "",
      "confirmation": "待填写",
      "status": "待处理",
      "deadline": "2026-09-15",
      "quote": "",
      "reference": "",
      "url": "",
      "checklist": "逐段核对额度；KIX、HNL、HND/NRT 的提取和重新托运安排",
      "notes": "",
      "taskType": "preparation",
      "placements": []
    },
    {
      "key": "ready-visit-japan-web",
      "completion": "☐ 未完成",
      "priority": "高",
      "category": "入境准备",
      "when": "9/25 KIX＋10/6 HND",
      "item": "Visit Japan Web 两次入境资料与个人二维码",
      "owner": "每人本人",
      "participantCount": 5,
      "names": "",
      "confirmation": "待填写",
      "status": "待处理",
      "deadline": "2026-09-20",
      "quote": "免费",
      "reference": "日本政府 Visit Japan Web 官方入口",
      "url": "https://www.vjw.digital.go.jp/main/#/vjwplo001",
      "checklist": "旧账户能登录就复用；逐人核对当前护照，分别新建2026-09-25 KIX SAME-DAY TRANSIT和2026-10-06 HND SHIBUYA。每条计划分别完成入境审查＋海关申报；电脑填写后用手机登录，逐人保存KIX、HND两张二维码截图",
      "notes": "旧二维码不能重复使用；修改航班、住宿或申报后重新生成截图。KIX计划填HX616并以KIX T1作当天联系地点；HND计划填AS831及SHIBUYA TOKYU REI HOTEL（1500002 / 0334980109）。官方服务免费，不向收费代办网站提交资料",
      "taskType": "preparation",
      "placements": [
        {
          "dayId": "d1",
          "stopId": "d1-s1"
        },
        {
          "dayId": "d12",
          "stopId": "d12-s1"
        }
      ]
    },
    {
      "key": "ready-mauna-lani",
      "completion": "☐ 未完成",
      "priority": "中",
      "category": "住宿准备",
      "when": "入住前",
      "item": "Mauna Lani Golf Villas 入住与退房信息",
      "owner": "待分配",
      "participantCount": 5,
      "names": "",
      "confirmation": "待填写",
      "status": "待处理",
      "deadline": "2026-09-20",
      "quote": "",
      "reference": "Mauna Lani Resort（周边参考）",
      "url": "https://zh.airbnb.com/rooms/47705858",
      "checklist": "抵达前72小时接收入住指南；保存准确社区入口/门牌导航、门禁、停车证、Beach Club通行证、泳池/热水池/健身房规则、垃圾和退房清单；已确认不含网球场或运动场权益",
      "notes": "不要用Mauna Lani Resort酒店定位代替实际房屋导航",
      "taskType": "preparation",
      "placements": [
        {
          "dayId": "d1",
          "stopId": "d1-s6"
        }
      ]
    },
    {
      "key": "ready-tokyo-transfer",
      "completion": "☐ 未完成",
      "priority": "高",
      "category": "交通准备",
      "when": "10/6–10/7",
      "item": "羽田到涩谷酒店、次日 N’EX 到成田",
      "owner": "小斯 + 小涵",
      "participantCount": 5,
      "names": "",
      "confirmation": "待填写",
      "status": "待处理",
      "deadline": "2026-09-07",
      "quote": "羽田巴士 ¥1,300/人；N’EX 完整票约 ¥3,330/人",
      "reference": "10/6 羽田T3→涩谷现场择路｜10/7 N’EX 33",
      "url": "https://timetables.jreast.co.jp/en/2609/train/030/031511.html",
      "checklist": "10/6取齐行李后：T3国际到达2F→下到1F巴士售票机 / 柜台→选择涩谷站（渋谷駅・渋谷マークシティ）及下一班→推荐现金 / 信用卡一次买5张指定班次票→去T3 4号巴士站。当前班次21:05、21:35、末班22:35。9/7 10:00（日本时间）起另买10/7 N’EX 33完整纸质票",
      "notes": "机场巴士纸票与ICOCA / Suica二选一：已买5张票就不要再刷交通卡；若不买纸票，向4号站工作人员领取指定班次凭证后上车刷卡。错过或满员改京急→品川→JR山手线，太累则大型车 / 两辆出租车。10/7 13:20从酒店取行李，13:50前到N’EX站台",
      "taskType": "preparation",
      "placements": [
        {
          "dayId": "d13",
          "stopId": "d13-s3"
        }
      ]
    },
    {
      "key": "ready-offline",
      "completion": "☐ 未完成",
      "priority": "中",
      "category": "资料备份",
      "when": "出发前",
      "item": "离线保存全部订单与紧急联系方式",
      "owner": "全体负责人",
      "participantCount": 5,
      "names": "",
      "confirmation": "待填写",
      "status": "待处理",
      "deadline": "2026-09-22",
      "quote": "",
      "reference": "",
      "url": "",
      "checklist": "订单截图、确认号、集合点、取消政策和客服电话统一备份并分发",
      "notes": "",
      "taskType": "preparation",
      "placements": []
    }
  ]
};
