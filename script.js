
document.addEventListener('DOMContentLoaded',()=>{
  const menu=document.querySelector('.menu');
  const links=document.querySelector('.navlinks');
  const closeMenu=()=>{ if(!menu||!links) return; links.classList.remove('open'); menu.classList.remove('open'); menu.setAttribute('aria-expanded','false'); menu.setAttribute('aria-label','Άνοιγμα μενού'); document.body.classList.remove('menu-open'); };
  if(menu && links){
    menu.addEventListener('click',()=>{
      const open=!links.classList.contains('open');
      links.classList.toggle('open',open); menu.classList.toggle('open',open); menu.setAttribute('aria-expanded',String(open)); menu.setAttribute('aria-label',open?'Κλείσιμο μενού':'Άνοιγμα μενού'); document.body.classList.toggle('menu-open',open);
    });
    document.querySelectorAll('.navlinks a').forEach(a=>a.addEventListener('click',closeMenu));
    document.addEventListener('click',e=>{if(links.classList.contains('open') && !links.contains(e.target) && !menu.contains(e.target)) closeMenu();});
    document.addEventListener('keydown',e=>{if(e.key==='Escape') closeMenu();});
  }
  // Highlight the current page in the navigation.
  const page=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  document.querySelectorAll('.navlinks a').forEach(a=>{
    const href=(a.getAttribute('href')||'').toLowerCase();
    if(href===page) { a.classList.add('active'); a.setAttribute('aria-current','page'); }
  });

  // Add elegant scroll-reveal to major content elements across every page.
  const targets=document.querySelectorAll('section:not(.hero):not(.pagehero) .section-head, section:not(.hero):not(.pagehero) h2, section:not(.hero):not(.pagehero) .card, section:not(.hero):not(.pagehero) .photo, section:not(.hero):not(.pagehero) .stat, section:not(.hero):not(.pagehero) .event, section:not(.hero):not(.pagehero) .person, section:not(.hero):not(.pagehero) .gallery a, section:not(.hero):not(.pagehero) .quick-link, section:not(.hero):not(.pagehero) .news-card, section:not(.hero):not(.pagehero) .empty-panel, footer .footergrid > div');
  targets.forEach((el,i)=>{
    if(!el.hasAttribute('data-reveal')) el.setAttribute('data-reveal','');
    el.style.setProperty('--delay', `${(i%6)*70}ms`);
  });
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}})
  },{threshold:.12,rootMargin:'0px 0px -45px'});
  document.querySelectorAll('[data-reveal]').forEach(el=>io.observe(el));

  // Gallery lightbox.
  const box=document.getElementById('lightbox'), image=document.getElementById('lightboxImage'), close=document.getElementById('lightboxClose');
  if(box && image){
    document.querySelectorAll('.gallery a').forEach(a=>{
      a.addEventListener('click',e=>{
        e.preventDefault(); image.src=a.getAttribute('href'); box.classList.add('open'); box.setAttribute('aria-hidden','false');
      });
    });
    const shut=()=>{box.classList.remove('open');box.setAttribute('aria-hidden','true');image.src=''};
    close?.addEventListener('click',shut); box.addEventListener('click',e=>{if(e.target===box)shut()});
    document.addEventListener('keydown',e=>{if(e.key==='Escape')shut()});
  }

  // Scroll progress and back-to-top.
  const progress=document.createElement('div'); progress.className='progress'; document.body.appendChild(progress);
  const back=document.createElement('button'); back.className='backtop'; back.textContent='↑'; back.setAttribute('aria-label','Επιστροφή στην κορυφή'); document.body.appendChild(back);
  const update=()=>{
    const h=document.documentElement.scrollHeight-innerHeight;
    progress.style.width=(h>0?(scrollY/h)*100:0)+'%';
    back.classList.toggle('show',scrollY>500);
  };
  addEventListener('scroll',update,{passive:true}); update();
  back.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));

  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
});
