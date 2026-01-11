export type ThemeId = "noir" | "paper" | "arcade" | "studio";

export const THEME_LABELS: Record<ThemeId, string> = {
  noir: "Noir",
  paper: "Paper",
  arcade: "Arcade",
  studio: "Studio",
};

export const THEME_ORDER: ThemeId[] = ["noir", "paper", "arcade", "studio"];

export const THEME_STORAGE_KEY = "quizler-theme";
