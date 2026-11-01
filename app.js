'use strict';
document.querySelectorAll('.scroll-to-plans').forEach(btn=>btn.addEventListener('click',()=>document.getElementById('planos').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'})));
const checkoutNotice=document.getElementById('checkout-notice');
document.querySelectorAll('[data-checkout]').forEach(btn=>btn.addEventListener('click',()=>{
 const target=(window.ATLAS_CONFIG?.checkoutBasico||'').trim();
 try{const url=new URL(target);if(!['https:','http:'].includes(url.protocol))throw new Error('URL inválida');window.location.assign(url.href);}catch{checkoutNotice.showModal();}
}));
checkoutNotice.querySelectorAll('button').forEach(btn=>btn.addEventListener('click',()=>checkoutNotice.close()));
checkoutNotice.addEventListener('click',e=>{if(e.target===checkoutNotice){const b=checkoutNotice.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)checkoutNotice.close();}});
const modal=document.getElementById('lightbox-modal'),fullImage=document.getElementById('lightbox-img');
let previousFocus=null;
function closeLightbox(){modal.classList.remove('is-open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';fullImage.removeAttribute('src');previousFocus?.focus();}
document.querySelectorAll('.lightbox-trigger').forEach(btn=>btn.addEventListener('click',()=>{previousFocus=btn;fullImage.src=btn.dataset.full;fullImage.alt=btn.dataset.caption||'';modal.classList.add('is-open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';document.getElementById('lightbox-close').focus();}));
document.getElementById('lightbox-close')?.addEventListener('click',closeLightbox);
modal?.addEventListener('click',e=>{if(e.target===modal)closeLightbox();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal?.classList.contains('is-open'))closeLightbox();if(e.key==='Tab'&&modal?.classList.contains('is-open')){e.preventDefault();document.getElementById('lightbox-close').focus();}});
// Horizontal galleries support swiping and arrow controls without autoplay.
document.querySelectorAll('.carousel-wrap').forEach(wrap=>{
 const track=wrap.querySelector('.carousel-track'),items=[...track.querySelectorAll('.carousel-item')],dots=[...(wrap.parentElement.querySelector('.carousel-dots')?.querySelectorAll('button')||[])];
 let current=0;
 function goTo(i){current=(i+items.length)%items.length;const item=items[current];track.scrollTo({left:item.offsetLeft-track.offsetLeft,behavior:'smooth'});dots.forEach((d,n)=>d.classList.toggle('is-active',n===current));}
 wrap.querySelector('.prev-btn')?.addEventListener('click',()=>goTo(current-1));wrap.querySelector('.next-btn')?.addEventListener('click',()=>goTo(current+1));dots.forEach((d,i)=>d.addEventListener('click',()=>goTo(i)));
 track.addEventListener('scroll',()=>{const left=track.getBoundingClientRect().left;let distance=Infinity;items.forEach((x,i)=>{const dist=Math.abs(x.getBoundingClientRect().left-left);if(dist<distance){distance=dist;current=i;}});dots.forEach((d,n)=>d.classList.toggle('is-active',n===current));},{passive:true});
});
