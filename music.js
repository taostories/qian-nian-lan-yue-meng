/* Music: Kevin MacLeod, CC BY 4.0. Full attribution: music-credits.html. */
(() => {
 'use strict';
 const button=document.getElementById('sound');
 const suffix=document.createElement('audio').canPlayType('audio/ogg; codecs="opus"')?'-lite.ogg':'.mp3';
 const tracks={soaring:new Audio('assets/audio/soaring'+suffix),immersed:new Audio('assets/audio/immersed'+suffix)};
 let context,master,effects,active=null,wanted='soaring',enabled=true,revision=0,needsGesture=true;
 const channels={},stops={};
 for(const track of Object.values(tracks)){track.loop=true;track.preload='none'}
 function warmEnding(){
  if(tracks.immersed.preload!=='none')return;
  const main=tracks.soaring;
  let bufferedAhead=0;
  for(let i=0;i<main.buffered.length;i++)if(main.buffered.start(i)<=main.currentTime)bufferedAhead=Math.max(bufferedAhead,main.buffered.end(i)-main.currentTime);
  // Give the main track a head start, even while autoplay awaits the first click.
  if(bufferedAhead>=12||main.readyState===4){tracks.immersed.preload='auto';tracks.immersed.load()}
 }
 for(const event of ['progress','loadeddata','canplaythrough'])tracks.soaring.addEventListener(event,warmEnding);
 function setup(){
  if(context)return;
  context=new (window.AudioContext||window.webkitAudioContext)();
  master=context.createGain();master.gain.value=0;master.connect(context.destination);
  effects=context.createGain();effects.gain.value=.4;effects.connect(master);
  for(const [name,track] of Object.entries(tracks)){
   const gain=context.createGain();gain.gain.value=0;
   context.createMediaElementSource(track).connect(gain);gain.connect(master);channels[name]=gain;
  }
 }
 function fade(param,value,seconds){const now=context.currentTime;param.cancelAndHoldAtTime(now);param.linearRampToValueAtTime(value,now+seconds)}
 function updateButton(){button.setAttribute('aria-pressed',String(enabled));button.setAttribute('aria-label',enabled?'关闭音乐':'开启音乐');button.title=enabled?'关闭音乐':'开启音乐'}
 async function playWanted(){
  if(!enabled||document.hidden)return;
  const ticket=++revision,name=wanted;
  try{
   setup();
   clearTimeout(stops[name]);
   await Promise.all([context.resume(),tracks[name].play()]);
   if(ticket!==revision||!enabled||document.hidden){if(!enabled||document.hidden||wanted!==name)tracks[name].pause();return}
   needsGesture=false;active=name;fade(master.gain,1,.8);
   for(const [key,gain] of Object.entries(channels)){
    fade(gain.gain,key===name?(key==='soaring'?.22:.27):0,2.5);
    if(key!==name){clearTimeout(stops[key]);stops[key]=setTimeout(()=>{if(active!==key)tracks[key].pause()},2700)}
   }
   warmEnding();
  }catch(error){
   if(ticket!==revision)return;
   if(error.name==='NotAllowedError'){needsGesture=true;return}
   if(active&&active!==name&&!tracks[active].paused){button.title='结尾音乐暂未载入，点击可关闭音乐';return}
   enabled=false;for(const track of Object.values(tracks))track.pause();updateButton();button.title='音乐暂未载入，点击重试';
  }
 }
 button.onclick=()=>{
  enabled=!enabled;updateButton();revision++;
  if(enabled)playWanted();
  else if(context){fade(master.gain,0,.25);const ticket=revision;setTimeout(()=>{if(ticket===revision&&!enabled)for(const t of Object.values(tracks))t.pause()},300)}
 };
 // Browsers that block audible autoplay unlock it on the first game interaction.
 function unlockMusic(event){
  if(!event.isTrusted||event.target.closest?.('#sound')||!enabled||!needsGesture)return;
  if(event.type==='keydown'&&!['Enter',' '].includes(event.key))return;
  needsGesture=false;playWanted();
 }
 document.addEventListener('click',unlockMusic,true);
 document.addEventListener('keydown',unlockMusic,true);
 document.addEventListener('visibilitychange',()=>{
  revision++;
  if(document.hidden){for(const t of Object.values(tracks))t.pause();if(context)context.suspend()}
  else if(enabled)playWanted();
 });
 window.MoonMusic={
  setScene(scene,readingLetter=false){const next=readingLetter||scene==='epilogue'?'immersed':'soaring';if(next===wanted)return;wanted=next;if(enabled)playWanted()},
  tone(f){if(!enabled||!context||context.state!=='running')return;const o=context.createOscillator(),g=context.createGain();o.type='sine';o.frequency.value=f;g.gain.setValueAtTime(0,context.currentTime);g.gain.linearRampToValueAtTime(.1,context.currentTime+.02);g.gain.exponentialRampToValueAtTime(.001,context.currentTime+.8);o.connect(g);g.connect(effects);o.onended=()=>{o.disconnect();g.disconnect()};o.start();o.stop(context.currentTime+.85)},
  get state(){return {enabled,wanted,active,playing:Object.entries(tracks).filter(([,t])=>!t.paused).map(([n])=>n)}}
 };
 updateButton();
 tracks.soaring.preload='auto';tracks.soaring.load();
 playWanted();
})();
