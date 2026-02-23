import { getSettings, updateSettings } from "../state";
import { isSettingsComplete } from "../utils";
import { navigateTo } from "../main";
import { initGame } from "./game";
import type { Theme, PlayerColor, BoardSize, Settings, CompleteSettings } from "../types";

/** Human-readable label map for the breadcrumb */
const THEME_LABELS: Record<Theme, string> = {
  codevibes: "Code vibes theme",
  foods: "Foods theme",
};

const PLAYER_LABELS: Record<PlayerColor, string> = {
  blue: "Blue Player",
  orange: "Orange Player",
};

const SIZE_LABELS: Record<BoardSize, string> = {
  16: "16 Cards",
  24: "24 Cards",
  36: "36 Cards",
};

/**
 * Renders the game theme radio group.
 * @returns HTML string
 */
function renderThemeGroup(): string {
  return `
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
  `;
}

/**
 * Renders the player color radio group.
 * @returns HTML string
 */
function renderPlayerGroup(): string {
  return `
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
  `;
}

/**
 * Renders the board size radio group.
 * @returns HTML string
 */
function renderBoardSizeGroup(): string {
  return `
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
  `;
}

/**
 * Returns the inner preview image depending on the theme.
 * Defaults to codevibes when no theme is selected yet.
 * @param theme - currently selected theme or null
 * @returns HTML string
 */
function renderPreviewContent(theme: Theme | null): string {
  if (theme === "foods") {
    return `<img src="/assets/img/foods_theme/preview.svg" alt="Foods theme preview" class="settings__preview-img" />`;
  }
  return `<img src="/assets/img/codevibes_theme/preview.svg" alt="Code vibes theme preview" class="settings__preview-img" />`;
}

/**
 * Renders the preview panel wrapper with correct theme class.
 * @param theme - currently selected theme or null
 * @returns HTML string
 */
function renderPreview(theme: Theme | null): string {
  const themeClass = theme ? `preview--${theme}` : "preview--empty";
  return `
    <aside class="settings__preview ${themeClass}" id="settings-preview" aria-label="Theme preview">
      ${renderPreviewContent(theme)}
    </aside>
  `;
}

/**
 * Renders a crumb with its trailing separator, wrapped in a breadcrumb-item span.
 * @param label - display text
 * @param active - whether this crumb is selected
 * @returns HTML string
 */
function renderSeparatedCrumb(label: string, active: boolean): string {
  const sepImg = active ? "line_high_active_" : "line_high_deactive_";
  const activeCls = active ? "settings__crumb--active" : "";
  return `
    <span class="settings__breadcrumb-item">
      <span class="settings__crumb ${activeCls}">${label}</span>
      <span class="settings__breadcrumb-sep"><img src="/assets/img/settings/${sepImg}.svg" alt="" aria-hidden="true" /></span>
    </span>
  `;
}

/**
 * Renders the Start button in the correct enabled/disabled state.
 * @param complete - whether all settings are selected
 * @returns HTML string
 */
function renderStartButton(complete: boolean): string {
  const disabled = complete ? "" : "disabled";
  const icon = complete
    ? "/assets/img/settings/smart_display.svg"
    : "/assets/img/settings/smart_display_disable.svg";
  return `
    <button class="btn btn--primary settings__start-btn" id="btn-start" ${disabled}>
      <img src="${icon}" alt="" aria-hidden="true" class="settings__start-icon" />
      Start
    </button>
  `;
}

/**
 * Renders the breadcrumb bar at the bottom with current selections.
 * @param s - current settings snapshot
 * @returns HTML string
 */
function renderBreadcrumb(s: Settings): string {
  const themeLabel = s.theme ? THEME_LABELS[s.theme] : "Game theme";
  const playerLabel = s.player ? PLAYER_LABELS[s.player] : "Player";
  const sizeLabel = s.boardSize ? SIZE_LABELS[s.boardSize] : "Board size";
  const sizeActiveCls = s.boardSize ? "settings__crumb--active" : "";
  return `
    <footer class="settings__breadcrumb" id="settings-breadcrumb">
      ${renderSeparatedCrumb(themeLabel, !!s.theme)}
      ${renderSeparatedCrumb(playerLabel, !!s.player)}
      <span class="settings__crumb ${sizeActiveCls}">${sizeLabel}</span>
      ${renderStartButton(isSettingsComplete(s))}
    </footer>
  `;
}

