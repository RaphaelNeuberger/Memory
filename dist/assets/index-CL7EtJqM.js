(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(a){if(a.ep)return;a.ep=!0;const r=n(a);fetch(a.href,r)}})();const f={theme:null,player:null,boardSize:null};let b="home",l={...f},d=null;function P(){return b}function C(e){b=e}function p(){return{...l}}function u(e){l={...l,...e}}function w(){l={...f}}function c(){if(!d)throw new Error("GameState not initialized");return d}function B(e){d=e}function I(){d=null}function A(){return`
    <img
      src="/assets/img/home/stadia_controller.svg"
      alt=""
      class="home__bg-icon"
      aria-hidden="true"
    />
  `}function M(){return`
    <p class="home__tagline">It's play time.</p>
    <h1 class="home__heading">Ready to play?</h1>
  `}function z(){return`
    <button class="btn btn--play" id="btn-play">
      <img
        src="/assets/img/home/stadia_controller_icon.svg"
        alt=""
        aria-hidden="true"
        class="btn__icon"
      />
      Play &rarr;
    </button>
  `}function O(){return`
    <main class="home" data-page="home">
      <section class="home__hero">
        ${M()}
        ${z()}
      </section>
      <aside class="home__decoration" aria-hidden="true">
        ${A()}
      </aside>
    </main>
  `}function T(){document.getElementById("btn-play")?.addEventListener("click",()=>o("settings"))}const G=["angular","bootstrape","css","dj","firebase","git","github","html5","js","node","phyton","react","sass","scl","terminal","ts","vs","vector"],k=["brezen","burger","chicken","chocolat","doener","donat","hotdog","ice","kuchen","macaros","muffin","pizza","pommes","pudding","salat","sandwitch","shushi","dürum"],x={16:8,24:12,36:18};function F(e,t){const n=e==="codevibes"?G:k,s=e==="codevibes"?"codevibes_theme":"foods_theme",a=x[t];return n.slice(0,a).map(r=>`/assets/img/${s}/${r}.svg`)}function H(e){for(let t=e.length-1;t>0;t--){const n=Math.floor(Math.random()*(t+1));[e[t],e[n]]=[e[n],e[t]]}return e}function q(e){const t=e.flatMap((n,s)=>[{id:s*2,pairId:s,imagePath:n,isFlipped:!1,isMatched:!1},{id:s*2+1,pairId:s,imagePath:n,isFlipped:!1,isMatched:!1}]);return H(t)}function _(e){return e.theme!==null&&e.player!==null&&e.boardSize!==null}const D=1e3,j=2;function R(e){const t=F(e.theme,e.boardSize),n=q(t),s={settings:e,cards:n,scores:{blue:0,orange:0},currentPlayer:e.player,flippedCards:[],isLocked:!1,totalPairs:t.length,matchedPairs:0};B(s)}function h(e){return`
    <div class="game-header__scores">
      <span class="score score--blue">Blue ${e.scores.blue}</span>
      <span class="score score--orange">Orange ${e.scores.orange}</span>
    </div>
  `}function v(e){return`
    <div class="game-header__current">
      Current player:
      <span class="player-dot player-dot--${e}" aria-label="${e} player"></span>
    </div>
  `}function y(){return`
    <div class="game-header__exit">
      <button class="btn btn--outlined" id="btn-exit">&#8855; Exit game</button>
      <dialog class="exit-dialog" id="exit-dialog">
        <p>Are you sure you want to quit the game?</p>
        <div class="exit-dialog__actions">
          <button class="btn btn--secondary" id="btn-back-to-game">No, back to game</button>
          <button class="btn btn--outlined" id="btn-confirm-exit">Exit game</button>
        </div>
      </dialog>
    </div>
  `}function N(e){const t=e.isFlipped?"is-flipped":"",n=e.isMatched?"is-matched":"";return`
    <button
      class="card ${t} ${n}"
      data-card-id="${e.id}"
      aria-label="Memory card"
      aria-pressed="${e.isFlipped}"
    >
      <div class="card__inner">
        <div class="card__face card__face--front"></div>
        <div class="card__face card__face--back">
          <img src="${e.imagePath}" alt="Card image" draggable="false" />
        </div>
      </div>
    </button>
  `}function Y(e){return`
    <section
      class="game-board"
      id="game-board"
      style="--grid-cols: ${e.settings.boardSize===36?6:4}"
      aria-label="Memory card board"
    >
      ${e.cards.map(N).join("")}
    </section>
  `}function U(){const e=c();return`
    <main class="game" data-page="game" data-theme="${e.settings.theme}">
      <header class="game-header">
        ${h(e)}
        ${v(e.currentPlayer)}
        ${y()}
      </header>
      ${Y(e)}
    </main>
  `}function W(e){e.isFlipped=!0;const t=document.querySelector(`[data-card-id="${e.id}"]`);t?.classList.add("is-flipped"),t?.setAttribute("aria-pressed","true")}function Z(e,t){[e,t].forEach(n=>{n.isFlipped=!1;const s=document.querySelector(`[data-card-id="${n.id}"]`);s?.classList.remove("is-flipped"),s?.setAttribute("aria-pressed","false")})}function K(e,t){[e,t].forEach(n=>{n.isMatched=!0,document.querySelector(`[data-card-id="${n.id}"]`)?.classList.add("is-matched")})}function V(){const e=c();e.currentPlayer=e.currentPlayer==="blue"?"orange":"blue"}function g(){const e=c(),t=document.querySelector(".game-header");t&&(t.innerHTML=h(e)+v(e.currentPlayer)+y(),E())}function J(e,t,n){t.pairId===n.pairId?(K(t,n),e.scores[e.currentPlayer]+=j,e.matchedPairs++,e.flippedCards=[],e.isLocked=!1,g(),e.matchedPairs===e.totalPairs&&o("game-over")):setTimeout(()=>{Z(t,n),V(),e.flippedCards=[],e.isLocked=!1,g()},D)}function Q(e){const t=e.target.closest("[data-card-id]");if(!t)return;const n=c();if(n.isLocked)return;const s=t.dataset.cardId??"",a=n.cards.find(r=>r.id===parseInt(s));if(!(!a||a.isFlipped||a.isMatched)&&(W(a),n.flippedCards.push(a),n.flippedCards.length===2)){n.isLocked=!0;const[r,i]=n.flippedCards;r&&i&&J(n,r,i)}}function E(){const e=document.getElementById("exit-dialog");document.getElementById("btn-exit")?.addEventListener("click",()=>e?.showModal()),document.getElementById("btn-back-to-game")?.addEventListener("click",()=>e?.close()),document.getElementById("btn-confirm-exit")?.addEventListener("click",()=>o("home"))}function X(){document.getElementById("game-board")?.addEventListener("click",Q),E()}const ee={codevibes:"Code vibes theme",foods:"Foods theme"},te={blue:"Blue Player",orange:"Orange Player"},ne={16:"16 Cards",24:"24 Cards",36:"36 Cards"};function ae(){return`
    <section class="settings__group" aria-labelledby="label-theme">
      <h2 id="label-theme" class="settings__group-title">
        <span class="settings__group-icon" aria-hidden="true">🎨</span>
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
  `}function se(){return`
    <section class="settings__group" aria-labelledby="label-player">
      <h2 id="label-player" class="settings__group-title">
        <span class="settings__group-icon" aria-hidden="true">♟</span>
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
  `}function re(){return`
    <section class="settings__group" aria-labelledby="label-size">
      <h2 id="label-size" class="settings__group-title">
        <span class="settings__group-icon" aria-hidden="true">📋</span>
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
  `}function S(e){return`
    <aside class="settings__preview ${e?`preview--${e}`:"preview--empty"}" id="settings-preview" aria-label="Theme preview">
      <div class="preview__board">
        <div class="preview__header">
          <span class="preview__score preview__score--blue">Blue 0</span>
          <span class="preview__score preview__score--orange">Orange 0</span>
          <span class="preview__current">Current player: <span class="preview__dot preview__dot--blue"></span></span>
          <span class="preview__exit-btn">Exit game</span>
        </div>
        <div class="preview__grid">
          ${Array.from({length:4},()=>'<div class="preview__card"></div>').join("")}
        </div>
      </div>
    </aside>
  `}function $(e){const t=e.theme?ee[e.theme]:"Game theme",n=e.player?te[e.player]:"Player",s=e.boardSize?ne[e.boardSize]:"Board size",a=_(e)?"":"disabled";return`
    <footer class="settings__breadcrumb" id="settings-breadcrumb">
      <span class="settings__crumb ${e.theme?"settings__crumb--active":""}">${t}</span>
      <span class="settings__breadcrumb-sep">/</span>
      <span class="settings__crumb ${e.player?"settings__crumb--active":""}">${n}</span>
      <span class="settings__breadcrumb-sep">/</span>
      <span class="settings__crumb ${e.boardSize?"settings__crumb--active":""}">${s}</span>
      <button class="btn btn--primary settings__start-btn" id="btn-start" ${a}>
        &#9654; Start
      </button>
    </footer>
  `}function ie(){const e=p();return`
    <main class="settings" data-page="settings">
      <header class="settings__header">
        <h1 class="settings__title">Settings</h1>
      </header>
      <div class="settings__body">
        <div class="settings__controls">
          ${ae()}
          ${se()}
          ${re()}
        </div>
        ${S(e.theme)}
      </div>
      ${$(e)}
    </main>
  `}function oe(e){document.documentElement.setAttribute("data-theme",e??"codevibes")}function m(){const e=p(),t=document.getElementById("settings-preview"),n=document.getElementById("settings-breadcrumb");t&&(t.outerHTML=S(e.theme)),n&&(n.outerHTML=$(e)),oe(e.theme),L()}function ce(){const e=p();_(e)&&(R(e),o("game"))}function L(){document.getElementById("btn-start")?.addEventListener("click",ce)}function le(){document.querySelectorAll("input[name='theme']").forEach(e=>{e.addEventListener("change",()=>{u({theme:e.value}),m()})}),document.querySelectorAll("input[name='player']").forEach(e=>{e.addEventListener("change",()=>{u({player:e.value}),m()})}),document.querySelectorAll("input[name='boardSize']").forEach(e=>{e.addEventListener("change",()=>{u({boardSize:parseInt(e.value)}),m()})}),L()}function de(e){return e.blue>e.orange?"blue":e.orange>e.blue?"orange":null}function ue(){return Array.from({length:20},(e,t)=>`<span class="confetti confetti--${t%5}" aria-hidden="true"></span>`).join("")}function me(e){return`
    <div class="game-over__scores">
      <p class="game-over__score-label">Final score</p>
      <div class="game-over__score-row">
        <span class="score score--blue">Blue ${e.blue}</span>
        <span class="score score--orange">Orange ${e.orange}</span>
      </div>
    </div>
  `}function pe(e){return e?`
    <p class="game-over__winner-label">The winner is</p>
    <p class="game-over__winner game-over__winner--${e}">${e==="blue"?"Blue Player":"Orange Player"}</p>
  `:`<p class="game-over__winner">It's a tie!</p>`}function ge(){const e=c(),t=de(e.scores);return`
    <main class="game-over" data-page="game-over">
      <div class="confetti-container" aria-hidden="true">
        ${ue()}
      </div>
      <section class="game-over__content">
        <h1 class="game-over__title">Game Over</h1>
        ${pe(t)}
        ${me(e.scores)}
        <button class="btn btn--home" id="btn-home">Back to start</button>
      </section>
    </main>
  `}function fe(){document.getElementById("btn-home")?.addEventListener("click",()=>{I(),w(),o("home")})}const be="app";function _e(e){return e==="home"?O():e==="settings"?ie():e==="game"?U():e==="game-over"?ge():""}function he(e){e==="home"&&T(),e==="settings"&&le(),e==="game"&&X(),e==="game-over"&&fe()}function o(e){C(e);const t=document.getElementById(be);t&&(t.innerHTML=_e(e),he(e))}function ve(){o(P())}ve();
