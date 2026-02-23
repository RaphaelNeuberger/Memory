import { navigateTo } from "../main";

/**
 * Renders the play button with controller icon.
 * @returns HTML string
 */
function renderPlayButton(): string {
  return `
    <button class="btn btn--play" id="btn-play">
      <img src="/assets/img/home/stadia_controller_icon.svg" alt="" aria-hidden="true" class="btn__icon" />
      Play <span class="btn__arrow">&rarr;</span>
    </button>
  `;
}

/**
 * Returns the full HTML for the Home screen.
 * @returns HTML string
 */
export function renderHome(): string {
  return `
    <main class="home" data-page="home">
      <section class="home__hero">
        <p class="home__tagline">It's play time.</p>
        <h1 class="home__heading">Ready to play?</h1>
        ${renderPlayButton()}
      </section>
      <aside class="home__decoration" aria-hidden="true">
        <img src="/assets/img/home/stadia_controller.svg" alt="" class="home__bg-icon" aria-hidden="true" />
      </aside>
    </main>
  `;
}

/**
 * Attaches the click event to the Play button.
 */
export function initHomeEvents(): void {
  document
    .getElementById("btn-play")
    ?.addEventListener("click", () => navigateTo("settings"));
}
