/* Pure gameplay rules: shared by the browser and reproducible checks. */
(() => {
 'use strict';
 const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
 const angleDistance=(a,b)=>Math.abs(((a-b+540)%360)-180);
 const zones=[
  {name:'静海平原',x:22,width:20,budget:24,note:'落点宽 · 采样路远'},
  {name:'环山缓坡',x:51,width:13,budget:20,note:'落点适中 · 路程适中'},
  {name:'陨坑边缘',x:80,width:8,budget:18,note:'落点窄 · 靠近样本'}
 ];
 function flight(zone=0,easy=false){return {x:50,y:100,vx:0,vy:2,fuel:easy?140:100,time:0,zone,easy,outcome:null}}
 function stepFlight(s,input,dt){
  if(s.outcome)return s;
  dt=clamp(dt,0,.05);const thrust=!!input.thrust&&s.fuel>0;
  const fuel= Math.max(0,s.fuel-(thrust?8:0)*dt);
  const time=s.time+dt;
  let vx=clamp(s.vx+((input.right?1:0)-(input.left?1:0))*15*dt+Math.sin(time*.7)*.5*dt,-18,18)*Math.pow(.38,dt);
  const x=clamp(s.x+vx*dt,2,98);if(x===2||x===98)vx=0;
  const vy=clamp(s.vy+(2.4-(thrust?7.2:0))*dt,-4,15),y=Math.max(0,s.y-vy*dt);
  const pad=zones[s.zone];let outcome=null;
  if(y===0)outcome=Math.abs(x-pad.x)>pad.width/2?'offsite':vy>(s.easy?4.5:3)?'fast':'landed';
  return {...s,x,y,vx,vy,fuel,time,outcome};
 }
 const grid={cols:7,rows:5,starts:[28,30,34],samples:[9,25,6],rocks:[8,10,17,12,26,22]};
 function routeInfo(route,zone=0){
  const valid=route.length>0&&route[0]===grid.starts[zone]&&route.every((v,i)=>Number.isInteger(v)&&v>=0&&v<35&&!grid.rocks.includes(v)&&(!i||Math.abs(v%7-route[i-1]%7)+Math.abs(Math.floor(v/7)-Math.floor(route[i-1]/7))===1));
  const collected=grid.samples.filter(v=>route.includes(v));
  const steps=route.length-1,budget=zones[zone].budget;
  return {valid,collected,steps,budget,ready:valid&&collected.length===3&&route.at(-1)===grid.starts[zone]&&steps<=budget};
 }
 const pulseOffsets=[24,57,81];
 function aligned(offset,shift){const p=(offset+shift)%100;return Math.min(p,100-p)<=2}
 // Directions are north, east, south, west; rotation is clockwise.
 const circuitBase=[5,3,6,10,9,12,9,6,9],circuitStart=[0,0,2,1,2,2,2,2,3];
 function ports(base,rotation){let mask=base;for(let i=0;i<rotation%4;i++)mask=((mask<<1)&15)|(mask>>3);return mask}
 function circuit(rotations){
  const masks=circuitBase.map((m,i)=>ports(m,rotations[i])),seen=new Set(),queue=[];
  if(masks[0]&8){queue.push(0);seen.add(0)}
  while(queue.length){const n=queue.shift(),x=n%3,y=Math.floor(n/3);[[0,-1],[1,0],[0,1],[-1,0]].forEach(([dx,dy],d)=>{const xx=x+dx,yy=y+dy;if(xx<0||xx>2||yy<0||yy>2)return;const m=yy*3+xx;if((masks[n]&(1<<d))&&(masks[m]&(1<<((d+2)%4)))&&!seen.has(m)){seen.add(m);queue.push(m)}})}
  return {powered:[...seen],connected:seen.has(8)&&!!(masks[8]&2)};
 }
 const rules={clamp,angleDistance,zones,flight,stepFlight,grid,routeInfo,pulseOffsets,aligned,circuitBase,circuitStart,ports,circuit};
 if(typeof module!=='undefined'&&module.exports)module.exports=rules;else window.MoonRules=rules;
})();
