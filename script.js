(function(){
  const launch=Date.parse("2026-11-19T00:00:00-05:00");
  const box=document.getElementById("countdown");
  if(box){
    const cell=(n,l)=>`<div class="cd"><b>${String(n).padStart(2,"0")}</b><span>${l}</span></div>`;
    const tick=()=>{const diff=Math.max(0,launch-Date.now());const d=Math.floor(diff/86400000);const h=Math.floor((diff%86400000)/3600000);const m=Math.floor((diff%3600000)/60000);const s=Math.floor((diff%60000)/1000);box.innerHTML=cell(d,"DAYS")+cell(h,"HRS")+cell(m,"MIN")+cell(s,"SEC")};
    tick();setInterval(tick,1000);
  }
  const ticker=document.getElementById("ticker");
  if(ticker){
    const bits=["CyberLeek: clips since Aug 18, site dark Aug 22","Take Two subpoenas Microsoft and Discord, Sept 4 deadline","Extended Look Thursday. Netflix 3pm ET, YouTube 9pm ET"];
    const piece=bits.map(b=>`<span>${b}</span><span class="pink">●</span>`).join("");
    ticker.innerHTML=piece+piece+piece+piece;
  }
  const btn=document.getElementById("nav-btn");
  const nav=document.getElementById("nav");
  if(btn&&nav) btn.addEventListener("click",()=>nav.classList.toggle("open"));
  const KEY="vcn-talk-posts-v2";
  const form=document.getElementById("talk-form");
  const list=document.getElementById("talk-list");
  if(form&&list){
    const extras=()=>{try{return JSON.parse(localStorage.getItem(KEY)||"[]")}catch{return[]}};
    const render=p=>{
      const el=document.createElement("article");el.className="post";
      el.innerHTML=`<div class="post-meta"><span class="yellow"></span> @${esc(p.handle)}<span class="right">${esc(p.time)}</span></div><p></p><p class="pink xs">${p.likes} up</p>`;
      el.querySelector(".yellow").textContent=p.name;el.querySelector("p").textContent=p.text;list.prepend(el);
    };
    extras().reverse().forEach(render);
    form.addEventListener("submit",e=>{
      e.preventDefault();
      const name=(document.getElementById("talk-name").value||"Anonymous").trim().slice(0,24);
      const text=(document.getElementById("talk-text").value||"").trim().slice(0,400);
      if(!text)return;
      const post={name,handle:"talk",text,time:"now",likes:0};
      localStorage.setItem(KEY,JSON.stringify([post,...extras()].slice(0,40)));
      render(post);document.getElementById("talk-text").value="";
    });
  }
  function esc(s){return String(s).replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,""")}
})();
