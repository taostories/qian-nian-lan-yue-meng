(() => {
 'use strict';
 const $=s=>document.querySelector(s),main=$('#content'),app=$('.app');
 const SAVE='moon-dream-v1',nums=['一','二','三','四'];
 let saved=null,index=0,mission={zone:0},completed=new Set(),cleanup=()=>{},view='home',audioCtx=null,master=null,soundOn=false;
 try{const s=JSON.parse(localStorage.getItem(SAVE));if(s&&[1,2,3].includes(s.version)){
  const find=id=>STORY.findIndex(step=>step.id===id);
  const legacyId=n=>Number.isInteger(n)&&n>=0&&n<LEGACY_STORY_IDS.length?LEGACY_STORY_IDS[s.version===1?(n===22?23:n===23?22:n):n]:null;
  const resume=s.version===3?find(s.stepId):find(legacyId(s.index));
  if(resume>=0){
   saved={...s,index:resume};
   completed=new Set((Array.isArray(s.completed)?s.completed:[]).map(n=>find(s.version===3?n:legacyId(n))).filter(n=>n>=0&&(STORY[n].task||STORY[n].ending)));
   if(s.mission&&Number.isInteger(s.mission.zone)&&s.mission.zone>=0&&s.mission.zone<3)mission={zone:s.mission.zone};
  }
 }}catch{}
 function save(){saved={version:3,index,stepId:STORY[index].id,completed:[...completed].map(n=>STORY[n].id),mission:{...mission}};try{localStorage.setItem(SAVE,JSON.stringify(saved))}catch{}}
 function enter(mode){cleanup();cleanup=()=>{};view=mode;app.dataset.mode=mode;main.innerHTML='';window.scrollTo(0,0)}
 function footer(chapter){$('#location').textContent=LOCATIONS[World.scene];$('#chapter-label').textContent=chapter===undefined?'东方月境 · 互动叙事':`第${nums[chapter]}章 · ${CHAPTERS[chapter].split('，')[0]}`;$('#chapter-progress').innerHTML=chapter===undefined?'':nums.map((n,i)=>`<i class="${i<=chapter?'active':''}" aria-label="第${n}章"></i>`).join('');$('#page-count').textContent=chapter===undefined?'一场跨越千年的赴约':`${index+1} / ${STORY.length}`}
 function home(){enter('home');World.set('cover');footer();$('#page-count').textContent='中国探月历程 · 虚构互动叙事';const finished=completed.has(STORY.length-1);main.innerHTML=`<section class="home"><h1 class="home-title"><img src="assets/ui/title-calligraphy.webp?v=warm-moon-20261016" alt="千年揽月梦" width="2095" height="874" fetchpriority="high" draggable="false"></h1><div class="actions"><button class="primary" id="start">${finished?'再赴星河':saved?'继续旅程':'开启旅程'}<svg class="journey-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M16.8 3.6A9 9 0 1 0 20.4 17 8.2 8.2 0 0 1 16.8 3.6Z"/></svg></button>${saved&&!finished?'<button class="text-button" id="restart">从头开始</button>':''}</div></section>`;
  $('#start').onclick=()=>{if(finished){restart();return}index=saved?saved.index:0;render()};if($('#restart'))$('#restart').onclick=restart;
 }
 function restart(){index=0;mission={zone:0};completed.clear();save();render()}
 function advance(){if(index<STORY.length-1){index++;render()}}
 function render(){
  const step=STORY[index];if(step.ending){ending();return}enter(step.task?'task':'dialogue');World.set(step.scene,step.animation||((step.task==='landing')?'landing':''));footer(step.chapter);save();
  const portraitKey=step.portrait??(['你','地面测控'].includes(step.speaker)?'operator':['嫦娥','嫦娥的声音'].includes(step.speaker)&&!['palace','ancient'].includes(step.scene)?'change':null);
  const portraitKeys=step.portraits||(portraitKey?[portraitKey]:[]);
  const portraitImages=portraitKeys.map(key=>{const apparition=key==='change'&&step.portraitStyle!=='solid'&&!['palaceEmpty','palace','ancient'].includes(step.scene);return `<img class="character-portrait character-${key}${apparition?' character-apparition':''}${step.meeting&&portraitKey===key?' is-speaking':''}" src="${CHARACTERS[key]}" alt="${key==='operator'?'主控':apparition?'嫦娥虚影':'嫦娥'}" draggable="false">`}).join('');
  const portrait=step.meeting?`<div class="meeting-portraits">${portraitImages}</div>`:portraitImages;
  const title=`<div class="chapter-heading"><p class="eyebrow">第${nums[step.chapter]}章</p><h2>${CHAPTERS[step.chapter]}</h2></div>`;
  if(step.task){main.innerHTML=`${title}<section class="task-panel">${step.task==='signal'?'':`<div class="speaker">${step.task==='finale'?'终章':'主控 · 任务'}</div>`}<h2>${step.title}</h2><div class="interaction" id="interaction"></div><button class="back task-back" id="back">← 上一段</button></section>`;$('#back').onclick=()=>{index--;render()};mountTask(step);return}
  main.innerHTML=`${title}<div class="dialogue-stack${step.chapter===3?' chapter-four-dialogue':''}">${portrait}<section class="dialogue-panel" aria-label="剧情对话">${step.speaker||step.chapter===3?`<div class="speaker">${step.speaker||''}</div>`:''}<p class="narrative" tabindex="-1">${step.text}</p><div class="story-actions"><button class="back" id="back" ${index===0?'disabled':''}>← 上一段</button><button class="next" id="next">${STORY[index+1]?.ending?'收起故事':STORY[index+1]?.task?'开始操作':'继续'}<span class="arrow" aria-hidden="true">→</span></button></div></section></div>`;
  $('#back').onclick=()=>{if(index>0){index--;render()}};$('#next').onclick=advance;
 }
 function status(text){$('#task-status').textContent=text}
 function complete(text,button='继续故事'){completed.add(index);save();if(['sample','signal'].includes(STORY[index].task)){tone(523.25);advance();return}status(text);$('#interaction').querySelectorAll('input,button').forEach(el=>el.disabled=true);const next=document.createElement('button');next.className='primary';next.id='task-next';next.textContent=button+'  →';next.onclick=advance;const reset=STORY[index].task==='orbit'?$('#radar-reset'):null;if(reset)reset.replaceWith(next);else $('#interaction').appendChild(next);tone(523.25);}
 function mountTask(step){
  const root=$('#interaction'),done=completed.has(index);
  if(step.task!=='finale'){
   cleanup=MoonGames.mount(step.task,root,{complete,tone,mission,onLanding:zone=>{mission.zone=zone;save()}});
  } else if(step.task==='finale'){
   root.innerHTML='<p class="task-description">点击画中的探测器，收好回信，回到故事的开头。</p><p class="task-status" id="task-status" role="status"></p>';
   const probe=document.createElement('button');probe.className='probe-hotspot';probe.id='probe';probe.setAttribute('aria-label','点击画中的探测器，翻到回信末页');probe.innerHTML='<span>探测器 <b aria-hidden="true">✧</b></span>';main.appendChild(probe);
   const position=()=>{const p=World.anchor();probe.style.left=p.x+'px';probe.style.top=p.y+'px'};position();addEventListener('sceneartload',position);let timer;cleanup=()=>{clearTimeout(timer);removeEventListener('sceneartload',position)};
   probe.onclick=()=>{probe.disabled=true;World.set('finale','complete');completed.add(index);save();status('回信写好了。翻回故事的第一页。');timer=setTimeout(advance,1800)};
  }
  // Completed interactions remain replayable; continuation is available on revisit.
  if(done&&step.task!=='finale'){const skip=document.createElement('button');skip.className='text-button replay-next';skip.textContent='已完成 · 继续故事 →';skip.onclick=advance;root.appendChild(skip)}
 }
 function ending(){enter('ending');completed.add(index);save();World.set(STORY[index].scene);World.freeze();footer(3);main.innerHTML='<section class="ending ending-reveal" aria-label="故事结尾"><h2>故事，仍在继续。</h2><p class="end-line"><span>把古老的向往，走成今天的路。</span><span>下一次仰望，也许就从你开始。</span></p><div class="actions"><button class="primary" id="home">返回主页面<span class="arrow" aria-hidden="true">→</span></button><button class="text-button" id="replay">再赴星河</button></div></section>';$('#replay').onclick=restart;$('#home').onclick=home}
 function tone(f){if(!soundOn||!audioCtx)return;const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type='sine';o.frequency.value=f;g.gain.setValueAtTime(0,audioCtx.currentTime);g.gain.linearRampToValueAtTime(.10,audioCtx.currentTime+.02);g.gain.exponentialRampToValueAtTime(.001,audioCtx.currentTime+.8);o.connect(g);g.connect(master);o.start();o.stop(audioCtx.currentTime+.85)}
 $('#sound').onclick=async()=>{
  try{
   if(!audioCtx){audioCtx=new (window.AudioContext||window.webkitAudioContext)();master=audioCtx.createGain();master.gain.value=0;master.connect(audioCtx.destination);[130.81,196,261.63].forEach((f,i)=>{const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type='sine';o.frequency.value=f;g.gain.value=.045/(i+1);o.connect(g);g.connect(master);o.start()})}
   await audioCtx.resume();soundOn=!soundOn;master.gain.setTargetAtTime(soundOn?.55:0,audioCtx.currentTime,.25);$('#sound').setAttribute('aria-pressed',soundOn);$('#sound').setAttribute('aria-label',soundOn?'关闭环境音':'开启环境音');
  }catch{$('#sound').setAttribute('aria-label','当前浏览器不支持环境音')}
 };
 document.addEventListener('visibilitychange',()=>{if(!audioCtx)return;if(document.hidden)audioCtx.suspend();else if(soundOn)audioCtx.resume()});
 $('.brand').onclick=e=>{e.preventDefault();home()};
 addEventListener('keydown',e=>{if(e.repeat||e.ctrlKey||e.metaKey||e.altKey||e.target.matches('input,button,a'))return;if(view==='dialogue'&&[' ','Enter','ArrowRight'].includes(e.key)){e.preventDefault();advance()}if(view==='dialogue'&&e.key==='ArrowLeft'&&index>0){e.preventDefault();index--;render()}});
 home();
})();
