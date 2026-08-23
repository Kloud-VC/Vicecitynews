(function(){
  const launch=Date.parse("2026-11-19T00:00:00-05:00");
  const box=document.getElementById("countdown");
  if(box){
    const cell=(n,l)=>`<div class="cd"><b>${String(n).padStart(2,"0")}</b><span>${l}</span></div>`;
    const tick=()=>{
      const diff=Math.max(0,launch-Date.now());
      const d=Math.floor(diff/86400000);
      const h=Math.floor((diff%86400000)/3600000);
      const m=Math.floor((diff%3600000)/60000);
      const s=Math.floor((diff%60000)/1000);
      box.innerHTML=cell(d,"days")+cell(h,"hrs")+cell(m,"min")+cell(s,"sec");
    };
    tick();setInterval(tick,1000);
  }
  const btn=document.getElementById("nav-btn");
  const nav=document.getElementById("nav");
  if(btn&&nav){btn.addEventListener("click",()=>nav.classList.toggle("open"));}
  const form=document.getElementById("talk-form");
  const list=document.getElementById("talk-list");
  if(form&&list){
    form.addEventListener("submit",e=>{
      e.preventDefault();
      const name=(document.getElementById("talk-name").value||"Anon").slice(0,24);
      const text=(document.getElementById("talk-text").value||"").trim().slice(0,400);
      if(!text)return;
      const art=document.createElement("article");
      art.className="post";
      art.innerHTML=`<div class="post-meta"><span class="yellow">${name.replace(/[<>]/g,"")}</span> @local<span class="right">now</span></div><p>${text.replace(/[<>]/g,"")}</p><p class="pink xs">1 up</p>`;
      list.prepend(art);
      form.reset();
    });
  }
})();
