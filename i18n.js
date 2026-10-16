/* Local text switching: never remount a game, replace a control, or restart audio. */
(() => {
 'use strict';
 const key='moon-dream-language',button=document.getElementById('language-toggle');
 const dictionary=new Map(Object.entries(MOON_EN.ui));
 for(const step of window.STORY||[]){const source=step.text||step.title;if(source&&MOON_EN.story[step.id])dictionary.set(source,MOON_EN.story[step.id])}
 const numbers={一:'1',二:'2',三:'3',四:'4'},signals={甲:'A',乙:'B',丙:'C'},directions={上:'up',右:'right',下:'down',左:'left'};
 let language='zh-CN';try{if(localStorage.getItem(key)==='en')language='en'}catch{}
 const originalText=new WeakMap(),originalAttributes=new WeakMap();
 const attributes=['aria-label','title','alt'];
 function english(source){
  if(dictionary.has(source))return dictionary.get(source);
  let m;
  if((m=/^第([一二三四])章(?: · (.+))?$/.exec(source)))return 'Chapter '+numbers[m[1]]+(m[2]?' · '+english(m[2]):'');
  if((m=/^对准([甲乙丙])信号$/.exec(source)))return 'Aim at signal '+signals[m[1]];
  if((m=/^已对准([甲乙丙])信号，观察波形是否规律。$/.exec(source)))return 'Aimed at signal '+signals[m[1]]+'. Check whether its pulses are regular.';
  if((m=/^目标([甲乙丙]) · (.+)$/.exec(source)))return 'Target '+signals[m[1]]+' · '+english(m[2]);
  if((m=/^回声 ([一二三])$/.exec(source)))return 'Channel '+numbers[m[1]];
  if((m=/^第(\d+)路波形，可左右拖动$/.exec(source)))return 'Channel '+m[1]+' waveform. Drag left or right.';
  if((m=/^第(\d+)路回声时间位置$/.exec(source)))return 'Channel '+m[1]+' timing offset';
  if((m=/^距月面 (\d+) 米$/.exec(source)))return 'Altitude '+m[1]+' m';
  if((m=/^(\d+ \/ \d+) 步$/.exec(source)))return m[1]+' steps';
  if((m=/^当前落点：(.+)$/.exec(source)))return 'Landing site: '+english(m[1]);
  if((m=/^已在(.+)平稳着陆。$/.exec(source)))return 'Landed safely in the '+english(m[1])+'.';
  if((m=/^第(\d+)行第(\d+)列 (.+)$/.exec(source)))return 'Row '+m[1]+', column '+m[2]+': '+english(m[3]);
  if((m=/^旋转第(\d+)行第(\d+)列线路(?:，当前连接([上下左右与]+)(，已通电)?)?$/.exec(source)))return 'Rotate circuit at row '+m[1]+', column '+m[2]+(m[3]?'. Ports: '+m[3].split('与').map(d=>directions[d]).join(' and ')+(m[4]?'. Powered':''):'');
  return source;
 }
 function translate(source){const core=source.trim();if(language!=='en'||!core)return source;return source.slice(0,source.indexOf(core))+english(core)+source.slice(source.indexOf(core)+core.length)}
 function excluded(element){return !element||element.closest('script,style,title,#language-toggle,[data-no-translate]')}
 function text(node){
  if(excluded(node.parentElement))return;
  const current=node.nodeValue,record=originalText.get(node);
  const source=record&&current===record.output?record.source:current,output=translate(source);
  originalText.set(node,{source,output});if(current!==output)node.nodeValue=output;
 }
 function attribute(element,name){
  if(excluded(element)||!element.hasAttribute(name))return;
  let records=originalAttributes.get(element);if(!records){records=new Map();originalAttributes.set(element,records)}
  const current=element.getAttribute(name),record=records.get(name);
  const source=record&&current===record.output?record.source:current,output=translate(source);
  records.set(name,{source,output});if(current!==output)element.setAttribute(name,output);
 }
 function scan(root){
  if(root.nodeType===Node.TEXT_NODE){text(root);return}
  if(root.nodeType!==Node.ELEMENT_NODE||excluded(root))return;
  for(const name of attributes)attribute(root,name);
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT,{acceptNode(node){return node.nodeType===Node.ELEMENT_NODE&&excluded(node)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}});
  while(walker.nextNode()){const node=walker.currentNode;if(node.nodeType===Node.TEXT_NODE)text(node);else for(const name of attributes)attribute(node,name)}
 }
 function reflect(){
  document.documentElement.lang=language;
  if(button){button.textContent=language==='en'?'中文':'English';button.lang=language==='en'?'zh-CN':'en';button.setAttribute('aria-label',language==='en'?'切换为中文':'Switch to English');button.title=language==='en'?'切换为中文':'Switch to English'}
  scan(document.body);
 }
 const observer=new MutationObserver(records=>{
  for(const record of records){
   if(record.type==='characterData')text(record.target);
   else if(record.type==='attributes')attribute(record.target,record.attributeName);
   else for(const node of record.addedNodes)scan(node);
  }
 });
 reflect();observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:attributes});
 if(button)button.addEventListener('click',()=>{language=language==='en'?'zh-CN':'en';try{localStorage.setItem(key,language)}catch{}reflect()});
 window.MoonI18n={get language(){return language},t:translate};
})();
