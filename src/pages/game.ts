import { getGameState, setGameState } from "../state";
import { getImages, buildCardDeck } from "../utils";
import { navigateTo } from "../main";
import type { Card, GameState, CompleteSettings, PlayerColor, Theme, BoardSize } from "../types";

/** Milliseconds to wait before flipping unmatched cards back */
const MATCH_DELAY_MS = 1000;

/** Points awarded for each matched pair */
const SCORE_PER_MATCH = 2;

/** Number of grid columns per board size */
const COLS_FOR_SIZE: Record<BoardSize, number> = {
  16: 4,
  24: 4,
  36: 6,
};

/** Card face-down image per theme */
const CARD_FRONT_IMAGES: Record<Theme, string> = {
  codevibes: "/assets/img/codevibes_theme/front/front.svg",
  foods: "/assets/img/foods_theme/front/foot.svg",
};

/** Exit button icon per theme */
const EXIT_ICON_IMAGES: Record<Theme, string> = {
  codevibes: "/assets/img/codevibes_theme/game/exit.svg",
  foods: "/assets/img/foods_theme/game/exit_orange.svg",
};

/** Score / player label icon per theme and player color */
const SCORE_ICON_IMAGES: Record<Theme, Record<PlayerColor, string>> = {
  codevibes: {
    blue: "/assets/img/codevibes_theme/game/label_blue.svg",
    orange: "/assets/img/codevibes_theme/game/label_orange.svg",
  },
  foods: {
    blue: "/assets/img/foods_theme/game/chess_pawn_blue.svg",
    orange: "/assets/img/foods_theme/game/chess_pawn_orange.svg",
  },
};

/**
 * Initializes a fresh GameState from the confirmed settings and stores it.
 * @param settings - fully selected settings (no null values)
 */
export function initGame(settings: CompleteSettings): void {
  const imagePaths = getImages(settings.theme, settings.boardSize);
  const cards = buildCardDeck(imagePaths);
  const state: GameState = {
    settings,
    cards,
    scores: { blue: 0, orange: 0 },
    currentPlayer: settings.player,
    flippedCards: [],
    isLocked: false,
    totalPairs: imagePaths.length,
    matchedPairs: 0,
  };
  setGameState(state);
}

/**
 * Renders the score display for both players.
 * @param state - current game state
 * @returns HTML string
 */
function renderScores(state: GameState): string {
  const icons = SCORE_ICON_IMAGES[state.settings.theme];
  return `
    <div class="game-header__scores">
      <span class="score score--blue"><img src="${icons.blue}" alt="" aria-hidden="true" /> <span class="score__label">Blue </span>${state.scores.blue}</span>
      <span class="score score--orange"><img src="${icons.orange}" alt="" aria-hidden="true" /> <span class="score__label">Orange </span>${state.scores.orange}</span>
    </div>
  `;
}

/**
 * Renders the current player indicator.
 * @param player - the active player
 * @param theme - active game theme
 * @returns HTML string
 */
function renderCurrentPlayer(player: PlayerColor, theme: Theme): string {
  const icon = theme === "foods"
    ? "/assets/img/foods_theme/game/chess_pawn_whitesvg.svg"
    : SCORE_ICON_IMAGES[theme][player];
  return `
    <div class="game-header__current" data-player="${player}">
      Current player:
      <img src="${icon}" alt="${player} player" />
    </div>
  `;
}

/**
 * Renders the Exit game button and native confirmation dialog.
 * @param theme - active game theme
 * @returns HTML string
 */
function renderExitButton(theme: Theme): string {
  return `
    <div class="game-header__exit">
      <button class="btn btn--outlined" id="btn-exit"><img src="${EXIT_ICON_IMAGES[theme]}" alt="" aria-hidden="true" /> Exit game</button>
      <dialog class="exit-dialog" id="exit-dialog">
        <p>Are you sure you want to quit the game?</p>
        <div class="exit-dialog__actions">
          <button class="btn btn--dialog-back" id="btn-back-to-game">${theme === 'foods' ? 'No, Back to game' : 'Back to game'}</button>
          <button class="btn btn--dialog-exit" id="btn-confirm-exit">Exit game</button>
        </div>
      </dialog>
    </div>
  `;
}

/**
 * Renders the inner flip faces of a card.
 * @param card - card data
 * @param theme - active game theme
 * @returns HTML string
 */
