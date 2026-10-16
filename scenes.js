/* 单一 Canvas 场景：原画存在时整张显示；无原画时绘制矢量占位场景。 */
(() => {
 const canvas=document.getElementById('world'),ctx=canvas.getContext('2d');
 let W=0,H=0,scene='cover',animation='',start=0,landing=0,frozen=false,lastFrame=0;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const images={},loading={},requests=new Map(),background=document.createElement('canvas'),bg=background.getContext('2d');
 let preloadStarted=false;
 function paintBackground(){ctx.clearRect(0,0,W,H);ctx.drawImage(background,0,0,W,H)}
 function loadImage(src,priority='low'){
  if(requests.has(src)){const request=requests.get(src);if(priority==='high')request.image.fetchPriority='high';return request.promise}
  const im=new Image();im.fetchPriority=priority;let attempt=0;
  const promise=new Promise(resolve=>{
  // Slow downloads must finish; retry only a real network/decode failure.
   im.onerror=()=>{if(attempt++<2){const url=new URL(src,document.baseURI);url.searchParams.set('retry',attempt);im.src=url.href}else{im.onload=im.onerror=null;requests.delete(src);resolve(null)}};
   im.onload=()=>resolve(im);
  });
  requests.set(src,{image:im,promise});im.src=src;return promise;
 }
 function loadArtwork(key,priority='high'){
  if(images[key])return Promise.resolve(images[key]);
  if(!window.ARTWORK[key])return Promise.resolve(null);
  const request=loadImage(window.ARTWORK[key],priority);
  if(loading[key])return loading[key];
  return loading[key]=request.then(im=>{delete loading[key];if(im)images[key]=im;if(scene===key){build();dispatchEvent(new Event('sceneartload'));preloadArtwork()}return im});
 }
 function preloadArtwork(){
  if(preloadStarted)return;preloadStarted=true;
  const taskArt={orbit:['orbit-console.webp','orbit-radar.webp','orbit-wave.webp'],signal:['signal-console.webp'],landing:['lander.webp'],sample:['sample-surface.webp'],upload:['circuit-panel.webp']};
  const backgrounds=[],details=[],seen=new Set();
  function add(src,key){if(!src||seen.has(src))return;seen.add(src);(key?backgrounds:details).push(()=>key?loadArtwork(key,'low'):loadImage(src))}
  // Story order warms nearby scenes, portraits and game art first. Two low-priority
  // workers limit contention. Backgrounds have their own queue so a large portrait
  // cannot block later scenes; entering a queued scene promotes its existing request.
  for(const step of window.STORY||[]){
   add(window.ARTWORK[step.scene],step.scene);
   if(step.portrait)add(window.CHARACTERS[step.portrait]);
   for(const file of taskArt[step.task]||[])add('assets/ui/'+file+'?v=preload-lite-20261016');
  }
  for(const [key,src] of Object.entries(window.ARTWORK))add(src,key);
  for(const src of Object.values(window.CHARACTERS||{}))add(src);
  async function worker(queue){while(queue.length)await queue.shift()()}
  worker(backgrounds);worker(details);
 }
 let rng=1;
 function random(){rng=(Math.imul(rng,1664525)+1013904223)>>>0;return rng/4294967296}
 function path(c,points,fill,stroke){c.beginPath();points.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));if(fill){c.closePath();c.fillStyle=fill;c.fill()}if(stroke){c.strokeStyle=stroke;c.stroke()}}
 function ellipse(c,x,y,rx,ry,fill){c.beginPath();c.ellipse(x,y,Math.max(0,rx),Math.max(0,ry),0,0,Math.PI*2);c.fillStyle=fill;c.fill()}
 function line(c,x1,y1,x2,y2,color,width=1){c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.lineWidth=width;c.strokeStyle=color;c.stroke();c.lineWidth=1}
 function sky(c,colors){let g=c.createLinearGradient(0,0,W,H);colors.forEach(([p,color])=>g.addColorStop(p,color));c.fillStyle=g;c.fillRect(0,0,W,H)}
 function stars(c,count=210){for(let i=0;i<count;i++){let x=random()*W,y=random()*H*.8,r=random()*1.15+.15;ellipse(c,x,y,r,r,`rgba(231,225,255,${random()*.5+.08})`)} }
 function moon(c,x,y,r,warm=true){
  let g=c.createRadialGradient(x,y,r*.8,x,y,r*1.8);g.addColorStop(0,warm?'rgba(202,182,248,.13)':'rgba(177,187,250,.13)');g.addColorStop(1,'rgba(188,169,245,0)');ellipse(c,x,y,r*1.8,r*1.8,g);
  g=c.createRadialGradient(x-r*.28,y-r*.26,0,x,y,r);g.addColorStop(0,warm?'#f0eaff':'#e5e3ff');g.addColorStop(.6,warm?'#d2c8ed':'#b6b1db');g.addColorStop(1,warm?'#a49ac9':'#7775ac');ellipse(c,x,y,r,r,g);
  c.save();c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.clip();
  for(let i=0;i<320;i++){let a=random()*Math.PI*2,rr=Math.sqrt(random())*r,cr=(random()**3*.14+.005)*r;let cx=x+Math.cos(a)*rr,cy=y+Math.sin(a)*rr;ellipse(c,cx,cy,cr,cr*.85,`rgba(65,52,92,${random()*.1})`);if(i%3===0){c.beginPath();c.arc(cx,cy,cr,.4,2.7);c.strokeStyle='rgba(244,237,255,.13)';c.stroke()}}
  for(let i=0;i<1200;i++){let xx=x-r+random()*r*2,yy=y-r+random()*r*2;c.fillStyle=`rgba(242,235,255,${random()*.06})`;c.fillRect(xx,yy,1+random()*3,1+random()*3)}
  c.restore();
 }
 function mountain(c,base,amplitude,color,seed){rng=seed;const p=[[0,H],[0,base]];for(let x=0;x<=W+20;x+=20){const height=Math.sin(x/W*8+seed)*amplitude*.4+Math.sin(x/W*19+seed)*amplitude*.18+random()*amplitude*.2;p.push([x,base-height])}p.push([W,H]);path(c,p,color)}
 function roof(c,x,y,w,h,color){path(c,[[x-w*.58,y+h*.13],[x-w*.4,y],[x-w*.2,y-h*.2],[x,y-h],[x+w*.22,y-h*.18],[x+w*.42,y],[x+w*.58,y+h*.13]],color);line(c,x-w*.58,y+h*.13,x+w*.58,y+h*.13,'#726581',.7)}
 function pavilion(c,x,y,s,lit=true){c.fillStyle='#19132d';c.fillRect(x-s*.34,y-s*.5,s*.68,s*.57);for(let j=-1;j<=1;j++) {c.fillStyle=lit?'#8e7148':'#4d4168';c.fillRect(x+j*s*.19-s*.045,y-s*.37,s*.09,s*.29)}roof(c,x,y-s*.55,s,s*.3,'#1c1633');line(c,x-s*.6,y+s*.09,x+s*.6,y+s*.09,'#645873',2)}
 function ancient(c){
  sky(c,[[0,'#100d26'],[.5,'#242044'],[1,'#48416b']]);stars(c,210);
  const mobile=W<800,mx=W*(mobile?.76:.76),my=H*(mobile?.23:.32),r=Math.min(W*(mobile?.18:.118),H*.2);moon(c,mx,my,r);
  // Thin orbital arc, engraved into the scene.
  c.beginPath();c.ellipse(mx,my,r*1.6,r*1.6,0,-2.2,1.65);c.strokeStyle='rgba(207,185,248,.13)';c.stroke();
  mountain(c,H*.65,H*.14,'#39345a',19);mountain(c,H*.70,H*.10,'#29264b',71);
  const water=c.createLinearGradient(0,H*.7,0,H);water.addColorStop(0,'#302a52');water.addColorStop(1,'#15112d');c.fillStyle=water;c.fillRect(0,H*.71,W,H*.29);
  for(let i=0;i<170;i++){let y=H*(.715+random()*.285),x=mx+(random()-.5)*(y-H*.66)*1.3;line(c,x,y,x+random()*W*.045,y,`rgba(207,194,244,${random()*.13})`)}
  mountain(c,H*.88,H*.055,'#120f27',24);
  for(let i=0;i<11;i++){let x=W*(.48+i*.054),y=H*(.84+Math.sin(i)*.015);pavilion(c,x,y,30+random()*30,i%3===0)}
  pavilion(c,W*.9,H*.82,W*(mobile?.18:.085));
  // A quiet foreground tree and riverbank, drawn as part of this single scene.
  path(c,[[W,H],[W*.93,H*.88],[W*.96,H*.72],[W*.95,H*.60],[W*.97,H*.57],[W*.98,H*.73],[W,H*.83]],'#100d24');
  for(let i=0;i<24;i++){let x=W*(.87+random()*.18),y=H*(.61+random()*.15);ellipse(c,x,y,W*.025,H*.012,'#18122f')}
 }
 function palace(c,withFigure=true){
  sky(c,[[0,'#120d2c'],[.6,'#2e2452'],[1,'#5a4c7e']]);stars(c,230);moon(c,W*.80,H*.28,Math.min(W*.075,H*.13),false);
  const sx=W<800?W*.7:W*.79,sy=H*.57,s=Math.min(W*.27,H*.46);
  for(let i=3;i>=0;i--){c.fillStyle=i%2?'#3b305d':'#493c6b';c.fillRect(sx-s*.65-i*12,sy+s*.43+i*12,s*1.3+i*24,13)}
  c.fillStyle='#2b234a';c.fillRect(sx-s*.48,sy-s*.35,s*.96,s*.8);
  for(let i=-2;i<=2;i++){let px=sx+i*s*.20;c.fillStyle='#aaa1c5';c.fillRect(px-s*.018,sy-s*.32,s*.036,s*.75);c.fillStyle='#554b7c';c.fillRect(px+s*.018,sy-s*.3,s*.15,s*.7)}
  roof(c,sx,sy-s*.4,s*1.35,s*.4,'#3b315b');roof(c,sx,sy-s*.79,s*.8,s*.25,'#514268');
  line(c,sx-s*.77,sy-s*.35,sx+s*.77,sy-s*.35,'#b9b0cf');
  for(let j=0;j<9;j++){let yy=H*.65+j*H*.03;c.beginPath();c.moveTo(W*.35,yy);c.bezierCurveTo(W*.5,yy-H*.04,W*.8,yy+H*.08,W,yy-H*.01);c.strokeStyle=`rgba(164,143,206,${.035+j*.005})`;c.lineWidth=10;c.stroke();c.lineWidth=1}
  // 桂树
  line(c,W*.95,H*.8,W*.92,H*.36,'#3b304f',9);line(c,W*.935,H*.57,W*.84,H*.37,'#3b304f',5);
  for(let i=0;i<90;i++){let x=W*(.86+random()*.17),y=H*(.30+random()*.22);ellipse(c,x,y,3+random()*9,2+random()*6,`rgba(170,150,192,${.15+random()*.2})`)}
  if(withFigure)figure(c,sx-s*.3,sy+s*.41,s*.5,.65);
 }
 function figure(c,x,y,s,alpha=1){c.save();c.globalAlpha=alpha;ellipse(c,x,y-s*.8,s*.06,s*.07,'#ded5ef');path(c,[[x-s*.04,y-s*.73],[x+s*.05,y-s*.73],[x+s*.09,y-s*.34],[x+s*.3,y],[x-s*.15,y-s*.06],[x-s*.08,y-s*.4]],'#bcb0d8');c.beginPath();c.moveTo(x,y-s*.66);c.bezierCurveTo(x-s*.45,y-s*.60,x+s*.04,y-s*.2,x-s*.37,y-s*.1);c.strokeStyle='#d7c9ec';c.lineWidth=s*.025;c.stroke();c.restore()}
 function control(c){
  sky(c,[[0,'#0e0d24'],[.55,'#1a1940'],[1,'#34315b']]);
  const x=W*.58,y=H*.19,w=W*.37,h=H*.40;
  c.fillStyle='#34315f';c.fillRect(x-8,y-8,w+16,h+16);c.fillStyle='#181635';c.fillRect(x,y,w,h);
  for(let i=1;i<9;i++){line(c,x+w*i/9,y,x+w*i/9,y+h,'#36305b');line(c,x,y+h*i/9,x+w,y+h*i/9,'#36305b')}
  ellipse(c,x+w*.48,y+h*.5,w*.16,w*.16,'#302a56');
  for(let i=0;i<3;i++){c.beginPath();c.ellipse(x+w*.48,y+h*.5,w*(.24+i*.045),h*(.23+i*.06),-.4,0,Math.PI*2);c.strokeStyle=i===2?'#c2b1ed':'#6965a2';c.stroke()}
  moon(c,x+w*.82,y+h*.27,Math.min(w*.04,h*.07),false);
  c.fillStyle='#aaa3c7';c.font='12px monospace';c.fillText('EARTH — MOON',x+16,y+25);
  for(let i=0;i<5;i++){let bx=W*(.52+i*.1),by=H*(.68+Math.abs(i-2)*.025);path(c,[[bx,by],[bx+W*.09,by],[bx+W*.10,by+H*.11],[bx-W*.01,by+H*.11]],'#343052');c.fillStyle='#554f8c';c.fillRect(bx+4,by+5,W*.073,H*.055);for(let j=0;j<4;j++)line(c,bx+9,by+12+j*7,bx+W*.05+random()*W*.02,by+12+j*7,'#ada5df');path(c,[[bx-W*.02,by+H*.12],[bx+W*.11,by+H*.12],[bx+W*.15,H],[bx-W*.06,H]],'#15102c')}
  for(let i=0;i<3;i++){const bx=W*(.64+i*.115);ellipse(c,bx,H*.80,15,18,'#100d22');c.fillStyle='#100d22';c.fillRect(bx-20,H*.82,40,H*.13)}
  line(c,W*.48,0,W*.48,H*.62,'#393053',2);line(c,W*.98,0,W*.98,H*.7,'#393053',2);
 }
 function cosmos(c){
  sky(c,[[0,'#100b25'],[.5,'#282049'],[1,'#3e3266']]);
  for(let i=0;i<70;i++){let x=W*(.4+random()*.8),y=H*(.85-x/W*.65)+(random()-.5)*H*.21;const r=60+random()*150;let g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,'rgba(144,105,196,.025)');g.addColorStop(1,'rgba(144,105,196,0)');ellipse(c,x,y,r,r,g)}
  stars(c,650);moon(c,W*.86,H*.27,Math.min(W*.13,H*.18),false);
  c.beginPath();c.ellipse(W*.6,H*.78,W*.46,H*.23,-.5,Math.PI,Math.PI*1.87);c.strokeStyle='rgba(196,173,245,.3)';c.setLineDash([3,8]);c.stroke();c.setLineDash([]);
  ellipse(c,W*.87,H*1.39,W*.50,H*.63,'#444176');ellipse(c,W*.89,H*1.4,W*.49,H*.62,'#252649');
 }
 function land(c,final=false){
  sky(c,[[0,'#110c29'],[.6,final?'#3a2e60':'#211b3f'],[1,'#494166']]);stars(c,final?380:190);
  const ex=W*.77,ey=H*(W<800?.2:.24),er=Math.min(W*.055,H*.085);
  let g=c.createRadialGradient(ex-er*.3,ey-er*.3,0,ex,ey,er);g.addColorStop(0,'#a0c5cb');g.addColorStop(.6,'#417b96');g.addColorStop(1,'#1b3e5a');ellipse(c,ex,ey,er,er,g);
  c.save();c.beginPath();c.arc(ex,ey,er,0,Math.PI*2);c.clip();for(let i=0;i<35;i++){let xx=ex+(random()-.5)*er*1.8,yy=ey+(random()-.5)*er*1.8;ellipse(c,xx,yy,random()*er*.4,random()*er*.13,'rgba(213,226,213,.35)')}c.restore();
  const ground=H<=600&&W>520?.34:W<800?.36:.56;
  mountain(c,H*(ground-.07),H*.08,final?'#706984':'#4d4865',27);mountain(c,H*(ground-.01),H*.05,final?'#7a728d':'#5c566f',29);
  let gr=c.createLinearGradient(0,H*ground,0,H);gr.addColorStop(0,final?'#746b88':'#514b66');gr.addColorStop(1,'#191329');c.fillStyle=gr;c.fillRect(0,H*ground,W,H*(1-ground));
  for(let i=0;i<140;i++){let x=random()*W,y=H*(ground+random()*(1-ground)),r=(2+random()*30)*(y/H-ground+.1);ellipse(c,x,y,r*2,r*.6,'rgba(17,12,36,.27)');c.beginPath();c.ellipse(x,y-1,r*2,r*.6,0,Math.PI,Math.PI*2);c.strokeStyle='rgba(180,165,203,.15)';c.stroke()}
  if(final){c.beginPath();c.arc(W*.78,H*.45,H*.29,-2.6,.55);c.strokeStyle='rgba(202,181,250,.24)';c.stroke()}
 }
 function probe(c,x,y,s){
  c.save();c.translate(x,y);c.scale(s,s);
  ellipse(c,0,39,65,8,'rgba(0,0,0,.22)');
  path(c,[[-27,8],[-52,39],[-65,39]],null,'#b7bdbe');path(c,[[27,8],[52,39],[65,39]],null,'#b7bdbe');
  path(c,[[-29,-23],[19,-23],[33,7],[16,20],[-23,13]],'#b1a88b','#d2c9ae');
  path(c,[[-29,-23],[-29,7],[-23,13],[-23,-17]],'#6e7a7d');
  path(c,[[-31,-15],[-87,-20],[-100,-2],[-37,2]],'#243f59','#5d8292');path(c,[[31,-15],[87,-20],[100,-2],[37,2]],'#243f59','#5d8292');
  for(let i=0;i<4;i++){line(c,-44-i*13,-16,-49-i*13,1,'#658597',.7);line(c,44+i*13,-16,49+i*13,1,'#658597',.7)}
  line(c,7,-23,11,-47,'#d3d6cb',2);c.beginPath();c.ellipse(11,-48,15,7,-.5,0,Math.PI);c.fillStyle='#b2c4c5';c.fill();line(c,11,-48,14,-60,'#cbd4c9');
  c.fillStyle='#9d493a';c.fillRect(-5,-16,12,7);ellipse(c,-1,-13,1.3,1.3,'#e1c58b');c.restore();
 }
 function build(){
  background.width=Math.round(W*devicePixelRatio);background.height=Math.round(H*devicePixelRatio);bg.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);rng=773;
  if(images[scene]){const im=images[scene],scale=Math.max(W/im.width,H/im.height),left=W<800?(W-im.width*scale)*(scene==='finale'?.67:.77):(W-im.width*scale)/2;bg.drawImage(im,left,(H-im.height*scale)/2,im.width*scale,im.height*scale);}
  else {({cover:ancient,ancient,palace,palaceEmpty:c=>palace(c,false),control,cosmos,surface:c=>land(c,false),finale:c=>land(c,true)})[scene](bg);
   // Keep the text side readable inside the scene itself, without DOM image layers.
   const shade=bg.createLinearGradient(0,0,W,0);shade.addColorStop(0,'rgba(12,7,30,.56)');shade.addColorStop(.43,'rgba(12,7,30,.3)');shade.addColorStop(.72,'rgba(12,7,30,0)');bg.fillStyle=shade;bg.fillRect(0,0,W,H);
   if(W<800){let g=bg.createLinearGradient(0,0,0,H);g.addColorStop(0,'rgba(14,9,32,0)');g.addColorStop(.42,'rgba(14,9,32,.15)');g.addColorStop(.65,'rgba(14,9,32,.85)');g.addColorStop(1,'rgba(14,9,32,.95)');bg.fillStyle=g;bg.fillRect(0,0,W,H)}
  }
  canvas.dataset.scene=scene;canvas.dataset.artwork=images[scene]?'loaded':'loading';
  paintBackground();
 }
 function draw(t){
  requestAnimationFrame(draw);if(t-lastFrame<33)return;lastFrame=t;
  ctx.clearRect(0,0,W,H);ctx.drawImage(background,0,0,W,H);const elapsed=reduced?7:(t-start)/1000;
  // Custom artwork is never covered with additional scene objects.
  if(!images[scene]){
   if(scene==='ancient'&&animation==='ascend'){const p=Math.min(elapsed/7,1);figure(ctx,W*.80,H*(.73-p*.3),Math.min(W*.055,70)*(1-p*.35),1-p*.7)}
   if(scene==='cosmos'){
    if(animation==='launch'&&elapsed<5){const p=elapsed/5;ctx.save();ctx.translate(W*(.67+p*.09),H*(.77-p*.43));ctx.rotate(.25);path(ctx,[[-7,25],[-7,-16],[0,-30],[7,-16],[7,25]],'#d7d9cd');path(ctx,[[-5,25],[0,55+Math.sin(t/70)*6],[5,25]],'#cfb17e');ctx.restore()}
    else probe(ctx,W*.70,H*.56+(reduced?0:Math.sin(t/1900)*5),W<800?.7:1.1);
   }
   if(scene==='surface'||scene==='finale'){
    let x=W*(W<800?.78:.77),y=H*(H<=600&&W>520?.30:W<800?.34:.54);if(scene==='surface'&&animation==='landing')y-=H*.19*(1-landing);
    probe(ctx,x,y,Math.min(W/1000,1.4));
   }
  }
  if(scene==='finale'&&animation==='complete'&&!frozen){
   // Freeze after the brief constellation animation. The scene itself stays the same.
   const p=Math.min(elapsed/3,1);ctx.strokeStyle=`rgba(215,194,255,${Math.sin(p*Math.PI)*.6})`;ctx.lineWidth=1;ctx.beginPath();ctx.arc(W*.77,H*.4,20+p*Math.min(W*.21,H*.28),0,Math.PI*2);ctx.stroke();if(p>=1)frozen=true;
  }
 }
 function resize(){W=innerWidth;H=innerHeight;canvas.width=Math.round(W*devicePixelRatio);canvas.height=Math.round(H*devicePixelRatio);ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);build();dispatchEvent(new Event('sceneartload'))}
 window.World={set(next,anim=''){const changed=next!==scene;scene=next;animation=anim;start=performance.now();frozen=false;loadArtwork(scene);if(changed)build()},landing(p){landing=p},freeze(){frozen=true},anchor(){if(!images[scene])return {x:W*(W<800?.78:.77),y:H*(H<=600&&W>520?.30:W<800?.34:.54)};const im=images[scene],s=Math.max(W/im.width,H/im.height),left=(W-im.width*s)*(W<800?(scene==='finale'?.67:.77):.5);return{x:left+im.width*s*(scene==='finale'?.67:.77),y:(H-im.height*s)/2+im.height*s*.54}},get scene(){return scene}};
 // file:// works too; absent artwork simply falls back to the procedural scene.
 loadArtwork(scene);
 addEventListener('resize',resize);resize();requestAnimationFrame(draw);
})();
