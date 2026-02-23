import type { Settings, GameState, Page } from "./types";

/** Default settings — nothing pre-selected until user explicitly chooses */
const DEFAULT_SETTINGS: Settings = {
  theme: null,
  player: null,
  boardSize: null,
};

let currentPage: Page = "home";
let settings: Settings = { ...DEFAULT_SETTINGS };
let gameState: GameState | null = null;

/** Returns the currently active page */
export function getCurrentPage(): Page {
  return currentPage;
}

/**
 * Sets the currently active page.
 * @param page - the page to navigate to
 */
export function setCurrentPage(page: Page): void {
  currentPage = page;
}

/** Returns a shallow copy of the current settings */
export function getSettings(): Settings {
  return { ...settings };
}

/** Merges a partial settings update into current settings */
export function updateSettings(patch: Partial<Settings>): void {
  settings = { ...settings, ...patch };
}

/** Resets all settings to their default null state */
export function resetSettings(): void {
  settings = { ...DEFAULT_SETTINGS };
}

/**
 * Returns the current game state.
 * @throws Error if game state has not been initialized
 */
export function getGameState(): GameState {
  if (!gameState) throw new Error("GameState not initialized");
  return gameState;
}

/** Stores the initialized game state */
export function setGameState(state: GameState): void {
  gameState = state;
}

/** Clears the game state after a game ends */
export function clearGameState(): void {
  gameState = null;
}
