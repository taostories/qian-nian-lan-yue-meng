(() => {
 'use strict';
 const R=window.MoonRules;
 const NS='http://www.w3.org/2000/svg';
 const point=(a,r,c=160)=>[c+Math.cos(a*Math.PI/180)*r,c+Math.sin(a*Math.PI/180)*r];
 function mount(kind,root,{complete,tone,mission,onLanding}){
  const ac=new AbortController();let disposed=false,finished=false,raf=0,previous=0;
  const timers=new Set();
  const $=s=>root.querySelector(s);
  const listen=(el,name,fn,opts={})=>el.addEventListener(name,fn,{...opts,signal:ac.signal});
  const later=(fn,ms)=>{const id=setTimeout(()=>{timers.delete(id);if(!disposed)fn()},ms);timers.add(id);return id};
  const say=(text,warning=false)=>{const el=$('.readout');if(el&&el.textContent!==text)el.textContent=text;if(el)el.classList.toggle('warning',warning)};
  const done=(text,label='继续故事')=>{if(finished||disposed)return;finished=true;cancelAnimationFrame(raf);complete(text,label)};
  const frame=fn=>{const loop=t=>{if(disposed||finished)return;const dt=previous?Math.min((t-previous)/1000,.05):0;previous=t;if(!document.hidden)fn(dt,t);if(!disposed&&!finished)raf=requestAnimationFrame(loop)};raf=requestAnimationFrame(loop)};
  listen(document,'visibilitychange',()=>{previous=0});
  const help=text=>`<details class="game-help"><summary>游戏玩法</summary><p>${text}</p></details>`;
  const status='<p class="task-status" id="task-status" role="status"></p>';
  const range=(id,label,min,max,value)=>`<div class="range-label"><label for="${id}">${label}</label><output id="${id}-value" for="${id}">${value}</output></div><input id="${id}" type="range" min="${min}" max="${max}" value="${value}">`;
  function shell(html){root.innerHTML=`<div class="mission" data-game="${kind}">${html}${status}</div>`}
  function heldButton(button,change){
   const pointers=new Set(),keys=new Set();const set=()=>{const held=pointers.size+keys.size>0;button.classList.toggle('pressed',held);change(held)};
   listen(button,'pointerdown',e=>{if(button.disabled)return;e.preventDefault();if(e.pointerType!=='touch')button.focus();button.setPointerCapture(e.pointerId);pointers.add(e.pointerId);set()});
   for(const event of ['pointerup','pointercancel','lostpointercapture'])listen(button,event,e=>{pointers.delete(e.pointerId);set()});
   listen(button,'keydown',e=>{if([' ','Enter'].includes(e.key)&&!button.disabled){e.preventDefault();keys.add(e.key);set()}});
   listen(button,'keyup',e=>{if([' ','Enter'].includes(e.key)){e.preventDefault();keys.delete(e.key);set()}});
   const clear=()=>{pointers.clear();keys.clear();set()};listen(button,'blur',clear);listen(window,'blur',clear);listen(document,'visibilitychange',clear);
  }
  function orbit(){
   shell(`<p class="objective">辨认规律信号，微调天线保持对准。</p><div class="mission-layout"><svg id="radar" class="mission-visual" viewBox="0 0 320 320" role="group" aria-label="天线雷达，点击信号瞄准，移动鼠标或触屏拖动调整方向"><circle cx="160" cy="160" r="132" fill="none" stroke="#63537c"/><circle cx="160" cy="160" r="88" fill="none" stroke="#3b3052"/><circle cx="160" cy="160" r="44" fill="none" stroke="#3b3052"/><path d="M28 160H292 M160 28V292" stroke="#3b3052"/><path id="beam" fill="#b794ff25" stroke="#c8b5ff88"/><g id="echoes"></g><circle cx="160" cy="160" r="5" fill="#ede0ff"/></svg><div class="mission-controls">${range('direction','天线方位',0,359,15)}<div class="controls aim-controls"><button class="secondary" id="aim-left" aria-label="天线逆时针微调6度">← 微调</button><button class="secondary" id="aim-right" aria-label="天线顺时针微调6度">微调 →</button></div><svg class="wave-preview" id="echo-wave" viewBox="0 0 400 65" aria-label="当前接收到的信号波形"><path fill="none" stroke="#bfa5ff" stroke-width="2"/></svg><div class="stats"><span>锁定 <strong id="tracking">0%</strong></span><span id="quality">等待监听</span></div><div class="meter"><span id="tracking-bar"></span></div><p class="readout" role="status">三个信号中，只有一个脉冲始终规律。</p><div class="controls"><button class="secondary" id="radar-reset">重新搜索</button></div></div></div>${help('点击信号只对准当前位置，不会自动追踪。进入后自动检测，观察波形，接收范围固定为24°，找到等间隔脉冲后保持对准。鼠标在雷达上移动即可瞄准，不必按住；手机按住拖动，也可重复点击光点或使用左右微调按钮。需要累计稳定接收6秒，短暂偏离不会立即扣进度，偏离超过1秒才缓慢回退。键盘可用Tab选中信号，按回车或空格对准，方位滑块支持方向键微调。')}`);
   let time=0,progress=0,angle=15,selected=-1,lostTime=0;
   const width=24;
   const signalNames=['甲','乙','丙'];
   const signalAngles=()=>[(210+time*4+Math.sin(time)*5)%360,(70+time*4)%360,(305-time*4+Math.sin(time)*7+3600)%360];
   const echoes=$('#echoes');for(let i=0;i<3;i++){const g=document.createElementNS(NS,'g');g.dataset.echo=i;g.setAttribute('role','button');g.setAttribute('tabindex','0');g.setAttribute('aria-label',`对准${signalNames[i]}信号`);g.setAttribute('aria-pressed','false');g.innerHTML=`<circle r="22" fill="transparent"/><circle class="echo-selection" r="13" fill="none" stroke="#f0e4ff" stroke-width="2" opacity="0"/><circle r="7" fill="${['#8fbcf3','#d0b8ff','#b19bd3'][i]}"/><text y="-14" text-anchor="middle">${signalNames[i]}</text>`;echoes.appendChild(g);listen(g,'keydown',e=>{if(['Enter',' '].includes(e.key)){e.preventDefault();selectSignal(i)}})}
   function markSignal(i){selected=i;[...echoes.children].forEach((g,n)=>{g.setAttribute('aria-pressed',String(n===i));g.querySelector('.echo-selection').setAttribute('opacity',n===i?'1':'0')})}
   function selectSignal(i){if(finished)return;markSignal(i);$('#direction').value=Math.round(signalAngles()[i]);updateControls();say(`已对准${signalNames[i]}信号，观察波形是否规律。`)}
   function updateControls(){angle=+$('#direction').value;$('#direction-value').textContent=angle+'°'}
   for(const [id,delta] of [['aim-left',-6],['aim-right',6]])listen($('#'+id),'click',()=>{if(finished)return;$('#direction').value=(angle+delta+360)%360;updateControls()});
   listen($('#direction'),'input',()=>{markSignal(-1);updateControls()});updateControls();
   function aim(e){const box=$('#radar').getBoundingClientRect(),scale=Math.min(box.width,box.height)/320,cx=box.left+box.width/2,cy=box.top+box.height/2;if(Math.hypot(e.clientX-cx,e.clientY-cy)<10*scale)return;$('#direction').value=Math.round((Math.atan2(e.clientY-cy,e.clientX-cx)*180/Math.PI+360)%360);updateControls()}
   listen($('#radar'),'pointerdown',e=>{if(finished)return;const signal=e.target.closest('[data-echo]');if(signal){selectSignal(+signal.dataset.echo);$('#radar').setPointerCapture(e.pointerId);return}markSignal(-1);$('#radar').setPointerCapture(e.pointerId);aim(e)});listen($('#radar'),'pointermove',e=>{if(!finished&&(e.pointerType==='mouse'||$('#radar').hasPointerCapture(e.pointerId)))aim(e)});
   for(const event of ['pointerup','pointercancel'])listen($('#radar'),event,e=>{if($('#radar').hasPointerCapture(e.pointerId))$('#radar').releasePointerCapture(e.pointerId)});
   listen($('#radar-reset'),'click',()=>{time=0;progress=0;lostTime=0;previous=0;markSignal(-1);$('#direction').value=15;updateControls();say('三个信号中，只有一个脉冲始终规律。')});
   frame(dt=>{
    time+=dt;
    const angles=signalAngles();
    angles.forEach((a,i)=>{const p=point(a,[83,116,98][i]);echoes.children[i].setAttribute('transform',`translate(${p})`)});
    const a=point(angle-width/2,135),b=point(angle+width/2,135);$('#beam').setAttribute('d',`M160 160L${a}A135 135 0 0 1 ${b}Z`);
    let picked=-1,min=Infinity;angles.forEach((a,i)=>{const d=R.angleDistance(a,angle);if(d<width/2&&d<min){min=d;picked=i}});
    const valid=picked===1;
    {lostTime=valid?0:lostTime+dt;progress=R.clamp(progress+dt*(valid?1:lostTime>1?-.25:0),0,6);say(picked===-1?'未接收到信号，转动天线寻找。':picked!==1?'脉冲不稳定，继续寻找其他信号。':min>width*.35?'信号接近边缘，继续跟随光点。':'保持跟踪，地月链路正在建立。')}
    let d='';for(let x=0;x<=400;x+=2){let y=32;if(picked===1){const phase=(x/55+time*1.6)%1;y-=Math.exp(-(((phase-.5)*12)**2))*24}else if(picked!==-1)y+=Math.sin(x*.09+time*3)*Math.cos(x*.037-time)*22;else y+=Math.sin(x*.31+time)*2;d+=`${x?'L':'M'}${x},${y}`;}$('#echo-wave path').setAttribute('d',d);
    $('#tracking').textContent=Math.round(progress/6*100)+'%';$('#tracking-bar').style.width=progress/6*100+'%';$('#quality').textContent=(selected!==-1?`目标${signalNames[selected]} · `:'')+(picked===-1?'无信号':picked===1?'节律稳定':'杂波');
    if(progress>=6){say('探测器信号已锁定。');done('稳定信号已捕获，可以继续核对数据。','核对来信')}
   });
  }
  function signal(){
   const fragments=['遥测','姿态','链路'];let shifts=[0,0,0];
   shell(`<p class="objective">左右移动三路回声，让亮色脉冲与虚线重合。</p><div class="signal-rows">${[0,1,2].map(i=>`<div class="signal-row" data-channel="${i}"><span class="channel-name">回声 ${['一','二','三'][i]}</span><div><svg class="wave-drag" preserveAspectRatio="none" data-wave="${i}" viewBox="0 0 600 72" role="img" aria-label="第${i+1}路波形，可左右拖动"><path class="reference" fill="none" stroke="#a69ab866" stroke-dasharray="5 5"/><path class="signal-path" fill="none" stroke="${['#c8b5ff','#88b5f5','#e0bce3'][i]}" stroke-width="2"/></svg><input type="range" id="phase-${i}" aria-label="第${i+1}路回声时间位置" min="0" max="99" value="0"></div><p class="channel-copy">尚未听清</p></div>`).join('')}</div><div class="stats"><span>已修复 <strong id="aligned-count">0 / 3</strong></span></div><p class="readout" role="status">三路回声都清晰后，才能接收完整信息。</p><div class="controls signal-actions"><button class="primary" id="decode">接收完整回声</button><button class="secondary" id="signal-reset">重新调试</button></div>${help('虚线是统一时钟，亮线是收到的回声。拖动波形，或使用其下方滑块，让各组脉冲与虚线对齐。每修好一路便能读到一个片段；三路全部对齐后接收。滑块聚焦后可用方向键微调。')}`);
   function shape(shift){let path='';for(let x=0;x<=600;x+=2){const p=((x/600*100+shift)%100+100)%100;let v=0;for(const center of [12,30,62,84])v+=Math.exp(-(((p-center)/2.3)**2))*(center===62?45:28);path+=`${x?'L':'M'}${x},${60-v}`;}return path}
   function update(){let count=0;shifts.forEach((s,i)=>{const row=$(`[data-channel="${i}"]`),ok=R.aligned(R.pulseOffsets[i],s);if(ok)count++;row.classList.toggle('is-aligned',ok);row.querySelector('.reference').setAttribute('d',shape(0));row.querySelector('.signal-path').setAttribute('d',shape(R.pulseOffsets[i]+s));row.querySelector('.channel-copy').textContent=ok?'「'+fragments[i]+'」':'尚未听清'});$('#aligned-count').textContent=count+' / 3';say(count===3?'三路回声已同步，可以接收。':'三路回声都清晰后，才能接收完整信息。')}
   [0,1,2].forEach(i=>{const input=$('#phase-'+i),svg=$(`[data-wave="${i}"]`);listen(input,'input',()=>{shifts[i]=+input.value;update()});let startX=0,startShift=0;listen(svg,'pointerdown',e=>{if(finished)return;svg.setPointerCapture(e.pointerId);startX=e.clientX;startShift=shifts[i]});listen(svg,'pointermove',e=>{if(finished||!svg.hasPointerCapture(e.pointerId))return;const width=svg.getBoundingClientRect().width;shifts[i]=(Math.round(startShift-(e.clientX-startX)/width*100)+1000)%100;input.value=shifts[i];update()})});
   listen($('#decode'),'click',()=>{if(shifts.every((v,i)=>R.aligned(R.pulseOffsets[i],v)))done('回声恢复清晰，探测器的状态数据重新连贯。','继续故事');else say('仍有回声错位，请让三路亮线都与虚线重合。',true)});
   listen($('#signal-reset'),'click',()=>{shifts=[0,0,0];[0,1,2].forEach(i=>$('#phase-'+i).value=0);update()});update();
  }
  function landing(){
   shell(`<p class="objective">落点已确定为静海平原，控制推力，稳稳落在亮色平台。</p><div class="mission-layout"><svg id="flight" class="mission-visual" viewBox="0 0 500 310" role="img" aria-label="月面下降示意，唯一亮色平台为静海平原安全落点"><defs><linearGradient id="flight-sky" x2="0" y2="1"><stop stop-color="#100e26"/><stop offset="1" stop-color="#2b2046"/></linearGradient></defs><path d="M0 0H500V310H0Z" fill="url(#flight-sky)"/><path d="M0 279L12 265L56 269L78 262L166 272L190 261L224 275L282 266L320 274L360 264L442 275L480 261L500 270V310H0Z" fill="#554961"/><g id="pads"></g><g id="lander"><path d="M-12-10H12L17 7H-17Z" fill="#d4c0a0"/><path d="M-12 7L-22 19M12 7L22 19M-27 19H-17M17 19H27M0-10V-23M-7-23H7" stroke="#ded6ef" stroke-width="2"/><path id="exhaust" d="M-6 10L0 29L6 10" fill="#b49aff"/></g><text x="15" y="28" id="altitude-label">距月面 100 米</text></svg><div class="mission-controls"><div class="stats"><span>下降 <strong id="speed">2.0 m/s</strong></span><span>燃料 <strong id="fuel">100%</strong></span></div><div class="meter"><span id="fuel-bar" style="width:100%"></span></div><p class="readout" role="status">静海平原地势平坦、落区宽，适合本次着陆。</p><div class="flight-controls"><button class="secondary" id="flight-left" aria-label="向左调整">←</button><button class="primary hold-button" id="thrust">按住推进器</button><button class="secondary" id="flight-right" aria-label="向右调整">→</button></div><div class="controls landing-actions"><button class="secondary" id="flight-retry">重新着陆</button><button class="secondary hidden" id="flight-assist">降低难度</button></div></div></div>${help('左右键调整位置，空格键或按住推进器按钮减速；手机可同时按方向与推进器。下降速度不超过 3 m/s，且落在安全平台内，才算成功。燃料有限：先对准落点，接近月面时再逐渐减速。进入后自动下降；切换页面时暂停，返回后自动继续。本次统一在静海平原着陆，失败可直接重试。')}`);
   let zone=0,easy=false,state=R.flight(),running=true,attempts=0;
   const input={left:false,right:false,thrust:false},keyboard={left:false,right:false,thrust:false},touch={left:false,right:false,thrust:false};
   function sync(){for(const k of Object.keys(input))input[k]=touch[k]||keyboard[k]}
   for(const [id,key] of [['flight-left','left'],['flight-right','right'],['thrust','thrust']])heldButton($('#'+id),v=>{touch[key]=v;sync()});
   const keyMap={ArrowLeft:'left',ArrowRight:'right',' ':'thrust'};
   listen(window,'keydown',e=>{if(e.target.matches('input')||!keyMap[e.key]||finished||(e.key===' '&&e.target.matches('button')&&!e.target.closest('.flight-controls')))return;e.preventDefault();keyboard[keyMap[e.key]]=true;sync()});
   listen(window,'keyup',e=>{if(keyMap[e.key]){e.preventDefault();keyboard[keyMap[e.key]]=false;sync()}});
   function release(){for(const k of Object.keys(input)){keyboard[k]=false;touch[k]=false}sync()}
   function pause(){release();if(running){running=false;say('已暂停，返回页面后继续下降。');draw()}}
   function resume(){if(document.hidden||finished||state.outcome)return;previous=0;running=true;say('方向键调整位置，按住推进器减速。');draw()}
   listen(window,'blur',pause);listen(window,'focus',resume);listen(document,'visibilitychange',()=>{if(document.hidden)pause();else resume()});
   function draw(){const pad=R.zones[zone];$('#pads').innerHTML=`<path d="M${pad.x*5-pad.width*2.5} 278h${pad.width*5}" stroke="#e1ceff" stroke-width="5"/><text x="${pad.x*5}" y="301" text-anchor="middle" style="font-size:15px">安全落点</text>`;$('#lander').setAttribute('transform',`translate(${state.x*5},${259-Math.min(state.y,110)*2.1})`);$('#exhaust').style.display=running&&input.thrust&&state.fuel>0?'':'none';$('#altitude-label').textContent='距月面 '+Math.round(state.y)+' 米';$('#speed').textContent=state.vy.toFixed(1)+' m/s';$('#speed').style.color=state.vy>(easy?4.5:3)?'#ffb6b0':'#d8c4ff';$('#fuel').textContent=Math.round(state.fuel)+'%';$('#fuel-bar').style.width=state.fuel/(easy?140:100)*100+'%';root.dataset.flight=state.outcome||(running?'flying':'paused');World.landing(R.clamp(1-state.y/100,0,1))}
   function reset(){release();running=true;previous=0;state=R.flight(zone,easy);say(easy?'辅助已开启：燃料更多，允许下降速度提高至 4.5 m/s。':'先对准安全平台，接近月面时减速。');draw()}
   listen($('#flight-retry'),'click',reset);
   listen($('#flight-assist'),'click',()=>{easy=true;$('#flight-assist').classList.add('hidden');reset()});
   frame(dt=>{if(running){state=R.stepFlight(state,input,dt);if(state.outcome){running=false;release();if(state.outcome==='landed'){onLanding(zone);draw();say('软着陆成功，准备开展月面任务。');done('已在'+R.zones[zone].name+'平稳着陆。');return}attempts++;say(state.outcome==='fast'?'下降速度过快。接近月面时提前减速，再试一次。':'偏离安全平台。先用左右方向对准亮色落点。',true);if(attempts>=2&&!easy)$('#flight-assist').classList.remove('hidden')}else if(state.fuel===0)say('燃料耗尽，仍可调整方向；也可重新着陆。',true);else if(state.y<25&&state.vy>3)say('接近月面，启动推进器降低下降速度。',true)}draw()});draw();
  }
  function sample(){
   const zone=Number.isInteger(mission.zone)?mission.zone:0,start=R.grid.starts[zone];let route=[start],executing=false;
   shell(`<p class="objective">规划一条路线：采齐三种样本，再返回探测器。</p><div class="mission-layout"><div><div class="route-grid" role="group" aria-label="月面路线规划，七列五行">${Array.from({length:35},(_,n)=>{const sample=R.grid.samples.indexOf(n),rock=R.grid.rocks.includes(n),label=n===start?'探测器':sample>=0?['月壤','岩屑','岩芯'][sample]:rock?'陨坑':'空地';return `<button class="route-cell ${rock?'rock':''}" data-cell="${n}" aria-label="第${Math.floor(n/7)+1}行第${n%7+1}列 ${label}">${n===start?'舟':sample>=0?['壤','屑','芯'][sample]:rock?'◈':'·'}</button>`}).join('')}</div><p class="legend">舟：探测器　◈：陨坑　壤 / 屑 / 芯：样本</p></div><div class="mission-controls"><div class="stats"><span>路线 <strong id="route-steps"></strong></span><span>样本 <strong id="samples-count">0 / 3</strong></span></div><p class="readout" role="status">从发光格出发，点击相邻格延长路线。</p><div class="controls"><button class="secondary" id="undo-route">撤回一步</button><button class="secondary" id="reset-route">重新规划</button><button class="primary" id="execute-route" disabled>执行采样</button></div><p class="hint-line">当前落点：${R.zones[zone].name}</p></div></div>${help('每次只能走上下左右相邻一格，陨坑不能通过。重复经过也会消耗步数；可以随时撤回或重新规划。路线必须经过三种样本，并返回“舟”，且不超过预算。满足条件后执行，探测器才会按规划采集。也可以聚焦地图后用方向键规划。')}`);
   function redraw(){const info=R.routeInfo(route,zone);$('#route-steps').textContent=`${info.steps} / ${info.budget} 步`;$('#samples-count').textContent=info.collected.length+' / 3';$('#execute-route').disabled=!info.ready||executing;$('#undo-route').disabled=route.length===1||executing;root.querySelectorAll('[data-cell]').forEach(b=>{const n=+b.dataset.cell;b.classList.toggle('visited',route.includes(n));b.classList.toggle('current',n===route.at(-1));b.classList.toggle('collected',info.collected.includes(n));b.setAttribute('aria-current',n===route.at(-1)?'location':'false')});if(info.ready)say('路线已闭合，三种样本都在路上，可以执行。');else if(info.collected.length===3)say('三种样本已规划，继续返回“舟”。');else say('从发光格出发，点击相邻格延长路线。')}
   function move(n){if(executing||finished)return;const tail=route.at(-1);if(R.grid.rocks.includes(n)){say('这里是陨坑，换一条路。',true);return}if(n<0||n>=35||Math.abs(n%7-tail%7)+Math.abs(Math.floor(n/7)-Math.floor(tail/7))!==1){say('只能走到发光格上下左右的相邻格。',true);return}if(route.length-1>=R.zones[zone].budget){say('已达到路线预算，撤回几步再规划。',true);return}route.push(n);redraw()}
   root.querySelectorAll('[data-cell]').forEach(b=>listen(b,'click',()=>move(+b.dataset.cell)));
   listen($('.route-grid'),'keydown',e=>{const delta={ArrowUp:-7,ArrowDown:7,ArrowLeft:-1,ArrowRight:1}[e.key];if(delta){e.preventDefault();move(route.at(-1)+delta)}});
   listen($('#undo-route'),'click',()=>{if(route.length>1&&!executing){route.pop();redraw()}});listen($('#reset-route'),'click',()=>{if(!executing){route=[start];redraw()}});
   listen($('#execute-route'),'click',()=>{if(!R.routeInfo(route,zone).ready||executing)return;executing=true;root.querySelectorAll('button').forEach(b=>b.disabled=true);let i=0;say('正在沿规划路线采集……');const visit=()=>{root.querySelectorAll('[data-cell]').forEach(b=>b.classList.toggle('path-animate',+b.dataset.cell===route[i]));if(R.grid.samples.includes(route[i]))tone(440);if(i===route.length-1){say('采样完成，已安全返回探测器。');done('三种样本已封存，月面影像已记录。','继续记录');return}i++;later(visit,matchMedia('(prefers-reduced-motion: reduce)').matches?45:150)};visit()});redraw();
  }
  function upload(){
   let rotations=[...R.circuitStart];
   shell(`<p class="objective">旋转线路，接通天线，让完整的任务记录传回地面。</p><div class="mission-layout"><div class="circuit-board"><div class="circuit-label circuit-entry">探测器 · 左上入口</div><div class="circuit-grid" role="group" aria-label="三乘三通讯线路">${rotations.map((_,i)=>`<button class="circuit-tile" data-tile="${i}" aria-label="旋转第${Math.floor(i/3)+1}行第${i%3+1}列线路"><svg viewBox="0 0 80 80" aria-hidden="true"><path class="wire"/><circle cx="40" cy="40" r="5" fill="#e4d5fa"/></svg></button>`).join('')}</div><div class="circuit-label circuit-exit">天线 · 右下出口</div></div><div class="mission-controls"><p class="readout" role="status">从左上角接入，让相邻线路端口相对。</p><div class="controls"><button class="secondary" id="circuit-reset">重置线路</button></div><p class="hint-line">从左侧接入，向右侧接出；接通后自动完成。</p></div></div>${help('点击模块顺时针旋转90°。左上格的左端是探测器，右下格的右端是天线；相邻模块只有端口相对才能连通。两端的短线标记表示固定接口。让信号从入口流向出口，接通后自动完成。不必让所有支路通电。')}`);
   function update(){const info=R.circuit(rotations);root.querySelectorAll('[data-tile]').forEach((b,i)=>{const mask=R.ports(R.circuitBase[i],rotations[i]);b.classList.toggle('powered',info.powered.includes(i));const ends=[[40,0],[80,40],[40,80],[0,40]];b.querySelector('.wire').setAttribute('d',ends.map((p,d)=>mask&(1<<d)?`M40 40L${p}`:'').join(''));b.setAttribute('aria-label',`旋转第${Math.floor(i/3)+1}行第${i%3+1}列线路，当前连接${['上','右','下','左'].filter((_,d)=>mask&(1<<d)).join('与')}${info.powered.includes(i)?'，已通电':''}`)});$('.circuit-board').classList.toggle('connected',info.connected);
    if(info.connected){say('地月通讯已接通。');done('月面影像已回传，人间的回信也已送达。','让她看看人间')}
    else if(!info.powered.length)say('旋转左上格，让线路接住左侧入口。');
    else if(info.powered.includes(8))say('信号已到右下格，还需让线路朝右接到出口。');
    else say('入口已接通，沿亮色线路检查下一格的接口。')}
   root.querySelectorAll('[data-tile]').forEach(b=>listen(b,'click',()=>{const i=+b.dataset.tile;rotations[i]=(rotations[i]+1)%4;update()}));listen($('#circuit-reset'),'click',()=>{rotations=[...R.circuitStart];update()});update();
  }
  ({orbit,signal,landing,sample,upload})[kind]();
  return ()=>{disposed=true;cancelAnimationFrame(raf);timers.forEach(clearTimeout);ac.abort()};
 }
 window.MoonGames={mount};
})();