/**
 * Renders the settings page header section.
 * @returns HTML string
 */
function renderSettingsHeader(): string {
  return `
    <header class="settings__header">
      <h1 class="settings__title">
        Settings
        <img src="/assets/img/settings/line_h1.svg" alt="" aria-hidden="true" class="settings__title-line" />
      </h1>
    </header>
  `;
}

/**
 * Renders the left-column controls (theme, player, board size).
 * @returns HTML string
 */
function renderControlsColumn(): string {
  return `
    <div class="settings__controls">
      ${renderThemeGroup()}
      ${renderPlayerGroup()}
      ${renderBoardSizeGroup()}
    </div>
  `;
}

/**
 * Renders the right-column preview and breadcrumb.
 * @param s - current settings
 * @returns HTML string
 */
function renderRightColumn(s: Settings): string {
  return `
    <div class="settings__right">
      ${renderPreview(s.theme)}
      ${renderBreadcrumb(s)}
    </div>
  `;
}

/**
 * Returns the full HTML for the Settings screen.
 * @returns HTML string
 */
export function renderSettings(): string {
  const s = getSettings();
  return `
    <main class="settings" data-page="settings">
      ${renderSettingsHeader()}
      <div class="settings__body">
        ${renderControlsColumn()}
        ${renderRightColumn(s)}
      </div>
    </main>
  `;
}

/**
 * Sets the data-theme attribute on <html> to reflect the selected theme.
 * @param theme - selected theme or null
 */
function syncThemeAttribute(theme: Theme | null): void {
  document.documentElement.setAttribute("data-theme", theme ?? "codevibes");
}

/**
 * Swaps only the preview and breadcrumb without touching radio inputs.
 */
function refreshSettingsUI(): void {
  const s = getSettings();
  const preview = document.getElementById("settings-preview");
  const breadcrumb = document.getElementById("settings-breadcrumb");
  if (preview) preview.outerHTML = renderPreview(s.theme);
  if (breadcrumb) breadcrumb.outerHTML = renderBreadcrumb(s);
  syncThemeAttribute(s.theme);
  reattachStartListener();
  syncRightColumnHeight();
}

/**
 * Handles the Start button click — starts the game and navigates.
 */
function handleStart(): void {
  const s = getSettings();
  if (!isSettingsComplete(s)) return;
  initGame(s as CompleteSettings);
  navigateTo("game");
}

/**
 * Re-attaches the Start button listener (needed after outerHTML swap).
 */
function reattachStartListener(): void {
  document.getElementById("btn-start")?.addEventListener("click", handleStart);
}

/**
 * Sets max-height on settings__right to match the content height of settings__controls.
 */
function syncRightColumnHeight(): void {
  const controls = document.querySelector<HTMLElement>(".settings__controls");
  const right = document.querySelector<HTMLElement>(".settings__right");
  if (!controls || !right) return;
  right.style.maxHeight = `${controls.offsetHeight}px`;
}

/**
 * Attaches change listeners for all theme radio inputs.
 */
function attachThemeListeners(): void {
  document.querySelectorAll<HTMLInputElement>("input[name='theme']").forEach((el) => {
    el.addEventListener("change", () => {
      updateSettings({ theme: el.value as Theme });
      refreshSettingsUI();
    });
  });
}

/**
 * Attaches change listeners for all player radio inputs.
 */
function attachPlayerListeners(): void {
  document.querySelectorAll<HTMLInputElement>("input[name='player']").forEach((el) => {
    el.addEventListener("change", () => {
      updateSettings({ player: el.value as PlayerColor });
      refreshSettingsUI();
    });
  });
}

/**
 * Attaches change listeners for all board size radio inputs.
 */
function attachSizeListeners(): void {
  document.querySelectorAll<HTMLInputElement>("input[name='boardSize']").forEach((el) => {
    el.addEventListener("change", () => {
      updateSettings({ boardSize: parseInt(el.value) as BoardSize });
      refreshSettingsUI();
    });
  });
}

/**
 * Attaches all radio change listeners and the Start button listener.
 */
export function initSettingsEvents(): void {
  attachThemeListeners();
  attachPlayerListeners();
  attachSizeListeners();
  reattachStartListener();
  syncRightColumnHeight();
}
