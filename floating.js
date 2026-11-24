(()=>{
"use strict";
function orgDomain(url) {
  if (url.protocol !== 'https:' || url.port || url.username || url.password) return null;
  const match = /^([a-z0-9-]+(?:\.(?:sandbox|trailblaze))?)\.(my\.salesforce\.com|lightning\.force\.com)$/.exec(url.hostname);
  return match ? {org: match[1], lightning: match[2] === 'lightning.force.com'} : null;
}
function detectInterface(url) {
  const domain = orgDomain(url);
  if (!domain || /^\/(?:secur|services|login)(?:[/.]|$)/i.test(url.pathname)) return null;
  return domain.lightning || /^\/lightning(?:\/|$)/.test(url.pathname) || url.pathname === '/one/one.app' ? 'lightning' : 'classic';
}
function switchTarget(url, currentInterface) {
  const source = orgDomain(url);
  if (!source || detectInterface(url) !== currentInterface) throw new Error('Unsupported Salesforce page.');
  const toClassic = currentInterface === 'lightning';
  const target = new URL('https://' + source.org + (toClassic ? '.my.salesforce.com/?isdtp=p1' : '.lightning.force.com/lightning/page/home'));
  const destination = orgDomain(target);
  if (!destination || destination.org !== source.org || destination.lightning === toClassic) throw new Error('Invalid destination.');
  return target.href;
}

const url = new URL(location.href);
const current = detectInterface(url);
if (!current || /^(login|test|help|developer|trailhead|www|status)\./i.test(url.hostname) || /^\/(secur|services|login)(\/|$)/i.test(url.pathname)) return;
if (document.getElementById('sf-interface-switcher-floating')) return;
const host = document.createElement('div');
host.id = 'sf-interface-switcher-floating';
host.style.cssText = 'all:initial!important;position:fixed!important;right:0!important;top:104px!important;z-index:2147483647!important;display:block!important;';
const root = host.attachShadow({mode:'closed'});
const style = document.createElement('style');
style.textContent = `button{box-sizing:border-box;display:flex;align-items:center;justify-content:center;width:18px;height:26px;padding:0;border:1px solid #ffffff88;border-right:0;border-radius:5px 0 0 5px;background:#374151;color:white;cursor:grab;touch-action:none;user-select:none;transform-origin:right center;transition:transform 150ms ease,background 150ms ease;box-shadow:-1px 1px 4px #0003}button:hover,button:focus-visible{background:#1f2937;transform:scale(1.25)}button.dragging{cursor:grabbing;transform:none;transition:none}@media(prefers-reduced-motion:reduce){button{transition:none}}button:focus-visible{outline:2px solid #90caff;outline-offset:-3px}button:disabled{opacity:.7;cursor:wait}svg{pointer-events:none;width:12px;height:12px;flex:none}`;
const button = document.createElement('button');
button.type='button';
const label = current === 'lightning' ? 'Switch to Classic' : 'Switch to Lightning';
button.title=label;button.setAttribute('aria-label',label);
const ns = 'http://www.w3.org/2000/svg';
const svg = document.createElementNS(ns, 'svg');
svg.setAttribute('viewBox', '0 0 24 24');
svg.setAttribute('aria-hidden', 'true');
const path = document.createElementNS(ns, 'path');
if (current === 'classic') {
  svg.setAttribute('fill', 'currentColor');
  path.setAttribute('d', 'M13 2 4 14h7l-1 8 10-12h-7z');
} else {
  for (const [key, value] of Object.entries({fill:'none',stroke:'currentColor','stroke-width':'2','stroke-linecap':'round','stroke-linejoin':'round'})) svg.setAttribute(key,value);
  path.setAttribute('d','M4 7h16m-4-4 4 4-4 4M20 17H4m4-4-4 4 4 4');
}
svg.append(path); button.append(svg);
const key = 'dockPositionV14';
let ratio = 0.18, drag = null, suppressClick = false, movedEver = false;
const bounds = () => ({min: 4, max: Math.max(4, window.innerHeight - 30)});
function place(value) {
  ratio = Math.max(0, Math.min(1, value));
  const {min,max} = bounds();
  host.style.setProperty('top', `${min + ratio * (max-min)}px`, 'important');
}
root.append(style,button);document.documentElement.append(host);
place(ratio);
chrome.storage.local.get(key).then(data => {
  if (!movedEver && !drag && typeof data[key] === 'number' && Number.isFinite(data[key])) place(data[key]);
}).catch(()=>{});
window.addEventListener('resize',()=>place(ratio));
button.addEventListener('pointerdown', e => {
  if (!e.isTrusted || !e.isPrimary || e.button !== 0 || button.disabled) return;
  suppressClick = false;
  drag = {id:e.pointerId, y:e.clientY, x:e.clientX, top:host.getBoundingClientRect().top, moved:false};
  button.setPointerCapture(e.pointerId);
});
button.addEventListener('pointermove', e => {
  if (!e.isTrusted || !drag || drag.id !== e.pointerId) return;
  if (!drag.moved && Math.hypot(e.clientX-drag.x,e.clientY-drag.y)<5) return;
  drag.moved = true; movedEver = true;
  button.classList.add('dragging');
  const {min,max} = bounds();
  place((drag.top + e.clientY-drag.y-min)/Math.max(1,max-min));
});
function finish(e, cancelled=false) {
  if (!e.isTrusted || !drag || drag.id !== e.pointerId) return;
  suppressClick = drag.moved || cancelled;
  if (drag.moved) chrome.storage.local.set({[key]:ratio}).catch(()=>{});
  drag = null;
  button.classList.remove('dragging');
  if (button.hasPointerCapture(e.pointerId)) button.releasePointerCapture(e.pointerId);
}
button.addEventListener('pointerup',e=>finish(e));
button.addEventListener('pointercancel',e=>finish(e,true));
button.addEventListener('lostpointercapture',e=>finish(e,true));
button.addEventListener('click',e=>{
  if (!e.isTrusted) return;
  if (suppressClick && e.detail !== 0) { suppressClick=false; e.preventDefault(); return; }
  suppressClick=false;
  button.disabled=true;button.title='Switching…';
  try{location.assign(switchTarget(new URL(location.href),current));}catch(e){button.disabled=false;button.title=label;}
});
})();
