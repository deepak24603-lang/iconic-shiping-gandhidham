(()=>{
 const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const targets=document.querySelectorAll('.section,.split,.strip,.svc,.card,.quote,.ctaband,.service-directory li,.service-feature-image');
 if(reduce||!('IntersectionObserver' in window)){targets.forEach(el=>el.classList.add('is-visible'));return;}
 targets.forEach((el,i)=>{el.classList.add('reveal');if(i%4===1)el.classList.add('reveal-delay-1');else if(i%4===2)el.classList.add('reveal-delay-2');else if(i%4===3)el.classList.add('reveal-delay-3');});
 const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');io.unobserve(entry.target);}}),{threshold:.08,rootMargin:'0px 0px -35px 0px'});
 targets.forEach(el=>io.observe(el));
 document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const target=document.querySelector(a.getAttribute('href'));if(target){e.preventDefault();target.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});}}));
})();
