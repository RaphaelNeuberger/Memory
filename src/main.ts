import "../scss/main.scss";
import { getCurrentPage, setCurrentPage } from "./state";
import { renderHome, initHomeEvents } from "./pages/home";
import { renderSettings, initSettingsEvents } from "./pages/settings";
import { renderGame, initGameEvents } from "./pages/game";
import { renderGameOver, initGameOverEvents } from "./pages/game-over";
import { renderGameWinner, initGameWinnerEvents } from "./pages/game-winner";
import type { Page } from "./types";

/**
 * Returns the HTML string for the given page.
 * @param page - target page
 * @returns HTML string
 */
function getPageHTML(page: Page): string {
  if (page === "home") return renderHome();
  if (page === "settings") return renderSettings();
  if (page === "game") return renderGame();
  if (page === "game-over") return renderGameOver();
  if (page === "game-winner") return renderGameWinner();
  return "";
}

/**
 * Attaches event listeners for the given page after HTML is injected.
 * @param page - target page
 */
function initPageEvents(page: Page): void {
  if (page === "home") initHomeEvents();
  if (page === "settings") initSettingsEvents();
  if (page === "game") initGameEvents();
  if (page === "game-over") initGameOverEvents();
  if (page === "game-winner") initGameWinnerEvents();
}

/**
 * Renders the correct page into #app and initializes its events.
 * @param page - page to navigate to
 */
export function navigateTo(page: Page): void {
  setCurrentPage(page);
  const app = document.getElementById("app");
  if (!app) return;
  app.innerHTML = getPageHTML(page);
  initPageEvents(page);
}

/** Application entry point */
function init(): void {
  navigateTo(getCurrentPage());
}

init();
