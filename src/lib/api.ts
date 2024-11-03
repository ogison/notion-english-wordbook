import { NEWWORD, WORD } from "@/types";
import { Status } from "@/types/enums";
import { getNextWord } from "@/utils";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";

/*
 * 単語帳一覧を取得
 */
export const fetchWords = async (
  setWords: (words: WORD[]) => void,
  setCurrentWord: (currentWord: WORD) => void,
  setError: (error: string) => void
) => {
  try {
    const response = await axios.get("/api/notion-words");
    const data = await response.data;
    const shuffledData = data.sort(() => Math.random() - 0.5);
    setWords(shuffledData);
    setCurrentWord(shuffledData[0]);
  } catch (error) {
    setError("Failed to load words");
    console.error(error);
  }
};

/*
 * 単語帳を追加
 */
export const addWord = async (
  form: NEWWORD,
  setWords: (words: WORD[]) => void,
  setCurrentWord: (currentWord: WORD) => void,
  setError: (error: string) => void
) => {
  const param = {
    word: form.word,
    meaning: form.meaning,
    example: form.example,
  };
  try {
    await axios.post("/api/add-word", param);
    await fetchWords(setWords, setCurrentWord, setError);
  } catch (error) {
    console.error("Failed to add word", error);
    throw error;
  }
};

/*
 * 覚えた単語帳のステータスを更新する
 */
export const updateStatus = async (
  currentWord: WORD,
  setWords: Dispatch<SetStateAction<WORD[]>>,
  setIsFlipping: (isFlipping: boolean) => void,
  words: WORD[],
  setCurrentWord: (currentWord: WORD) => void,
  setShowMeaning: (showMeaning: boolean) => void,
  setError: (error: string) => void
) => {
  let nextStatus = Status.InProgress;
  if (currentWord.status === Status.InProgress) {
    nextStatus = Status.Done;
  }
  const param = {
    id: currentWord.id,
    status: nextStatus,
  };

  try {
    await axios.post("/api/update-status", param);
    await setWords((prevWords) =>
      prevWords.map((word) =>
        word.id === currentWord.id
          ? {
              ...word,
              status: nextStatus,
            }
          : word
      )
    );
    setIsFlipping(true);
    setTimeout(() => {
      setIsFlipping(false);
      if (
        words.findIndex((word) => word.id === currentWord.id) <
        words.length - 1
      ) {
        getNextWord(words, currentWord, setCurrentWord, setShowMeaning);
      } else {
        fetchWords(setWords, setCurrentWord, setError);
      }
    }, 700);
  } catch (error) {
    setError("Failed to update status");
    console.error(error);
  }
};