function renderCardInner(card: Card, theme: Theme): string {
  return `
    <div class="card__inner">
      <div class="card__face card__face--front"><img src="${CARD_FRONT_IMAGES[theme]}" alt="" aria-hidden="true" draggable="false" /></div>
      <div class="card__face card__face--back"><img src="${card.imagePath}" alt="Card image" draggable="false" /></div>
    </div>
  `;
}

/**
 * Renders a single card element.
 * @param card - card data object
 * @returns HTML string
 */
function renderCard(card: Card): string {
  const theme = getGameState().settings.theme;
  const cls = `card ${card.isFlipped ? "is-flipped" : ""} ${card.isMatched ? "is-matched" : ""}`;
  return `
    <button class="${cls}" data-card-id="${card.id}" aria-label="Memory card" aria-pressed="${card.isFlipped}">
      ${renderCardInner(card, theme)}
    </button>
  `;
}

/**
 * Renders the full game board grid.
 * @param state - current game state
 * @returns HTML string
 */
function renderBoard(state: GameState): string {
  const cols = COLS_FOR_SIZE[state.settings.boardSize];
  const rows = state.settings.boardSize / cols;
  return `
    <section
      class="game-board"
      id="game-board"
      style="--grid-cols: ${cols}; --grid-rows: ${rows}"
      aria-label="Memory card board"
    >
      ${state.cards.map(renderCard).join("")}
    </section>
  `;
}

/**
 * Returns the full HTML for the Game screen.
 * @returns HTML string
 */
export function renderGame(): string {
  const state = getGameState();
  return `
    <main class="game" data-page="game" data-theme="${state.settings.theme}">
      <header class="game-header">
        ${renderScores(state)}
        ${renderCurrentPlayer(state.currentPlayer, state.settings.theme)}
        ${renderExitButton(state.settings.theme)}
      </header>
      ${renderBoard(state)}
    </main>
  `;
}

/**
 * Flips a card face-up in state and updates its DOM element.
 * @param card - the card to flip up
 */
function flipCardOn(card: Card): void {
  card.isFlipped = true;
  const el = document.querySelector<HTMLButtonElement>(`[data-card-id="${card.id}"]`);
  el?.classList.add("is-flipped");
  el?.setAttribute("aria-pressed", "true");
}

/**
 * Flips two cards face-down in state and updates their DOM elements.
 * @param a - first card
 * @param b - second card
 */
function flipCardsOff(a: Card, b: Card): void {
  [a, b].forEach((card) => {
    card.isFlipped = false;
    const el = document.querySelector<HTMLButtonElement>(`[data-card-id="${card.id}"]`);
    el?.classList.remove("is-flipped");
    el?.setAttribute("aria-pressed", "false");
  });
}

/**
 * Marks both cards as matched and updates their DOM elements.
 * @param a - first card
 * @param b - second card
 */
function markAsMatched(a: Card, b: Card): void {
  [a, b].forEach((card) => {
    card.isMatched = true;
    document.querySelector(`[data-card-id="${card.id}"]`)?.classList.add("is-matched");
  });
}

/**
 * Switches the active player in state.
 */
function switchPlayer(): void {
  const state = getGameState();
  state.currentPlayer = state.currentPlayer === "blue" ? "orange" : "blue";
}

/**
 * Re-renders only the game header to reflect score/player changes.
 */
function refreshHeader(): void {
  const state = getGameState();
  const header = document.querySelector(".game-header");
  if (!header) return;
  header.innerHTML =
    renderScores(state) +
    renderCurrentPlayer(state.currentPlayer, state.settings.theme) +
    renderExitButton(state.settings.theme);
  reattachExitListeners();
}

/**
 * Handles a matched pair: awards points, marks as matched, checks win condition.
 * @param state - current game state
 * @param a - first matched card
 * @param b - second matched card
 */
function handleMatch(state: GameState, a: Card, b: Card): void {
  markAsMatched(a, b);
  state.scores[state.currentPlayer] += SCORE_PER_MATCH;
  state.matchedPairs++;
  state.flippedCards = [];
  state.isLocked = false;
  refreshHeader();
  if (state.matchedPairs === state.totalPairs) navigateTo("game-over");
}

/**
 * Handles a non-matching pair: flips cards back and switches player.
 * @param state - current game state
 * @param a - first card
 * @param b - second card
 */
