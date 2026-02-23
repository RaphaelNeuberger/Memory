import { getGameState, clearGameState, resetSettings } from "../state";
import { navigateTo } from "../main";
import type { PlayerColor, Theme } from "../types";

/** SVG paths for the pawn icon per theme and player color */
const PAWN_IMAGES: Record<Theme, Record<PlayerColor, string>> = {
  codevibes: {
    blue: "/assets/img/codevibes_theme/winner/chess_pawn_blue.svg",
    orange: "/assets/img/codevibes_theme/winner/chess_pawn_orange.svg",
  },
  foods: {
    blue: "/assets/img/foods_theme/winner/player_blue.svg",
    orange: "/assets/img/foods_theme/winner/player_orange.svg",
  },
};

/**
 * Renders 60 confetti spans for the winner animation.
 * @returns HTML string
 */
function renderConfetti(): string {
  let html = "";
  for (let i = 0; i < 60; i++) {
    html += `<span class="confetti confetti--${i % 20}" aria-hidden="true"></span>`;
  }
  return html;
}

/**
 * Determines the winner from scores.
 * @returns winning player color, or null on a tie
 */
function getWinner(blueScore: number, orangeScore: number): PlayerColor | null {
  if (blueScore > orangeScore) return "blue";
  if (orangeScore > blueScore) return "orange";
  return null;
}

/**
 * Renders winner label, name and pawn icon.
 * @param winner - winning player or null for a tie
 * @param theme - active game theme
 * @returns HTML string
 */
function renderWinnerContent(winner: PlayerColor | null, theme: Theme): string {
  if (!winner) return `<p class="game-winner__winner">It's a tie!</p>`;
  const name = winner === "blue" ? "Blue Player" : "Orange Player";
  return `
    <p class="game-winner__winner-label">The winner is</p>
    <p class="game-winner__winner game-winner__winner--${winner}">${name}</p>
    <img src="${PAWN_IMAGES[theme][winner]}" alt="${name} icon" class="game-winner__pawn" />
  `;
}

/**
 * Returns the full HTML for the Game Winner screen.
 * @returns HTML string
 */
export function renderGameWinner(): string {
  const { scores, settings } = getGameState();
  const winner = getWinner(scores.blue, scores.orange);
  return `
    <main class="game-winner" data-page="game-winner" data-theme="${settings.theme}">
      ${settings.theme === 'foods' ? '' : `<div class="confetti-container" aria-hidden="true">${renderConfetti()}</div>`}
      <section class="game-winner__content">
        ${renderWinnerContent(winner, settings.theme)}
        <button class="btn btn--home" id="btn-home">${settings.theme === 'foods' ? 'HOME' : 'Back to start'}</button>
      </section>
    </main>
  `;
}

/**
 * Attaches the Home button listener to reset state and return to start.
 */
export function initGameWinnerEvents(): void {
  document.getElementById("btn-home")?.addEventListener("click", () => {
    clearGameState();
    resetSettings();
    navigateTo("home");
  });
}
