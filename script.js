const $ = (s) => document.querySelector(s);
const toast = $('#toast');
function showToast(message){ toast.textContent=message; toast.classList.add('show'); setTimeout(()=>toast.classList.remove('show'),2800); }

// Cursor HUD
const dot=$('.cursor-dot'), ring=$('.cursor-ring');
if(matchMedia('(pointer:fine)').matches){
  document.addEventListener('mousemove',e=>{dot.style.cssText=`position:fixed;left:${e.clientX}px;top:${e.clientY}px;z-index:100;width:5px;height:5px;border-radius:50%;background:#00eaff;box-shadow:0 0 12px #00eaff;pointer-events:none;transform:translate(-50%,-50%)`;ring.style.cssText=`position:fixed;left:${e.clientX}px;top:${e.clientY}px;z-index:99;width:24px;height:24px;border:1px solid rgba(0,234,255,.45);border-radius:50%;pointer-events:none;transform:translate(-50%,-50%);transition:left .08s,top .08s`});
}

// Temperature telemetry
setInterval(()=>{const n=(37.1+Math.random()*1.0).toFixed(1);$('#temp').textContent=n+'°C'},1400);

// Scan interaction
$('#scanBtn').addEventListener('click',()=>{showToast('SYSTEM SCAN COMPLETE // ALL SYSTEMS NOMINAL'); document.body.animate([{filter:'brightness(1)'},{filter:'brightness(1.5)'},{filter:'brightness(1)'}],{duration:350});});

// Module switching
const descriptions={
 'NEURAL LINK':'Direct cortical interface established. Latency is nominal. Synaptic bandwidth is operating above baseline.',
 'OCULAR MATRIX':'Optical and thermal channels synchronized. Target acquisition and spatial mapping are online.',
 'KINETIC FRAME':'Motor-assist actuators calibrated. Balance, acceleration and precision are within safe parameters.',
 'BIO-SYNTH SKIN':'Adaptive surface layer active. Environmental shielding and tactile feedback are synchronized.'};
document.querySelectorAll('.module').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.module').forEach(x=>x.classList.remove('active'));btn.classList.add('active');const name=btn.dataset.module;$('#moduleName').textContent=name;$('#moduleState').textContent='● ACTIVE';$('#moduleDesc').textContent=descriptions[name];}));

// Terminal
const modal=$('#terminalModal'), body=$('#terminalBody');
const lines=['BOOT SEQUENCE // NEXUS-9','> Loading cybernetic kernel... OK','> Neural interface............. CONNECTED','> Ocular matrix................ ONLINE','> Kinetic frame................ CALIBRATED','> Bio-synth layer.............. STABLE','> Encryption................... AES-256','> Operator authentication...... VERIFIED','','SYSTEM READY.','WELCOME, OPERATOR.'];
function openTerminal(){modal.classList.add('open');modal.setAttribute('aria-hidden','false');body.innerHTML='';lines.forEach((line,i)=>setTimeout(()=>{body.innerHTML += `<div>${line}</div>`;body.scrollTop=body.scrollHeight},i*100));}
$('#terminalBtn').addEventListener('click',openTerminal);$('#closeTerminal').addEventListener('click',()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true')});modal.addEventListener('click',e=>{if(e.target===modal) modal.classList.remove('open')});

// Final CTA
$('#augmentBtn').addEventListener('click',()=>{showToast('AUGMENTATION PROTOCOL ACCEPTED // WELCOME TO NX-07'); $('#augmentBtn').textContent='PROTOCOL ACTIVE ✓'; setTimeout(()=>$('#augmentBtn').innerHTML='ACTIVATE AUGMENTATION <span>↗</span>',3000);});

// Subtle reveal
const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.animate([{opacity:0,transform:'translateY(22px)'},{opacity:1,transform:'translateY(0)'}],{duration:650,easing:'cubic-bezier(.2,.8,.2,1)',fill:'forwards'});obs.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.feature-card,.module,.time-node').forEach(el=>{el.style.opacity='0';obs.observe(el)});
