(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function a(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=a(s);fetch(s.href,i)}})();function G(){const e=new Date,t=["일","월","화","수","목","금","토"],a=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0"),i=e.getDay();return`${a}. ${n}. ${s}. ${t[i]}요일`}function K(e){const t=document.getElementById(e);t.innerHTML=`
    <div class="header-logo">
      <img src="src/assets/favicon.svg" alt="뉴스스탠드" />
      <p>뉴스스탠드</p>
    </div>
    <div class="header-date"></div>
  `;const a=t.querySelector(".header-date");return a.textContent=G(),t}const A="http://localhost:3000",P={TOP_NEWS:"/topNewsData",TAB_NEWS:"/tabNewsData"},S={TOTAL:"total",SUBSCRIBED:"subscribed"},g={LEFT:"left",RIGHT:"right"},T=5e3;async function D(e){try{const t=await fetch(e);if(!t.ok)throw new Error(`${t.status}: ${t.statusText}`);return await t.json()}catch(t){throw console.error(t),t}}function z(){return D(`${A}${P.TOP_NEWS}`)}async function h(e=null){const t=`${A}${P.TAB_NEWS}${e?`?category=${e}`:""}`,a=await D(t);return e?a.find(n=>n.category===e):a}async function v(e,t){const n=document.getElementById(t).querySelector(".rolling"),s=await z().then(i=>i[e].newsLists);return n.innerHTML=s.map(i=>`
   <li>
     <span class="company">${i.name}</span>
     <span class="description">
       <a href="${i.url}" target="_blank" rel="noopener noreferrer">${i.description}</a>
     </span>
   </li>
 `).join(""),n}async function Q(){const e=await v(0,"headline-item-1"),t=await v(1,"headline-item-2");function a(n){const s=n.children[0].offsetHeight,i=n.children.length;let o=0,r;function l(){n.style.transition="top 0.5s ease",n.style.top=`-${o*s}px`,o=(o+1)%i}function m(){r=setInterval(()=>{l()},T)}n.addEventListener("mouseenter",()=>{clearInterval(r)}),n.addEventListener("mouseleave",()=>{m()}),l(),m()}a(e),setTimeout(()=>{a(t)},1e3)}function X(e){const t=document.getElementById(e);t.innerHTML=`
    <div class="headline-item" id="headline-item-1">
      <ul class="rolling"></ul>
    </div>
    <div class="headline-item" id="headline-item-2">
      <ul class="rolling"></ul>
    </div>
  `,v(0,"headline-item-1"),v(1,"headline-item-2"),Q()}function x(e,t,a){const n=document.createElement("button");n.className=e;const s=`${e.split("-")[0]}-arrow`;return n.innerHTML=`<img src="${t}" alt="${a}" class="${s}">`,n}let O=S.TOTAL,M=document.querySelector(".news-tabs"),H=1,k=1,_=0,F=1;function Z(){return O}function tt(e){O=e}function d(){return M}function et(e){M=e}function R(){return H}function nt(e){H=e}function at(){return k}function st(e){k=e}function y(){return _}function b(e){_=e}function c(){return F}function u(e){F=e}function B(e,t,a,n,s){tt(s),e.classList.add("active"),t.classList.remove("active"),a.classList.add("active"),n.classList.remove("active")}function it(){const e=document.querySelector(".media-total"),t=document.querySelector(".media-my"),a=document.querySelector(".media-total-view"),n=document.querySelector(".media-my-view");e.addEventListener("click",()=>{B(e,t,a,n,"total")}),t.addEventListener("click",()=>{B(t,e,n,a,"subscribed")})}async function ot(){const e={};try{(await h()).forEach(a=>{a.tabData.forEach(n=>{e[n.mediaName]="N"})}),localStorage.setItem("subscriptionStatus",JSON.stringify(e))}catch(t){console.error(t)}}function rt(e){const t=document.querySelector(".container"),a=document.createElement("div");a.className="toast",a.textContent=e,t.appendChild(a),requestAnimationFrame(()=>{a.classList.add("show")}),setTimeout(()=>{a.classList.remove("show"),a.addEventListener("transitionend",()=>{a.remove()},{once:!0})},T)}function ct(e){return new Promise(t=>{const a=document.querySelector(".container"),n=document.createElement("div");n.className="confirmation",n.innerHTML=`
      <div class="confirm-text">
        <span class="confirm-media">${e}</span>
        <span class="confirm-description">을(를)</br>구독해지하시겠습니까?</span>
      </div>
      <div class="confirm-select">
        <div><button class="confirm-yes">예, 해지합니다</button></div>
        <div><button class="confirm-no">아니오</button></div>
      </div>
    `,a.appendChild(n),n.addEventListener("click",s=>{s.target.matches(".confirm-yes")?(n.remove(),t(!0)):s.target.matches(".confirm-no")&&(n.remove(),t(!1))})})}async function N(){const e=document.querySelector(".media-my-view .news-container"),t=JSON.parse(localStorage.getItem("subscriptionStatus"))||{},a=Object.keys(t).filter(n=>t[n]==="Y");if(a.length===0){e.innerHTML='<p class="no-subscribe">구독한 언론사가 없습니다.</p>';return}try{const s=(await h()).flatMap(r=>r.tabData.filter(l=>a.includes(l.mediaName)));if(s.length===0){e.innerHTML='<p class="no-subscribe">구독한 언론사가 없습니다.</p>';return}st(s.length);const i=R()||1,o=s[i-1];V(e,o,t)}catch(n){console.error(n)}}async function lt(e){const t=e.target,a=t.dataset.mediaName,n=JSON.parse(localStorage.getItem("subscriptionStatus"));n[a]==="N"?(n[a]="Y",t.textContent="x",rt("내가 구독한 언론사에 추가되었습니다.")):await ct(a)&&(n[a]="N",t.textContent="+ 구독하기"),localStorage.setItem("subscriptionStatus",JSON.stringify(n)),await N()}function V(e,t,a){e.innerHTML=`
    <div class="news-list">
      <article class="news-item">
        <div class="news-meta">
          <img src="${t.sourceLogo}" alt="${t.mediaName} logo" class="news-source" />
          <span class="news-date">${t.newsDate} 편집</span>
          <button class="subscribe-button" data-media-name="${t.mediaName}">
            ${a[t.mediaName]==="Y"?"x":"+ 구독하기"}
          </button>
        </div>
        <div class="news-main-content">
          <div class="news-thumbnail">
            <img src="${t.mainNews.thumbnailImage}" alt="뉴스 이미지" class="news-image" />
            <div class="news-description">
              <a href="${t.mainNews.url}" target="_blank" rel="noopener noreferrer">${t.mainNews.newsTitle}</a>
            </div>
          </div>
          <div class="news-sub-content">
            <ul class="news-headlines">
              ${t.subNews.map(s=>`
                <li class="sub-news-headline">
                  <a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.newsTitle}</a>
                </li>
              `).join("")}
            </ul>
            <div class="news-disclaimer">
              ${t.mediaName} 언론사에서 직접 편집한 뉴스입니다.
            </div>
          </div>
        </div>
      </article>
    </div>
  `,e.querySelector(".subscribe-button").addEventListener("click",lt)}async function ut(){const e=document.querySelector(".news-container"),t=document.querySelector(".news-tabs .tab.active");if(!t)return;const a=t.getAttribute("data-tab");try{const n=await h(a);if(!n)return;const s=t.querySelector(".page-info"),i=parseInt(s.textContent.split("/")[0],10)-1,o=n.tabData[i];if(!o)return;const r=JSON.parse(localStorage.getItem("subscriptionStatus"))||{};r[o.mediaName]||(r[o.mediaName]="N",localStorage.setItem("subscriptionStatus",JSON.stringify(r))),V(e,o,r)}catch(n){console.error(n)}}async function L(){localStorage.getItem("subscriptionStatus")||await ot(),await ut(),await N()}function J(e,t){const a=y(),n=t[a],s=c(),i=e.querySelector(".page-info");i?i.textContent=`${s}/${n.tabData.length}`:e.insertAdjacentHTML("beforeend",`
    <span class="page-info">${s}/${n.tabData.length}</span>
    <span class="progress-bar"></span>
  `)}function W(e){const t=e.querySelector(".page-info"),a=e.querySelector(".progress-bar");t&&t.remove(),a&&a.remove()}function p(e,t){const a=d(),n=e.querySelector(".progress-bar");if(n){let l=function(){const j=performance.now()-o,I=Math.min(1,j/i);if(n.style.width=`${I*100}%`,I<1)r=requestAnimationFrame(l),e.dataset.animationId=r.toString();else{const C=a.querySelectorAll(".tab"),E=y(),$=(E+1)%C.length;u(c()+1);const q=e.querySelector(".page-info"),w=t[E];q&&w&&(q.textContent=`${c()}/${w.tabData.length}`),c()>w.tabData.length?(b($),u(1),C.forEach((f,U)=>{U===$?(f.classList.add("active"),J(f,t),p(f,t)):(f.classList.remove("active"),W(f))})):p(e,t),L()}};var s=l;n.style.width="0%";const i=T,o=performance.now();let r=null;r=requestAnimationFrame(l),e.dataset.animationId=r.toString(),a.addEventListener("click",m=>{(r||r&&!m.target.closest(".tab"))&&(cancelAnimationFrame(r),delete e.dataset.animationId)})}}function Y(e){const a=d().querySelectorAll(".tab"),n=y();a.forEach((s,i)=>{i===n?(s.classList.add("active"),J(s,e),p(s,e)):(s.classList.remove("active"),W(s))}),L()}function dt(e){const t=d();t.addEventListener("click",a=>{const n=a.target.closest(".tab");if(!n)return;t.querySelectorAll(".tab").forEach((i,o)=>{i===n&&(b(o),u(1),Y(e))})})}function mt(e){document.querySelector(".container").addEventListener("click",ft(e))}function ft(e){return async t=>{const a=gt(t);if(!a)return;const n=Z();n===S.TOTAL?bt(e,a):n===S.SUBSCRIBED&&await yt(a)}}function gt(e){const t=e.target.closest(".left-btn")||e.target.closest(".right-btn");if(t)return t.classList.contains("left-btn")?g.LEFT:g.RIGHT}function bt(e,t){const n=d().querySelectorAll(".tab"),s=y(),i=n[s];vt(i),t===g.LEFT?pt(e,n,s):t===g.RIGHT&&ht(e,n,s),Y(e)}function vt(e){const t=parseInt(e.dataset.animationId);t&&(cancelAnimationFrame(t),delete e.dataset.animationId)}function pt(e,t,a){if(u(c()-1),c()<1){const n=(a-1+t.length)%t.length;b(n),u(e[n].tabData.length)}}function ht(e,t,a){const n=e[a];u(c()+1),c()>n.tabData.length&&(b((a+1)%t.length),u(1))}async function yt(e){let t=R();const a=at();t=e===g.LEFT?t>1?t-1:a:t<a?t+1:1,nt(t),await N()}function wt(e,t){const a=document.createElement("button");a.className=`tab ${t===0?"active":""}`,a.setAttribute("data-tab",e.category);const n=c();return a.innerHTML=`
    <span class="page-title">${e.tabName}</span>
    ${t===0?`
      <span class="page-info">${n}/${e.tabData.length}</span>
      <span class="progress-bar"></span>
    `:""}
  `,a}function St(e){const t=d();e.forEach((a,n)=>{const s=wt(a,n);t.appendChild(s)})}async function Tt(e){const t=d();u(1),b(0),St(e),dt(e),p(t.querySelector(".tab.active"),e),mt(e)}async function Nt(){const e=document.querySelector(".news-tabs");et(e);try{const t=await h();await Tt(t),await L()}catch(t){console.error(t)}}async function Lt(e){const t=document.getElementById(e);return t.innerHTML=`
    <nav class="top-menu">
      <div class="top-menu-media">
        <button class="media-total active">전체 언론사</button>
        <button class="media-my">내가 구독한 언론사</button>
      </div>
      <div class="top-menu-view">
        <img src="src/assets/views/listBlue.svg" alt="list" />
        <img src="src/assets/views/gridGray.svg" alt="grid" />
      </div>
    </nav>

    <div class="media-view">
      <div class="media-total-view active">
        <main class="news-stand">
          <nav class="news-tabs"></nav>
          <div class="news-container"></div>
        </main>
      </div>
      <div class="media-my-view">
        <main class="news-stand">
          <nav class="news-tabs"></nav>
          <div class="news-container"></div>
        </main>
      </div>
    </div>
  `,it(),await Nt(),t}K("header");X("headline");Lt("newsstand");document.querySelector(".container").prepend(x("left-btn","src/assets/buttons/leftButton.svg","좌측 화살표"));document.querySelector(".container").append(x("right-btn","src/assets/buttons/rightButton.svg","우측 화살표"));
