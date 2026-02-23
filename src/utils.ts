import type { Theme, BoardSize, Card } from "./types";

/** SVG file names for the Code Vibes theme (18 images) */
const CODEVIBES_IMAGES: readonly string[] = [
  "angular", "bootstrape", "css", "dj", "firebase", "git",
  "github", "html5", "js", "node", "phyton", "react",
  "sass", "scl", "terminal", "ts", "vs", "vector",
];

/** SVG file names for the Foods theme (18 images) */
const FOODS_IMAGES: readonly string[] = [
  "brezen", "burger", "chicken", "chocolat", "doener", "donat",
  "hotdog", "ice", "kuchen", "macaros", "muffin", "pizza",
  "pommes", "pudding", "salat", "sandwitch", "shushi", "dürum",
];

/** Number of unique image pairs required per board size */
const PAIRS_BY_SIZE: Record<BoardSize, number> = { 16: 8, 24: 12, 36: 18 };

/**
 * Returns image paths for the selected theme, sliced to the required pair count.
 * @param theme - selected game theme
 * @param boardSize - selected board size
 * @returns array of image path strings
 */
export function getImages(theme: Theme, boardSize: BoardSize): string[] {
  const names = theme === "codevibes" ? CODEVIBES_IMAGES : FOODS_IMAGES;
  const folder = theme === "codevibes" ? "codevibes_theme/back" : "foods_theme/back";
  const count = PAIRS_BY_SIZE[boardSize];
  return names
    .slice(0, count)
    .map((n) => `/assets/img/${folder}/${n}.svg`);
}

/**
 * Shuffles an array randomly and returns it.
 * @param array - the array to shuffle
 * @returns the shuffled array
 */
export function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Builds the full card deck: each image appears twice (one pair),
 * cards get unique IDs, then the whole deck is shuffled.
 * @param imagePaths - one path per pair
 * @returns shuffled Card array ready to play
 */
export function buildCardDeck(imagePaths: string[]): Card[] {
  const paired: Card[] = imagePaths.flatMap((path, pairId) => [
    { id: pairId * 2,     pairId, imagePath: path, isFlipped: false, isMatched: false },
    { id: pairId * 2 + 1, pairId, imagePath: path, isFlipped: false, isMatched: false },
  ]);
  return shuffle(paired);
}

/**
 * Checks whether all three settings have been selected.
 * @param s - current Settings object
 * @returns true if theme, player, and boardSize are all non-null
 */
export function isSettingsComplete(
  s: { theme: unknown; player: unknown; boardSize: unknown }
): boolean {
  return s.theme !== null && s.player !== null && s.boardSize !== null;
}
