/* 整屏背景使用压缩 WebP；同名 JPG 原画保留在 assets。 */
window.ARTWORK = {
  cover:'assets/00-cover.webp?v=art-webp-20261016', ancient:'assets/01-ancient.webp?v=art-webp-20261016', palace:'assets/02-palace.webp?v=art-webp-20261016', palaceEmpty:'assets/02-palace-empty.webp?v=art-webp-20261016', control:'assets/03-control.webp?v=art-webp-20261016',
  cosmos:'assets/04-cosmos.webp?v=art-webp-20261016', surface:'assets/05-surface.webp?v=art-webp-20261016', finale:'assets/06-finale.webp?v=art-webp-20261016'
};
window.CHARACTERS = {operator:'assets/characters/operator.webp?v=preload-lite-20261016',change:'assets/characters/change.webp?v=preload-lite-20261016'};
window.CHAPTERS = ['月下的故事','地面的守候','走近真实的月亮','写给人间的回信'];
window.LOCATIONS = {cover:'九州山河 · 月出之时',ancient:'九州山河 · 月出之时',palace:'广寒月宫 · 千载守望',palaceEmpty:'广寒月宫 · 千载守望',control:'华夏测控站 · 地月之间',cosmos:'宇宙深空 · 星河赴约',surface:'月球表面 · 今夕归期',finale:'星月同辉 · 千年梦圆'};
// 稳定剧情 ID 用于跨版本存档；旧版本索引只在迁移时读取。
window.LEGACY_STORY_IDS = ["ancient-prologue", "ancient-vow", "ancient-wait", "night-shift", "old-record", "first-call", "orbit", "palace-awakens", "palace-memory", "palace-memory", "broken-question", "broken-question", "repair-reason", "signal", "departure", "departure", "small-vessel", "exploration-steps", "landing", "touchdown", "paved-road", "sample", "letter-blocked", "upload", "earth-message", "so-many-lights", "closing", "finale"];
window.STORY = [
  {
    "id": "ancient-prologue",
    "chapter": 0,
    "scene": "cover",
    "speaker": "",
    "text": "很久以前，人们还不知道怎样走近月亮。仰望夜空时，他们把思念与想象，讲成了奔月的故事。",
    "portrait": null
  },
  {
    "id": "courtyard",
    "chapter": 0,
    "scene": "ancient",
    "speaker": "",
    "text": "古老的庭院里，长辈指着月亮，给孩子讲起嫦娥。\n“她住在很远的月宫里，却一直惦记着人间。”",
    "portrait": null
  },
  {
    "id": "palace-awakens",
    "chapter": 0,
    "scene": "palace",
    "speaker": "",
    "text": "顺着长辈的讲述，眼前展开一座想象中的月宫。\n这里住着传说中的嫦娥，也寄托着人们对远方的向往。",
    "portrait": null
  },
  {
    "id": "palace-memory",
    "chapter": 0,
    "scene": "palaceEmpty",
    "speaker": "嫦娥",
    "text": "我记得人间的夜晚。门前有灯，有人唤晚归的孩子回家。\n如今，那些灯还亮着吗？",
    "portrait": "change",
    "portraitStyle": "solid"
  },
  {
    "id": "ancient-vow",
    "chapter": 0,
    "scene": "palaceEmpty",
    "speaker": "嫦娥",
    "text": "若有一天，有人能走过这片星河，\n请替我带来人间的消息。",
    "portrait": "change",
    "portraitStyle": "solid"
  },
  {
    "id": "broken-question",
    "chapter": 0,
    "scene": "palaceEmpty",
    "speaker": "嫦娥",
    "text": "若你能来到这里，告诉我吧——\n后来的孩子，还会抬头看月亮吗？",
    "portrait": "change",
    "portraitStyle": "solid"
  },
  {
    "id": "ancient-wait",
    "chapter": 0,
    "scene": "palaceEmpty",
    "speaker": "",
    "text": "这是故事里的愿望。它随着月光，被讲过许多年。",
    "portrait": null
  },
  {
    "id": "night-shift",
    "chapter": 1,
    "scene": "control",
    "speaker": "",
    "text": "故事讲到了今天。你是一名听着奔月传说长大的航天观测员，此刻正在地球上的测控站接班。\n探测器已经升空，正沿着既定轨道飞向月球。",
    "portrait": null
  },
  {
    "id": "old-record",
    "chapter": 1,
    "scene": "control",
    "speaker": "你",
    "text": "前一班留下了校准记录：“偏差已复核，留意弱信号。”\n接下来，我要守好这条链路，让远行的探测器把消息传回来。",
    "portrait": "operator"
  },
  {
    "id": "first-call",
    "chapter": 1,
    "scene": "control",
    "speaker": "你",
    "text": "地面测控站开始接收。\n核对天线方位，搜索探测器信号。",
    "portrait": "operator"
  },
  {
    "id": "noise",
    "chapter": 1,
    "scene": "control",
    "speaker": "",
    "text": "航行中的探测器不断发回脉冲。接收屏上，规律信号夹在杂波之间。\n你调整天线方向，尝试稳定跟踪。",
    "portrait": null
  },
  {
    "id": "orbit",
    "chapter": 1,
    "scene": "control",
    "task": "orbit",
    "title": "在杂波里，找到探测器",
    "portrait": null
  },
  {
    "id": "who-replied",
    "chapter": 1,
    "scene": "control",
    "speaker": "你",
    "text": "找到它了。信号还很弱，但节律稳定。\n这么远的地方，终于有了回音。",
    "portrait": "operator"
  },
  {
    "id": "repair-reason",
    "chapter": 1,
    "scene": "control",
    "speaker": "你",
    "text": "信号接上了，几路数据还有错位。\n先把它们对齐，确认探测器现在的状态。",
    "portrait": "operator"
  },
  {
    "id": "signal",
    "chapter": 1,
    "scene": "control",
    "task": "signal",
    "title": "让远方的消息清晰起来",
    "portrait": null
  },
  {
    "id": "echo-restored",
    "chapter": 1,
    "scene": "control",
    "speaker": "",
    "text": "回声恢复清晰，探测器的状态数据重新连贯。\n你刚松了一口气，一个轻柔的声音忽然响起，清楚得仿佛就在身旁。",
    "portrait": null
  },
  {
    "id": "children-question",
    "chapter": 1,
    "scene": "control",
    "speaker": "嫦娥的声音",
    "text": "后来的孩子，还会抬头看月亮吗？",
    "portrait": "change",
    "portraitStyle": "apparition"
  },
  {
    "id": "voice-startle",
    "chapter": 1,
    "scene": "control",
    "speaker": "",
    "text": "你的手停在记录键上，猛地回头。身后只有安静的值班席。\n你重新查看通话记录：没有人呼叫，耳机里也只有设备的提示音。",
    "portrait": null
  },
  {
    "id": "voice-question",
    "chapter": 1,
    "scene": "control",
    "speaker": "你",
    "text": "刚才……是谁在说话？\n你说“后来的孩子”……你是谁？",
    "portrait": "operator"
  },
  {
    "id": "voice-name",
    "chapter": 1,
    "scene": "control",
    "speaker": "嫦娥的声音",
    "text": "嫦娥。\n你小时候听过我的故事，对吗？",
    "portrait": "change"
  },
  {
    "id": "voice-recognition",
    "chapter": 1,
    "scene": "control",
    "speaker": "",
    "text": "“嫦娥？”你低声重复，心跳还没平复，儿时庭院里的月光却忽然清晰起来。\n眼前的数据仍在平稳刷新，而那个只在故事里出现过的人，正等着你的回答。",
    "portrait": null
  },
  {
    "id": "children-answer",
    "chapter": 1,
    "scene": "control",
    "speaker": "你",
    "text": "会……我也是其中一个。\n小时候想知道月宫是什么样，后来想知道月壤里藏着什么。问题变了，仰望没有停。",
    "portrait": "operator"
  },
  {
    "id": "ask-for-home",
    "chapter": 1,
    "scene": "control",
    "speaker": "嫦娥的声音",
    "text": "那你愿意告诉我，今天的人间是什么模样吗？",
    "portrait": "change",
    "portraitStyle": "apparition"
  },
  {
    "id": "promise",
    "chapter": 1,
    "scene": "control",
    "speaker": "你",
    "text": "愿意。等这次任务的记录传回来，\n我就把它和地球影像放在一起，写成一封给月亮的回信。",
    "portrait": "operator"
  },
  {
    "id": "letter-prepared",
    "chapter": 1,
    "scene": "control",
    "speaker": "",
    "text": "你在工作手记的空白处写下“人间回信”。这是留给古老故事的一份约定。\n真正的任务仍在继续：安全着陆、完成采样、传回记录。",
    "portrait": null
  },
  {
    "id": "departure",
    "chapter": 2,
    "scene": "cosmos",
    "speaker": "",
    "text": "镜头离开地面，沿着信号望向深空。探测器正在接近月球。\n你仍守在测控站，屏幕上的每一个变化，都来自这艘远行的小舟。",
    "portrait": null
  },
  {
    "id": "small-vessel",
    "chapter": 2,
    "scene": "cosmos",
    "speaker": "嫦娥的声音",
    "text": "故事里的远方，如今正在一点点靠近。",
    "portrait": "change",
    "portraitStyle": "apparition"
  },
  {
    "id": "many-hands",
    "chapter": 2,
    "scene": "cosmos",
    "speaker": "地面测控",
    "text": "这艘小小的船，经过了很多人的手。有人反复试验一处接头，有人核对一组数据。\n我在地面接过的，是他们一起铺好的路。",
    "portrait": "operator"
  },
  {
    "id": "exploration-steps",
    "chapter": 2,
    "scene": "cosmos",
    "speaker": "地面测控",
    "text": "从环绕观察，到落上月面，再到带回样本，中国探月的路一步步向前。\n而眼前这次任务，要先完成安全着陆。",
    "portrait": "operator"
  },
  {
    "id": "descent-warning",
    "chapter": 2,
    "scene": "cosmos",
    "speaker": "地面测控",
    "text": "探测器进入下降阶段。按预定方案对准平坦落区，控制下降速度。\n地面收到的每一次变化，都要仔细确认。",
    "portrait": "operator"
  },
  {
    "id": "landing",
    "chapter": 2,
    "scene": "cosmos",
    "task": "landing",
    "title": "这一次，稳稳地抵达",
    "portrait": null
  },
  {
    "id": "touchdown",
    "chapter": 2,
    "scene": "surface",
    "speaker": "地面测控",
    "text": "地面收到着陆确认：接触月面，姿态稳定。\n探测器到了。",
    "portrait": "operator"
  },
  {
    "id": "paved-road",
    "chapter": 2,
    "scene": "surface",
    "speaker": "",
    "text": "眼前是真实的月面：没有宫殿与桂树，只有岩石、尘土和探测器投下的影子。\n你从小听过的传说，曾让你想靠近它；现在，要用观测认识它。",
    "portrait": null
  },
  {
    "id": "mutual-photo",
    "chapter": 2,
    "scene": "surface",
    "speaker": "地面测控",
    "text": "相机影像已收到。检查设备，再记录周围地形。\n抵达只是开始，我们还有许多事要弄明白。",
    "portrait": "operator"
  },
  {
    "id": "sampling-reason",
    "chapter": 2,
    "scene": "surface",
    "speaker": "地面测控",
    "text": "接下来规划采样作业。每份样本都要对应位置与影像，后续研究才能找到依据。\n先在作业图上避开陨坑，再执行采集。",
    "portrait": "operator"
  },
  {
    "id": "sample",
    "chapter": 2,
    "scene": "surface",
    "task": "sample",
    "title": "采集样本，留下完整记录",
    "portrait": null
  },
  {
    "id": "samples-sealed",
    "chapter": 2,
    "scene": "surface",
    "speaker": "地面测控",
    "text": "三处样本已封存，位置和影像一一对应。\n它们尚未回到地球，后续转运与研究还需要这些记录。",
    "portrait": "operator"
  },
  {
    "id": "moon-has-history",
    "chapter": 2,
    "scene": "surface",
    "speaker": "",
    "text": "你在手记里补了一句：“我们终于靠近月亮，却仍有许多不知道的事。”\n那封回信，渐渐有了真正想讲的内容。",
    "portrait": null
  },
  {
    "id": "letter-blocked",
    "chapter": 3,
    "scene": "surface",
    "speaker": "",
    "text": "采样结束，月面设备准备传回完整记录，却在通信检查中发现一段异常连接。\n地面收到的数据断续不全。你开始逐段排查信号路径。",
    "portrait": null
  },
  {
    "id": "waiting-again",
    "chapter": 3,
    "scene": "surface",
    "speaker": "",
    "text": "屏幕上，缺失的数据还没有补齐。\n你对照前一班的记录复查，没有急着写下“任务完成”。",
    "portrait": null
  },
  {
    "id": "keep-promise",
    "chapter": 3,
    "scene": "surface",
    "speaker": "地面测控",
    "text": "异常位置确认。恢复连接后，再核对数据是否完整。\n要交给下一班的，不能只是一句“应该没问题”。",
    "portrait": "operator"
  },
  {
    "id": "upload",
    "chapter": 3,
    "scene": "surface",
    "task": "upload",
    "title": "接通链路，传回完整记录",
    "portrait": null
  },
  {
    "id": "earth-message",
    "chapter": 3,
    "scene": "surface",
    "speaker": "地面测控",
    "text": "任务数据接收完整。位置、影像、样本记录，核对一致。\n交接完成。现在，我想把这一路的经历，写给月下听故事的人。",
    "portrait": "operator"
  },
  {
    "id": "so-many-lights",
    "chapter": 3,
    "scene": "finale",
    "speaker": "",
    "text": "你把地球夜景与月面影像铺在回信里，月光仿佛将信页展开成一片天地。\n在这片由记忆与想象织成的月色里，你终于与嫦娥相见。她站在探测器旁，转身望向你。",
    "portrait": null,
    "portraits": [
      "operator",
      "change"
    ],
    "meeting": true
  },
  {
    "id": "meeting-startle",
    "chapter": 3,
    "scene": "finale",
    "speaker": "",
    "text": "你不自觉地停住脚步，手里的回信攥紧了一角。\n那个曾让你在值班席上惊得回头的声音，如今有了近在眼前的面容。",
    "portrait": null,
    "portraits": [
      "operator",
      "change"
    ],
    "meeting": true
  },
  {
    "id": "meeting-recognition",
    "chapter": 3,
    "scene": "finale",
    "speaker": "主控",
    "text": "你……就是嫦娥？\n那天问我孩子们还看不看月亮的，真的是你？",
    "portrait": "operator",
    "portraits": [
      "operator",
      "change"
    ],
    "meeting": true
  },
  {
    "id": "meeting-greeting",
    "chapter": 3,
    "scene": "finale",
    "speaker": "嫦娥",
    "text": "是我。还记得你答应过，要带我看看今天的人间吗？",
    "portrait": "change",
    "portraits": [
      "operator",
      "change"
    ],
    "meeting": true
  },
  {
    "id": "meeting-introduction",
    "chapter": 3,
    "scene": "finale",
    "speaker": "主控",
    "text": "记得。只是……听见你的声音，和真的站在你面前，还是不一样。\n小时候听故事，怎么也没想到，有一天能亲口把这一路讲给你听。",
    "portrait": "operator",
    "portraits": [
      "operator",
      "change"
    ],
    "meeting": true
  },
  {
    "id": "lights-answer",
    "chapter": 3,
    "scene": "finale",
    "speaker": "主控",
    "text": "你问过，人间的灯还亮着吗？\n你看，有等人回家的窗，也有深夜仍亮着的实验室。我们的测控站，就在其中。",
    "portrait": "operator",
    "portraits": [
      "operator",
      "change"
    ],
    "meeting": true
  },
  {
    "id": "meeting-those-who-wait",
    "chapter": 3,
    "scene": "finale",
    "speaker": "嫦娥",
    "text": "原来，在人间，也有人这样守着长夜。\n这一程，你们走了很久吧？",
    "portrait": "change",
    "portraits": [
      "operator",
      "change"
    ],
    "meeting": true
  },
  {
    "id": "meeting-many-hands",
    "chapter": 3,
    "scene": "finale",
    "speaker": "主控",
    "text": "很久。有人做试验、查故障，有人把一生交给了一个问题。\n今晚，我接过上一班的记录，守住这段信号，再完整交给下一班。你眼前这艘小舟，是大家一起送来的。",
    "portrait": "operator",
    "portraits": [
      "operator",
      "change"
    ],
    "meeting": true
  },
  {
    "id": "moon-received",
    "chapter": 3,
    "scene": "finale",
    "speaker": "嫦娥",
    "text": "从前，人们把走不到的远方，托付给我的故事。\n如今，你们把路一步步走出来了。我等来的，原来是这样的相逢。",
    "portrait": "change",
    "portraitStyle": "apparition",
    "portraits": [
      "operator",
      "change"
    ],
    "meeting": true
  },
  {
    "id": "last-record",
    "chapter": 3,
    "scene": "finale",
    "speaker": "主控",
    "text": "小时候，是你的故事让我抬头看月亮。如今，我想把造探测器、守信号、研究月壤的人，也讲给孩子们听。\n让他们知道，故事里的远方，可以从自己脚下开始。",
    "portrait": "operator",
    "portraits": [
      "operator",
      "change"
    ],
    "meeting": true
  },
  {
    "id": "closing",
    "chapter": 3,
    "scene": "finale",
    "speaker": "嫦娥",
    "text": "那就把这封回信带回人间吧。告诉那个仰头的孩子：月亮还有许多秘密，等着他来问。\n下一次相逢，我想听听他的故事。",
    "portrait": "change",
    "portraits": [
      "operator",
      "change"
    ],
    "meeting": true
  },
  {
    "id": "finale",
    "chapter": 3,
    "scene": "finale",
    "task": "finale",
    "title": "把这一页，留给后来的人",
    "portrait": null
  },
  {
    "id": "return-courtyard",
    "chapter": 3,
    "scene": "ancient",
    "speaker": "",
    "text": "回信的末页，画着开头那座古老庭院。\n你把那个曾经没有答案的问题，重新写在月光下。",
    "portrait": null
  },
  {
    "id": "child-asks-later",
    "chapter": 3,
    "scene": "ancient",
    "speaker": "孩子",
    "text": "那么远的地方，我们真的能走到吗？",
    "portrait": null
  },
  {
    "id": "elder-tells-journey",
    "chapter": 3,
    "scene": "ancient",
    "speaker": "长辈",
    "text": "我还不知道。\n也许，往后的人会找到路。",
    "portrait": null
  },
  {
    "id": "child-next-question",
    "chapter": 3,
    "scene": "ancient",
    "speaker": "",
    "text": "你在这段古老的问答下面，添上今天的回答。\n庭院仍是故事里的庭院，回应却来自真实走过的路。",
    "portrait": null
  },
  {
    "id": "elder-passes-story",
    "chapter": 3,
    "scene": "ancient",
    "speaker": "回信",
    "text": "后来，我们造的探测器到了。\n往后，还会有人接着问，接着走。",
    "portrait": null
  },
  {
    "id": "story-continues",
    "chapter": 3,
    "scene": "ancient",
    "speaker": "",
    "text": "从月下讲述，到认真求索，再到一代代人的共同实践。\n这个从中国讲起的故事，有了新的篇章，也还留着写给未来的空白。",
    "portrait": null
  },
  {
    "id": "ending",
    "chapter": 3,
    "scene": "ancient",
    "ending": true,
    "portrait": null
  }
];