function handleNoMatch(state: GameState, a: Card, b: Card): void {
  setTimeout(() => {
    flipCardsOff(a, b);
    switchPlayer();
    state.flippedCards = [];
    state.isLocked = false;
    refreshHeader();
  }, MATCH_DELAY_MS);
}

/**
 * Handles the result after two cards have been flipped.
 * @param state - current game state
 * @param a - first flipped card
 * @param b - second flipped card
 */
function handlePairResult(state: GameState, a: Card, b: Card): void {
  if (a.pairId === b.pairId) handleMatch(state, a, b);
  else handleNoMatch(state, a, b);
}

/**
 * Registers a flipped card and triggers pair evaluation when two are flipped.
 * @param state - current game state
 * @param card - the newly flipped card
 */
function resolveFlip(state: GameState, card: Card): void {
  state.flippedCards.push(card);
  if (state.flippedCards.length !== 2) return;
  state.isLocked = true;
  const [a, b] = state.flippedCards;
  if (a && b) handlePairResult(state, a, b);
}

/**
 * Handles a card click: validates the click, flips the card, checks for a pair.
 * @param event - the click event
 */
function handleCardClick(event: Event): void {
  const target = (event.target as HTMLElement).closest<HTMLButtonElement>("[data-card-id]");
  if (!target) return;
  const state = getGameState();
  if (state.isLocked) return;
  const cardId = target.dataset["cardId"] ?? "";
  const card = state.cards.find((c) => c.id === parseInt(cardId));
  if (!card || card.isFlipped || card.isMatched) return;
  flipCardOn(card);
  resolveFlip(state, card);
}

/**
 * Attaches exit dialog button listeners (must be called after each header re-render).
 */
function reattachExitListeners(): void {
  const dialog = document.getElementById("exit-dialog") as HTMLDialogElement | null;
  document.getElementById("btn-exit")
    ?.addEventListener("click", () => dialog?.showModal());
  document.getElementById("btn-back-to-game")
    ?.addEventListener("click", () => dialog?.close());
  document.getElementById("btn-confirm-exit")
    ?.addEventListener("click", () => navigateTo("settings"));
}

/** Gap and padding matching the CSS values for the game board */
const BOARD_GAP_PX = 8;
const BOARD_PADDING_PX = 8;

/**
 * Returns column and row count for the current board size.
 */
function getGridDimensions(): { cols: number; rows: number } {
  const state = getGameState();
  const cols = COLS_FOR_SIZE[state.settings.boardSize];
  return { cols, rows: state.settings.boardSize / cols };
}

/**
 * Shrinks the board width so square cards fill the available height exactly.
 * @param board - the board element
 * @param cols - column count
 * @param rows - row count
 * @param availH - available height in px
 */
function constrainBoardWidth(board: HTMLElement, cols: number, rows: number, availH: number): void {
  const cellH = (availH - BOARD_PADDING_PX * 2 - BOARD_GAP_PX * (rows - 1)) / rows;
  board.style.height = `${availH}px`;
  board.style.width = `${cellH * cols + BOARD_PADDING_PX * 2 + BOARD_GAP_PX * (cols - 1)}px`;
}

/**
 * Sets explicit pixel dimensions on the board so cards are always square
 * with equal spacing, in both portrait and landscape orientation.
 */
function syncBoardHeight(): void {
  const header = document.querySelector<HTMLElement>(".game-header");
  const board = document.getElementById("game-board");
  if (!header || !board) return;
  board.style.width = "";
  const { cols, rows } = getGridDimensions();
  const availH = window.innerHeight - header.offsetHeight;
  const cellW = (board.offsetWidth - BOARD_PADDING_PX * 2 - BOARD_GAP_PX * (cols - 1)) / cols;
  const neededH = cellW * rows + BOARD_PADDING_PX * 2 + BOARD_GAP_PX * (rows - 1);
  if (neededH <= availH) board.style.height = `${neededH}px`;
  else constrainBoardWidth(board, cols, rows, availH);
}

/**
 * Attaches all game page event listeners.
 */
export function initGameEvents(): void {
  document.getElementById("game-board")
    ?.addEventListener("click", handleCardClick);
  reattachExitListeners();
  syncBoardHeight();
  window.addEventListener("resize", syncBoardHeight);
}
