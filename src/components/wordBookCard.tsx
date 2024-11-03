"use client";
import React, { Dispatch, SetStateAction, Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getNextWord } from "@/utils/";
import { Button } from "./ui/button";
import { WORD } from "@/types";
import { Annoyed, Check, Eye, EyeOff, Laugh, Shuffle } from "lucide-react";
import { Status, Type } from "@/types/enums";
import { updateStatus } from "@/lib/api";
import LoadingIcon from "./LoadingIcon";

interface WordBookCardProps {
  currentWord: WORD;
  showMeaning: boolean;
  setShowMeaning: (showMeaning: boolean) => void;
  words: WORD[];
  setCurrentWord: (currentWord: WORD) => void;
  setWords: Dispatch<SetStateAction<WORD[]>>;
  setIsFlipping: (isFlipping: boolean) => void;
  setError: (error: string) => void;
}

/*
 * 英訳または和訳を表示する
 */
const toggleMeaning = (
  showMeaning: boolean,
  setShowMeaning: (showMeaning: boolean) => void
) => {
  setShowMeaning(!showMeaning);
};

const WordBookCard: React.FC<WordBookCardProps> = ({
  currentWord,
  showMeaning,
  setShowMeaning,
  words,
  setCurrentWord,
  setWords,
  setIsFlipping,
  setError,
}) => {
  return (
    <Suspense fallback={<LoadingIcon />}>
      <Card className="mb-6 relative max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto p-4 sm:p-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between text-sm sm:text-base md:text-lg mb-4">
            <span>
              {words.findIndex((word) => word.id === currentWord.id) + 1}/
              {words.length}
            </span>
            {currentWord.status === Status.NotStarted ? (
              <Annoyed className="mr-2 h-4 w-4" />
            ) : (
              <Laugh className="mr-2 h-4 w-4" />
            )}
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-center">
            {currentWord.type === Type.EnglishTranslation
              ? currentWord.meaning
              : currentWord.word}
          </h2>
          {showMeaning && (
            <>
              <div className="text-sm sm:text-base md:text-lg space-y-2 mb-4">
                <p className="text-lg mb-2">
                  <strong>訳:</strong>{" "}
                  {currentWord.type === Type.EnglishTranslation
                    ? currentWord.word
                    : currentWord.meaning}
                </p>
                <p className="text-lg italic">
                  <strong>例文:</strong> {currentWord.example}
                </p>
              </div>
            </>
          )}
          <div className="flex flex-wrap justify-center space-x-2 sm:space-x-4 mt-4 sm:mt-6">
            <Button
              onClick={() => toggleMeaning(showMeaning, setShowMeaning)}
              className="flex items-center w-full sm:w-auto mb-2 sm:mb-0"
            >
              {showMeaning ? (
                <EyeOff className="mr-2 h-4 w-4" />
              ) : (
                <Eye className="mr-2 h-4 w-4" />
              )}
              {showMeaning ? "訳を隠す" : "訳を表示"}
            </Button>
            <Button
              onClick={() =>
                updateStatus(
                  currentWord,
                  setWords,
                  setIsFlipping,
                  words,
                  setCurrentWord,
                  setShowMeaning,
                  setError
                )
              }
            >
              <Check className="mr-2 h-4 w-4" /> 覚えた！
            </Button>
            {words.findIndex((word) => word.id === currentWord.id) <
              words.length - 1 && (
              <Button
                onClick={() =>
                  getNextWord(
                    words,
                    currentWord,
                    setCurrentWord,
                    setShowMeaning
                  )
                }
              >
                <Shuffle className="mr-2 h-4 w-4" /> 次の単語
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </Suspense>
  );
};

export default WordBookCard;
