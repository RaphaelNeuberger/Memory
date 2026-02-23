import { getGameState } from "../state";
import { navigateTo } from "../main";
import type { Scores, Theme } from "../types";

/** Milliseconds the Game Over screen is shown before advancing to winner screen */
const GAME_OVER_DISPLAY_MS = 2000;

/** Score label icon per theme and player color */
const SCORE_ICON_IMAGES: Record<Theme, Record<"blue" | "orange", string>> = {
  codevibes: {
    blue:   "/assets/img/codevibes_theme/game/label_blue.svg",
    orange: "/assets/img/codevibes_theme/game/label_orange.svg",
  },
  foods: {
    blue:   "/assets/img/foods_theme/game/chess_pawn_blue.svg",
    orange: "/assets/img/foods_theme/game/chess_pawn_orange.svg",
  },
};

/**
 * Renders the final score row for both players.
 * @param scores - final scores
 * @param theme - active game theme
 * @returns HTML string
 */
function renderFinalScores(scores: Scores, theme: Theme): string {
  const icons = SCORE_ICON_IMAGES[theme];
  return `
    <p class="game-over__score-label">Final score</p>
    <div class="game-header__scores">
      <span class="score score--blue"><img src="${icons.blue}" alt="" aria-hidden="true" /> <span class="score__label">Blue </span>${scores.blue}</span>
      <span class="score score--orange"><img src="${icons.orange}" alt="" aria-hidden="true" /> <span class="score__label">Orange </span>${scores.orange}</span>
    </div>
  `;
}

/**
 * Returns the full HTML for the Game Over screen.
 * @returns HTML string
 */
export function renderGameOver(): string {
  const state = getGameState();
  return `
    <main class="game-over" data-page="game-over" data-theme="${state.settings.theme}">
      <section class="game-over__content">
        <h1 class="game-over__title">Game Over</h1>
        ${renderFinalScores(state.scores, state.settings.theme)}
      </section>
    </main>
  `;
}

/**
 * Shows the Game Over screen briefly, then navigates to the winner screen.
 */
export function initGameOverEvents(): void {
  setTimeout(() => navigateTo("game-winner"), GAME_OVER_DISPLAY_MS);
}
