/* 六张整屏原画的唯一入口。将对应 JPG 放入 assets 即可自动替换程序场景。 */
window.ARTWORK = {
  cover:'assets/00-cover.jpg?v=game-art-20261016', ancient:'assets/01-ancient.jpg?v=game-art-20261016', palace:'assets/02-palace.jpg?v=game-art-20261016', palaceEmpty:'assets/02-palace-empty.jpg?v=game-art-20261016', control:'assets/03-control.jpg?v=game-art-20261016',
  cosmos:'assets/04-cosmos.jpg?v=game-art-20261016', surface:'assets/05-surface.jpg?v=game-art-20261016', finale:'assets/06-finale.jpg?v=game-art-20261016'
};
window.CHARACTERS = {operator:'assets/characters/operator.png?v=game-art-20261016',change:'assets/characters/change.png?v=game-art-20261016'};
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
    "text": "回声恢复清晰，探测器的状态数据重新连贯。\n看着屏幕上的月亮，你想起了故事里嫦娥的问话。此后的对话，是你在心中续写的故事。",
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
    "id": "children-answer",
    "chapter": 1,
    "scene": "control",
    "speaker": "你",
    "text": "会。我也是其中一个。\n小时候想知道月宫是什么样，后来想知道月壤里藏着什么。问题变了，仰望没有停。",
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
    "text": "任务数据接收完整。位置、影像、样本记录，核对一致。\n可以交接了。那封留在手记里的回信，也终于能写完。",
    "portrait": "operator"
  },
  {
    "id": "so-many-lights",
    "chapter": 3,
    "scene": "finale",
    "speaker": "",
    "text": "你把地球夜景与月面影像组成回信的最后一页。眼前的画面，是这封信的想象：让远行的探测器，也望一眼故乡。\n故事里嫦娥的声音，又在心中响起。",
    "portrait": null
  },
  {
    "id": "lights-answer",
    "chapter": 3,
    "scene": "finale",
    "speaker": "你",
    "text": "那些灯下，有等人回家的窗，也有工厂、实验室和我们的测控站。\n回信里，我想把他们一起写进去。",
    "portrait": "operator"
  },
  {
    "id": "moon-received",
    "chapter": 3,
    "scene": "finale",
    "speaker": "嫦娥的声音",
    "text": "原来，你们把这么多人的心愿，带到了远方。\n这封人间的回信，我收到了。",
    "portrait": "change",
    "portraitStyle": "apparition"
  },
  {
    "id": "last-record",
    "chapter": 3,
    "scene": "finale",
    "speaker": "",
    "text": "你在正式任务记录上完成交接，又在自己的手记末尾写下：“回信已达。”\n一份留给下一班，一份留给听故事的人。",
    "portrait": null
  },
  {
    "id": "closing",
    "chapter": 3,
    "scene": "finale",
    "speaker": "",
    "text": "这场想象中的对话，到这里轻轻收住。\n真实留下的，是月面的记录，也是人们继续探索的理由。",
    "portrait": null
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
