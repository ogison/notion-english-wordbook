import { WORD } from "@/types";
import { Status } from "@/types/enums";
import { getRandomWord } from "@/utils";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";

export const fetchWords = async (
  setWords: (words: WORD[]) => void,
  setCurrentWord: (currentWord: WORD) => void,
  setError: (error: string) => void
) => {
  try {
    const response = await axios.get("/api/notion-words");
    const data = await response.data;
    setWords(data);
    setCurrentWord(data[0]);
  } catch (error) {
    setError("Failed to load words");
    console.error(error);
  }
};

export const addWord = async (
  word: string,
  meaning: string,
  example: string,
  setWords: (words: WORD[]) => void,
  setCurrentWord: (currentWord: WORD) => void,
  setError: (error: string) => void
) => {
  const param = {
    word,
    meaning,
    example,
  };
  try {
    await axios.post("/api/add-word", param);
    await fetchWords(setWords, setCurrentWord, setError);
  } catch (error) {
    console.error("Failed to add word", error);
    throw error;
  }
};

/**
 * 覚えた単語のステータスを更新する
 */
export const updateStatus = async (
  id: string,
  status: string,
  setWords: Dispatch<SetStateAction<WORD[]>>,
  setIsFlipping: (isFlipping: boolean) => void,
  words: WORD[],
  setCurrentWord: (currentWord: WORD) => void,
  setShowMeaning: (showMeaning: boolean) => void,
  setError: (error: string) => void
) => {
  let nextStatus = Status.InProgress;
  if (status === Status.InProgress) {
    nextStatus = Status.Done;
  }
  const param = {
    id: id,
    status: nextStatus,
  };

  try {
    await axios.post("/api/update-status", param);
    await setWords((prevWords) =>
      prevWords.map((word) =>
        word.id === id
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
      getRandomWord(words, setCurrentWord, setShowMeaning);
    }, 700);
  } catch (error) {
    setError("Failed to update status");
    console.error(error);
  }
};
