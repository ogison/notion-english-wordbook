import { WORD } from "@/types";

/*
 * 次の単語を取得
 */
export const getNextWord = (
  words: WORD[],
  currentWord: WORD,
  setCurrentWord: (currentWord: WORD) => void,
  setShowMeaning: (showMeaning: boolean) => void
) => {
  const currentIndex = words.findIndex((word) => word.id === currentWord.id);
  const nextIndex = (currentIndex + 1) % words.length;
  setCurrentWord(words[nextIndex]);
  setShowMeaning(false);
};
