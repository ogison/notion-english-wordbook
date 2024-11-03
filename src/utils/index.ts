import { WORD } from "@/types";

export const getRandomWord = (
  words: WORD[],
  setCurrentWord: (currentWord: WORD) => void,
  setShowMeaning: (showMeaning: boolean) => void
) => {
  const randomIndex = Math.floor(Math.random() * words.length);
  setCurrentWord(words[randomIndex]);
  setShowMeaning(false);
};
