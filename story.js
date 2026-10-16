/* 六张整屏原画的唯一入口。将对应 JPG 放入 assets 即可自动替换程序场景。 */
window.ARTWORK = {
  cover:'assets/00-cover.jpg', ancient:'assets/01-ancient.jpg', palace:'assets/02-palace.jpg', palaceEmpty:'assets/02-palace-empty.jpg', control:'assets/03-control.jpg',
  cosmos:'assets/04-cosmos.jpg', surface:'assets/05-surface.jpg', finale:'assets/06-finale.jpg'
};
window.CHARACTERS = {operator:'assets/characters/operator.png',change:'assets/characters/change.png'};
window.CHAPTERS = ['万古仰月，旧梦孤寂','广寒坐守，岁岁等候','星河赴约，今夕归期','星月圆梦，续写华章'];
window.LOCATIONS = {cover:'九州山河 · 月出之时',ancient:'九州山河 · 月出之时',palace:'广寒月宫 · 千载守望',palaceEmpty:'广寒月宫 · 千载守望',control:'华夏测控站 · 地月之间',cosmos:'宇宙深空 · 星河赴约',surface:'月球表面 · 今夕归期',finale:'星月同辉 · 千年梦圆'};
// 稳定剧情 ID 用于跨版本存档；旧版本索引只在迁移时读取。
window.LEGACY_STORY_IDS = ["ancient-prologue", "ancient-vow", "ancient-wait", "night-shift", "old-record", "first-call", "orbit", "palace-awakens", "palace-memory", "palace-memory", "broken-question", "broken-question", "repair-reason", "signal", "departure", "departure", "small-vessel", "exploration-steps", "landing", "touchdown", "paved-road", "sample", "letter-blocked", "upload", "earth-message", "so-many-lights", "closing", "finale"];
window.STORY = [
  {
    "id": "ancient-prologue",
    "chapter": 0,
    "scene": "cover",
    "speaker": "",
    "text": "千年前，人间还没有通往月亮的舟楫。人们把仰望与牵挂，编织成奔月的传说。\n一代代人听着这个故事长大，也把新的问题，交给同一轮明月。"
  },
  {
    "id": "ancient-vow",
    "chapter": 0,
    "scene": "cover",
    "speaker": "嫦娥",
    "text": "此去月宫万里，从此人间不问，山河不见。我替世间凡人，守住这份华夏对星河的念想。",
    "animation": "ascend"
  },
  {
    "id": "ancient-wait",
    "chapter": 0,
    "scene": "cover",
    "speaker": "",
    "text": "在这个故事里，嫦娥守着一座清冷的月宫，也守着对人间的记忆。\n月下的山河不断变化。她想知道，讲故事的人，如今过得怎样。"
  },
  {
    "id": "courtyard",
    "chapter": 0,
    "scene": "ancient",
    "speaker": "",
    "text": "古老的庭院里，长辈讲起奔月的故事。孩子伸手指向天空：“那么远的地方，我们真的能走到吗？”\n那时，还没有人能回答。"
  },
  {
    "id": "night-shift",
    "chapter": 0,
    "scene": "control",
    "speaker": "",
    "text": "许多年后，又一个值守的夜晚。你在一处中国航天测控站接班，参与一次探月任务。\n前一班留下的校准记录，正摊在手边。"
  },
  {
    "id": "old-record",
    "chapter": 0,
    "scene": "control",
    "speaker": "你",
    "text": "“偏差已复核，留意弱信号。”前一班在这里做了标记。\n小时候，我也问过月亮有多远。如今，要认真核对的是这几行数。"
  },
  {
    "id": "first-call",
    "chapter": 0,
    "scene": "control",
    "speaker": "你",
    "text": "这里是地面测控站，开始检查地月通信链路。\n前一班的记录已收到，我来接着听。"
  },
  {
    "id": "noise",
    "chapter": 0,
    "scene": "control",
    "speaker": "",
    "text": "杂波一阵阵掠过屏幕。其中一束微弱的脉冲，却始终以相同的节律出现。你转动天线，试着把它留下。"
  },
  {
    "id": "orbit",
    "chapter": 0,
    "scene": "control",
    "task": "orbit",
    "title": "在杂波里，寻找那一声回应"
  },
  {
    "id": "who-replied",
    "chapter": 0,
    "scene": "control",
    "speaker": "你",
    "text": "“人间”？\n刚才那两个字，是谁说的？为什么听起来，像是等了很久？"
  },
  {
    "id": "palace-awakens",
    "chapter": 1,
    "scene": "palace",
    "speaker": "",
    "text": "在这场跨越古今的想象里，传说中的嫦娥听见了你的问候。她从桂树下起身，望向远处熟悉又陌生的山河。"
  },
  {
    "id": "palace-memory",
    "chapter": 1,
    "scene": "palaceEmpty",
    "speaker": "嫦娥",
    "text": "我记得人间的夜晚。门前有灯，有人唤晚归的孩子回家。\n如今，那些灯还亮着吗？你能让我再看一眼吗？"
  },
  {
    "id": "broken-question",
    "chapter": 1,
    "scene": "palaceEmpty",
    "speaker": "嫦娥",
    "text": "如今……孩子……\n还会……认星星……人间……"
  },
  {
    "id": "repair-reason",
    "chapter": 1,
    "scene": "control",
    "speaker": "你",
    "text": "别急，我在听。\n你的声音断了几次，我先把它接稳。"
  },
  {
    "id": "signal",
    "chapter": 1,
    "scene": "control",
    "task": "signal",
    "title": "把她的牵挂，听完整"
  },
  {
    "id": "echo-restored",
    "chapter": 1,
    "scene": "control",
    "speaker": "",
    "text": "回声恢复清晰。她似乎有一个问题。"
  },
  {
    "id": "children-question",
    "chapter": 1,
    "scene": "control",
    "speaker": "嫦娥",
    "text": "如今的孩子，还会坐在门前认星星吗？\n我记得的那些人间灯火，现在是什么模样？"
  },
  {
    "id": "children-answer",
    "chapter": 1,
    "scene": "control",
    "speaker": "你",
    "text": "会。我也是听着奔月故事长大的孩子。\n后来才知道，想走近月亮，要把故事里的好奇，变成一个个可以求证的问题。"
  },
  {
    "id": "ask-for-home",
    "chapter": 1,
    "scene": "control",
    "speaker": "嫦娥",
    "text": "那你能让我看看，他们生活的地方吗？"
  },
  {
    "id": "promise",
    "chapter": 1,
    "scene": "control",
    "speaker": "你",
    "text": "能。我答应你。\n先完成这次探测，把链路接稳，再把今天的人间送给你看。"
  },
  {
    "id": "letter-prepared",
    "chapter": 1,
    "scene": "control",
    "speaker": "",
    "text": "你把地球影像加入待发送记录。任务清单上的着陆、采样和通信检查，仍要逐项完成。\n而在清单旁，你多记了一件事：给她一封人间回信。"
  },
  {
    "id": "departure",
    "chapter": 2,
    "scene": "cosmos",
    "speaker": "",
    "text": "探测器离开地球，驶向月球。它的身影在星海中越来越小，身后却连着许多人的工作：反复验算的轨道、一次次试验、写满批注的记录。",
    "animation": "launch"
  },
  {
    "id": "small-vessel",
    "chapter": 2,
    "scene": "cosmos",
    "speaker": "嫦娥",
    "text": "从这里望去，人间的船这样小。"
  },
  {
    "id": "many-hands",
    "chapter": 2,
    "scene": "cosmos",
    "speaker": "你",
    "text": "这艘小小的船，经过了很多人的手。有人反复试验一处接头，有人核对一组数据。\n轮到我，就把这一班守好。"
  },
  {
    "id": "exploration-steps",
    "chapter": 2,
    "scene": "cosmos",
    "speaker": "你",
    "text": "中国探月工程按“绕、落、回”一步步推进。每一次取得的认识，都为下一步探路。\n今夜这次任务，也要留下经得起核对的记录。"
  },
  {
    "id": "descent-warning",
    "chapter": 2,
    "scene": "cosmos",
    "speaker": "你",
    "text": "开始执行下降方案。目标是选定的平坦落区，注意避开陨坑。\n先稳稳落下去。答应她的回信，还在等着发送。"
  },
  {
    "id": "landing",
    "chapter": 2,
    "scene": "cosmos",
    "task": "landing",
    "title": "这一次，稳稳地抵达"
  },
  {
    "id": "touchdown",
    "chapter": 2,
    "scene": "surface",
    "speaker": "你",
    "text": "接触月面。姿态稳定。\n我们到了。"
  },
  {
    "id": "paved-road",
    "chapter": 2,
    "scene": "surface",
    "speaker": "嫦娥",
    "text": "我只看见它来到眼前。\n原来，这一路还有那么多我看不见的人。"
  },
  {
    "id": "mutual-photo",
    "chapter": 2,
    "scene": "surface",
    "speaker": "你",
    "text": "2013年，嫦娥三号着陆器和“玉兔号”巡视器在月面完成互拍。\n那些照片让我第一次觉得，书里的远方，也可以被人亲手记录。"
  },
  {
    "id": "sampling-reason",
    "chapter": 2,
    "scene": "surface",
    "speaker": "你",
    "text": "先完成采样。样本的位置、周围的影像，都要记清。\n我们在这张作业图上规划路线，让采样装置避开陨坑，完成采集后返回。"
  },
  {
    "id": "sample",
    "chapter": 2,
    "scene": "surface",
    "task": "sample",
    "title": "带回样本，也带回月面的见闻"
  },
  {
    "id": "samples-sealed",
    "chapter": 2,
    "scene": "surface",
    "speaker": "你",
    "text": "三处样本已封存，位置和影像一一对应。\n它们还没有回到地球。后面的转运与研究，也要靠这些记录接着做。"
  },
  {
    "id": "moon-has-history",
    "chapter": 2,
    "scene": "surface",
    "speaker": "嫦娥",
    "text": "那就把每一步做好。我等得起。\n这一次，我知道你们为什么忙。"
  },
  {
    "id": "letter-blocked",
    "chapter": 3,
    "scene": "surface",
    "speaker": "",
    "text": "采样记录已整理好，通信检查却发现一段异常连接。任务数据与那封回信，都在等待传送。\n你沿着信号路径，逐段排查。"
  },
  {
    "id": "waiting-again",
    "chapter": 3,
    "scene": "surface",
    "speaker": "嫦娥",
    "text": "我还在。\n只是这一次，我知道有人会回答。"
  },
  {
    "id": "keep-promise",
    "chapter": 3,
    "scene": "surface",
    "speaker": "你",
    "text": "找到异常位置了。我先恢复连接，确认任务数据传回。\n再把答应你的那幅影像送过去。"
  },
  {
    "id": "upload",
    "chapter": 3,
    "scene": "surface",
    "task": "upload",
    "title": "让这封人间回信，真正抵达"
  },
  {
    "id": "earth-message",
    "chapter": 3,
    "scene": "surface",
    "speaker": "你",
    "text": "任务数据传输正常。现在，发送那封回信。\n你看，山河之间亮起来的地方，是今天的人间。"
  },
  {
    "id": "so-many-lights",
    "chapter": 3,
    "scene": "finale",
    "speaker": "嫦娥",
    "text": "原来月亮下面，已经有这么多灯了。"
  },
  {
    "id": "lights-answer",
    "chapter": 3,
    "scene": "finale",
    "speaker": "你",
    "text": "有等人回家的灯，也有实验室、工厂和此刻还在值守的测控站。\n把我们送到这里的人，就在那些灯下。"
  },
  {
    "id": "moon-received",
    "chapter": 3,
    "scene": "finale",
    "speaker": "嫦娥",
    "text": "那就告诉他们——\n月亮收到了。"
  },
  {
    "id": "last-record",
    "chapter": 3,
    "scene": "finale",
    "speaker": "你",
    "text": "“任务记录已交接，回信已达。”\n下一班接过这些记录，就能继续向前。"
  },
  {
    "id": "closing",
    "chapter": 3,
    "scene": "finale",
    "speaker": "",
    "text": "月面的影像仍在传来。你把这一刻留进记录，也想起很久以前，那个指着月亮的孩子。"
  },
  {
    "id": "finale",
    "chapter": 3,
    "scene": "finale",
    "task": "finale",
    "title": "把这一刻，留在星河"
  },
  {
    "id": "return-courtyard",
    "chapter": 3,
    "scene": "ancient",
    "speaker": "",
    "text": "那幅古老的庭院，在月光里重新浮现。\n像翻回故事的第一页，孩子仍指着天边的月亮。"
  },
  {
    "id": "child-asks-later",
    "chapter": 3,
    "scene": "ancient",
    "speaker": "孩子",
    "text": "那么远的地方，我们真的能走到吗？"
  },
  {
    "id": "elder-tells-journey",
    "chapter": 3,
    "scene": "ancient",
    "speaker": "长辈",
    "text": "我还不知道。\n也许，往后的人会找到路。"
  },
  {
    "id": "child-next-question",
    "chapter": 3,
    "scene": "control",
    "speaker": "",
    "text": "千年后的测控室里，新一幅月面影像已经传回。\n当年的问话，终于有了回音。"
  },
  {
    "id": "elder-passes-story",
    "chapter": 3,
    "scene": "control",
    "speaker": "你",
    "text": "这一次，我们到了。\n把记录留好，交给下一班。还有新的问题，等着后来的人。"
  },
  {
    "id": "story-continues",
    "chapter": 3,
    "scene": "ancient",
    "speaker": "",
    "text": "月光下，奔月的故事还会被讲起。如今，讲故事的人还可以说：月亮上，也有我们探索的足迹。\n这个从中国讲起的故事，还在被一代代人接着写下去。"
  },
  {
    "id": "ending",
    "chapter": 3,
    "scene": "ancient",
    "ending": true
  }
];
