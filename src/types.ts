/** Visual theme identifier for the game */
export type Theme = "codevibes" | "foods";

/** Player color identifier */
export type PlayerColor = "blue" | "orange";

/** Number of cards on the board */
export type BoardSize = 16 | 24 | 36;

/** App-level page routing */
export type Page = "home" | "settings" | "game" | "game-over" | "game-winner";

/** User selections captured on the Settings screen */
export interface Settings {
  theme: Theme | null;
  player: PlayerColor | null;
  boardSize: BoardSize | null;
}

/** Represents one card instance on the board */
export interface Card {
  id: number;
  pairId: number;
  imagePath: string;
  isFlipped: boolean;
  isMatched: boolean;
}

/** Scores per player */
export interface Scores {
  blue: number;
  orange: number;
}

/** Settings with all values confirmed non-null — ready to start a game */
export interface CompleteSettings {
  theme: Theme;
  player: PlayerColor;
  boardSize: BoardSize;
}

/** Complete game state — set once when game starts */
export interface GameState {
  settings: CompleteSettings;
  cards: Card[];
  scores: Scores;
  currentPlayer: PlayerColor;
  flippedCards: Card[];
  isLocked: boolean;
  totalPairs: number;
  matchedPairs: number;
}
