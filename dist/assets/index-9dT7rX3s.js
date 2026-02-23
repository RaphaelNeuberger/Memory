(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function s(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(n){if(n.ep)return;n.ep=!0;const i=s(n);fetch(n.href,i)}})();const b={theme:null,player:null,boardSize:null};let v="home",l={...b},d=null;function O(){return v}function z(e){v=e}function m(){return{...l}}function h(e){l={...l,...e}}function G(){l={...b}}function r(){if(!d)throw new Error("GameState not initialized");return d}function k(e){d=e}function x(){d=null}function H(){return`
    <button class="btn btn--play" id="btn-play">
      <img src="/assets/img/home/stadia_controller_icon.svg" alt="" aria-hidden="true" class="btn__icon" />
      Play <span class="btn__arrow">&rarr;</span>
    </button>
  `}function T(){return`
    <main class="home" data-page="home">
      <section class="home__hero">
        <p class="home__tagline">It's play time.</p>
        <h1 class="home__heading">Ready to play?</h1>
        ${H()}
      </section>
      <aside class="home__decoration" aria-hidden="true">
        <img src="/assets/img/home/stadia_controller.svg" alt="" class="home__bg-icon" aria-hidden="true" />
      </aside>
    </main>
  `}function F(){document.getElementById("btn-play")?.addEventListener("click",()=>o("settings"))}const R=["angular","bootstrape","css","dj","firebase","git","github","html5","js","node","phyton","react","sass","scl","terminal","ts","vs","vector"],q=["brezen","burger","chicken","chocolat","doener","donat","hotdog","ice","kuchen","macaros","muffin","pizza","pommes","pudding","salat","sandwitch","shushi","dürum"],D={16:8,24:12,36:18};function N(e,t){const s=e==="codevibes"?R:q,a=e==="codevibes"?"codevibes_theme/back":"foods_theme/back",n=D[t];return s.slice(0,n).map(i=>`/assets/img/${a}/${i}.svg`)}function W(e){for(let t=e.length-1;t>0;t--){const s=Math.floor(Math.random()*(t+1));[e[t],e[s]]=[e[s],e[t]]}return e}function j(e){const t=e.flatMap((s,a)=>[{id:a*2,pairId:a,imagePath:s,isFlipped:!1,isMatched:!1},{id:a*2+1,pairId:a,imagePath:s,isFlipped:!1,isMatched:!1}]);return W(t)}function y(e){return e.theme!==null&&e.player!==null&&e.boardSize!==null}const Y=1e3,X=2,$={16:4,24:4,36:6},Z={codevibes:"/assets/img/codevibes_theme/front/front.svg",foods:"/assets/img/foods_theme/front/foot.svg"},U={codevibes:"/assets/img/codevibes_theme/game/exit.svg",foods:"/assets/img/foods_theme/game/exit_orange.svg"},S={codevibes:{blue:"/assets/img/codevibes_theme/game/label_blue.svg",orange:"/assets/img/codevibes_theme/game/label_orange.svg"},foods:{blue:"/assets/img/foods_theme/game/chess_pawn_blue.svg",orange:"/assets/img/foods_theme/game/chess_pawn_orange.svg"}};function V(e){const t=N(e.theme,e.boardSize),s=j(t),a={settings:e,cards:s,scores:{blue:0,orange:0},currentPlayer:e.player,flippedCards:[],isLocked:!1,totalPairs:t.length,matchedPairs:0};k(a)}function E(e){const t=S[e.settings.theme];return`
    <div class="game-header__scores">
      <span class="score score--blue"><img src="${t.blue}" alt="" aria-hidden="true" /> <span class="score__label">Blue </span>${e.scores.blue}</span>
      <span class="score score--orange"><img src="${t.orange}" alt="" aria-hidden="true" /> <span class="score__label">Orange </span>${e.scores.orange}</span>
    </div>
  `}function w(e,t){const s=t==="foods"?"/assets/img/foods_theme/game/chess_pawn_whitesvg.svg":S[t][e];return`
    <div class="game-header__current" data-player="${e}">
      Current player:
      <img src="${s}" alt="${e} player" />
    </div>
  `}function C(e){return`
    <div class="game-header__exit">
      <button class="btn btn--outlined" id="btn-exit"><img src="${U[e]}" alt="" aria-hidden="true" /> Exit game</button>
      <dialog class="exit-dialog" id="exit-dialog">
        <p>Are you sure you want to quit the game?</p>
        <div class="exit-dialog__actions">
          <button class="btn btn--dialog-back" id="btn-back-to-game">${e==="foods"?"No, Back to game":"Back to game"}</button>
          <button class="btn btn--dialog-exit" id="btn-confirm-exit">Exit game</button>
        </div>
      </dialog>
    </div>
  `}function K(e,t){return`
    <div class="card__inner">
      <div class="card__face card__face--front"><img src="${Z[t]}" alt="" aria-hidden="true" draggable="false" /></div>
      <div class="card__face card__face--back"><img src="${e.imagePath}" alt="Card image" draggable="false" /></div>
    </div>
  `}function J(e){const t=r().settings.theme;return`
    <button class="${`card ${e.isFlipped?"is-flipped":""} ${e.isMatched?"is-matched":""}`}" data-card-id="${e.id}" aria-label="Memory card" aria-pressed="${e.isFlipped}">
      ${K(e,t)}
    </button>
  `}function Q(e){const t=$[e.settings.boardSize],s=e.settings.boardSize/t;return`
    <section
      class="game-board"
      id="game-board"
      style="--grid-cols: ${t}; --grid-rows: ${s}"
      aria-label="Memory card board"
    >
      ${e.cards.map(J).join("")}
    </section>
  `}function ee(){const e=r();return`
    <main class="game" data-page="game" data-theme="${e.settings.theme}">
      <header class="game-header">
        ${E(e)}
        ${w(e.currentPlayer,e.settings.theme)}
        ${C(e.settings.theme)}
      </header>
      ${Q(e)}
    </main>
  `}function te(e){e.isFlipped=!0;const t=document.querySelector(`[data-card-id="${e.id}"]`);t?.classList.add("is-flipped"),t?.setAttribute("aria-pressed","true")}function se(e,t){[e,t].forEach(s=>{s.isFlipped=!1;const a=document.querySelector(`[data-card-id="${s.id}"]`);a?.classList.remove("is-flipped"),a?.setAttribute("aria-pressed","false")})}function ne(e,t){[e,t].forEach(s=>{s.isMatched=!0,document.querySelector(`[data-card-id="${s.id}"]`)?.classList.add("is-matched")})}function ae(){const e=r();e.currentPlayer=e.currentPlayer==="blue"?"orange":"blue"}function L(){const e=r(),t=document.querySelector(".game-header");t&&(t.innerHTML=E(e)+w(e.currentPlayer,e.settings.theme)+C(e.settings.theme),P())}function ie(e,t,s){ne(t,s),e.scores[e.currentPlayer]+=X,e.matchedPairs++,e.flippedCards=[],e.isLocked=!1,L(),e.matchedPairs===e.totalPairs&&o("game-over")}function re(e,t,s){setTimeout(()=>{se(t,s),ae(),e.flippedCards=[],e.isLocked=!1,L()},Y)}function oe(e,t,s){t.pairId===s.pairId?ie(e,t,s):re(e,t,s)}function ce(e,t){if(e.flippedCards.push(t),e.flippedCards.length!==2)return;e.isLocked=!0;const[s,a]=e.flippedCards;s&&a&&oe(e,s,a)}function le(e){const t=e.target.closest("[data-card-id]");if(!t)return;const s=r();if(s.isLocked)return;const a=t.dataset.cardId??"",n=s.cards.find(i=>i.id===parseInt(a));!n||n.isFlipped||n.isMatched||(te(n),ce(s,n))}function P(){const e=document.getElementById("exit-dialog");document.getElementById("btn-exit")?.addEventListener("click",()=>e?.showModal()),document.getElementById("btn-back-to-game")?.addEventListener("click",()=>e?.close()),document.getElementById("btn-confirm-exit")?.addEventListener("click",()=>o("settings"))}const u=8,g=8;function de(){const e=r(),t=$[e.settings.boardSize];return{cols:t,rows:e.settings.boardSize/t}}function ue(e,t,s,a){const n=(a-g*2-u*(s-1))/s;e.style.height=`${a}px`,e.style.width=`${n*t+g*2+u*(t-1)}px`}function f(){const e=document.querySelector(".game-header"),t=document.getElementById("game-board");if(!e||!t)return;t.style.width="";const{cols:s,rows:a}=de(),n=window.innerHeight-e.offsetHeight,c=(t.offsetWidth-g*2-u*(s-1))/s*a+g*2+u*(a-1);c<=n?t.style.height=`${c}px`:ue(t,s,a,n)}function ge(){document.getElementById("game-board")?.addEventListener("click",le),P(),f(),window.addEventListener("resize",f)}const me={codevibes:"Code vibes theme",foods:"Foods theme"},he={blue:"Blue Player",orange:"Orange Player"},_e={16:"16 Cards",24:"24 Cards",36:"36 Cards"};function fe(){return`
    <section class="settings__group" aria-labelledby="label-theme">
      <h2 id="label-theme" class="settings__group-title">
        <span class="settings__group-icon" aria-hidden="true"><img src="/assets/img/settings/palette.svg" alt="Palette" style="width: 1.2em; height: 1.2em; vertical-align: middle;" /></span>
        Game themes
      </h2>
      <label class="settings__option">
        <input type="radio" name="theme" value="codevibes" />
        Code vibes theme
      </label>
      <label class="settings__option">
        <input type="radio" name="theme" value="foods" />
        Foods theme
      </label>
    </section>
  `}function pe(){return`
    <section class="settings__group" aria-labelledby="label-player">
      <h2 id="label-player" class="settings__group-title">
        <span class="settings__group-icon" aria-hidden="true"><img src="/assets/img/settings/chess_pawn.svg" alt="Chess pawn" style="width: 1.2em; height: 1.2em; vertical-align: middle;" /></span>
        Choose player
      </h2>
      <label class="settings__option">
        <input type="radio" name="player" value="blue" />
        Blue
      </label>
      <label class="settings__option">
        <input type="radio" name="player" value="orange" />
        Orange
      </label>
    </section>
  `}function be(){return`
    <section class="settings__group" aria-labelledby="label-size">
      <h2 id="label-size" class="settings__group-title">
        <span class="settings__group-icon" aria-hidden="true"><img src="/assets/img/settings/style.svg" alt="Board size icon" style="width: 1.2em; height: 1.2em; vertical-align: middle;" /></span>
        Board size
      </h2>
      <label class="settings__option">
        <input type="radio" name="boardSize" value="16" /> 16 cards
      </label>
      <label class="settings__option">
        <input type="radio" name="boardSize" value="24" /> 24 cards
      </label>
      <label class="settings__option">
        <input type="radio" name="boardSize" value="36" /> 36 cards
      </label>
    </section>
  `}function ve(e){return e==="foods"?'<img src="/assets/img/foods_theme/preview.svg" alt="Foods theme preview" class="settings__preview-img" />':'<img src="/assets/img/codevibes_theme/preview.svg" alt="Code vibes theme preview" class="settings__preview-img" />'}function I(e){return`
    <aside class="settings__preview ${e?`preview--${e}`:"preview--empty"}" id="settings-preview" aria-label="Theme preview">
      ${ve(e)}
    </aside>
  `}function p(e,t){return`
    <span class="settings__breadcrumb-item">
      <span class="settings__crumb ${t?"settings__crumb--active":""}">${e}</span>
      <span class="settings__breadcrumb-sep"><img src="/assets/img/settings/${t?"line_high_active_":"line_high_deactive_"}.svg" alt="" aria-hidden="true" /></span>
    </span>
  `}function ye(e){return`
    <button class="btn btn--primary settings__start-btn" id="btn-start" ${e?"":"disabled"}>
      <img src="${e?"/assets/img/settings/smart_display.svg":"/assets/img/settings/smart_display_disable.svg"}" alt="" aria-hidden="true" class="settings__start-icon" />
      Start
    </button>
  `}function B(e){const t=e.theme?me[e.theme]:"Game theme",s=e.player?he[e.player]:"Player",a=e.boardSize?_e[e.boardSize]:"Board size",n=e.boardSize?"settings__crumb--active":"";return`
    <footer class="settings__breadcrumb" id="settings-breadcrumb">
      ${p(t,!!e.theme)}
      ${p(s,!!e.player)}
      <span class="settings__crumb ${n}">${a}</span>
      ${ye(y(e))}
    </footer>
  `}function $e(){return`
    <header class="settings__header">
      <h1 class="settings__title">
        Settings
        <img src="/assets/img/settings/line_h1.svg" alt="" aria-hidden="true" class="settings__title-line" />
      </h1>
    </header>
  `}function Se(){return`
    <div class="settings__controls">
      ${fe()}
      ${pe()}
      ${be()}
    </div>
  `}function Ee(e){return`
    <div class="settings__right">
      ${I(e.theme)}
      ${B(e)}
    </div>
  `}function we(){const e=m();return`
    <main class="settings" data-page="settings">
      ${$e()}
      <div class="settings__body">
        ${Se()}
        ${Ee(e)}
      </div>
    </main>
  `}function Ce(e){document.documentElement.setAttribute("data-theme",e??"codevibes")}function _(){const e=m(),t=document.getElementById("settings-preview"),s=document.getElementById("settings-breadcrumb");t&&(t.outerHTML=I(e.theme)),s&&(s.outerHTML=B(e)),Ce(e.theme),A(),M()}function Le(){const e=m();y(e)&&(V(e),o("game"))}function A(){document.getElementById("btn-start")?.addEventListener("click",Le)}function M(){const e=document.querySelector(".settings__controls"),t=document.querySelector(".settings__right");!e||!t||(t.style.maxHeight=`${e.offsetHeight}px`)}function Pe(){document.querySelectorAll("input[name='theme']").forEach(e=>{e.addEventListener("change",()=>{h({theme:e.value}),_()})})}function Ie(){document.querySelectorAll("input[name='player']").forEach(e=>{e.addEventListener("change",()=>{h({player:e.value}),_()})})}function Be(){document.querySelectorAll("input[name='boardSize']").forEach(e=>{e.addEventListener("change",()=>{h({boardSize:parseInt(e.value)}),_()})})}function Ae(){Pe(),Ie(),Be(),A(),M()}const Me=2e3,Oe={codevibes:{blue:"/assets/img/codevibes_theme/game/label_blue.svg",orange:"/assets/img/codevibes_theme/game/label_orange.svg"},foods:{blue:"/assets/img/foods_theme/game/chess_pawn_blue.svg",orange:"/assets/img/foods_theme/game/chess_pawn_orange.svg"}};function ze(e,t){const s=Oe[t];return`
    <p class="game-over__score-label">Final score</p>
    <div class="game-header__scores">
      <span class="score score--blue"><img src="${s.blue}" alt="" aria-hidden="true" /> <span class="score__label">Blue </span>${e.blue}</span>
      <span class="score score--orange"><img src="${s.orange}" alt="" aria-hidden="true" /> <span class="score__label">Orange </span>${e.orange}</span>
    </div>
  `}function Ge(){const e=r();return`
    <main class="game-over" data-page="game-over" data-theme="${e.settings.theme}">
      <section class="game-over__content">
        <h1 class="game-over__title">Game Over</h1>
        ${ze(e.scores,e.settings.theme)}
      </section>
    </main>
  `}function ke(){setTimeout(()=>o("game-winner"),Me)}const xe={codevibes:{blue:"/assets/img/codevibes_theme/winner/chess_pawn_blue.svg",orange:"/assets/img/codevibes_theme/winner/chess_pawn_orange.svg"},foods:{blue:"/assets/img/foods_theme/winner/player_blue.svg",orange:"/assets/img/foods_theme/winner/player_orange.svg"}};function He(){let e="";for(let t=0;t<60;t++)e+=`<span class="confetti confetti--${t%20}" aria-hidden="true"></span>`;return e}function Te(e,t){return e>t?"blue":t>e?"orange":null}function Fe(e,t){if(!e)return`<p class="game-winner__winner">It's a tie!</p>`;const s=e==="blue"?"Blue Player":"Orange Player";return`
    <p class="game-winner__winner-label">The winner is</p>
    <p class="game-winner__winner game-winner__winner--${e}">${s}</p>
    <img src="${xe[t][e]}" alt="${s} icon" class="game-winner__pawn" />
  `}function Re(){const{scores:e,settings:t}=r(),s=Te(e.blue,e.orange);return`
    <main class="game-winner" data-page="game-winner" data-theme="${t.theme}">
      ${t.theme==="foods"?"":`<div class="confetti-container" aria-hidden="true">${He()}</div>`}
      <section class="game-winner__content">
        ${Fe(s,t.theme)}
        <button class="btn btn--home" id="btn-home">${t.theme==="foods"?"HOME":"Back to start"}</button>
      </section>
    </main>
  `}function qe(){document.getElementById("btn-home")?.addEventListener("click",()=>{x(),G(),o("home")})}function De(e){return e==="home"?T():e==="settings"?we():e==="game"?ee():e==="game-over"?Ge():e==="game-winner"?Re():""}function Ne(e){e==="home"&&F(),e==="settings"&&Ae(),e==="game"&&ge(),e==="game-over"&&ke(),e==="game-winner"&&qe()}function o(e){z(e);const t=document.getElementById("app");t&&(t.innerHTML=De(e),Ne(e))}function We(){o(O())}We();
