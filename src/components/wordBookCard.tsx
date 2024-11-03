"use client";
import React, { Dispatch, SetStateAction } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getRandomWord } from "@/utils/";
import { Button } from "./ui/button";
import { WORD } from "@/types";
import { Check, Eye, EyeOff, Shuffle } from "lucide-react";
import { Type } from "@/types/enums";
import { updateStatus } from "@/lib/api";

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
    <Card className="mb-6">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {currentWord.type === Type.EnglishTranslation
            ? currentWord.meaning
            : currentWord.word}
        </h2>
        {showMeaning && (
          <>
            <p className="text-lg mb-2">
              <strong>意味:</strong>{" "}
              {currentWord.type === Type.EnglishTranslation
                ? currentWord.word
                : currentWord.meaning}
            </p>
            <p className="text-lg italic">
              <strong>例文:</strong> {currentWord.example}
            </p>
          </>
        )}
        <div className="flex justify-center space-x-4 mt-6">
          <Button onClick={() => toggleMeaning(showMeaning, setShowMeaning)}>
            {showMeaning ? (
              <EyeOff className="mr-2 h-4 w-4" />
            ) : (
              <Eye className="mr-2 h-4 w-4" />
            )}
            {showMeaning ? "意味を隠す" : "意味を表示"}
          </Button>
          <Button
            onClick={() =>
              updateStatus(
                currentWord.id,
                currentWord.status,
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
          <Button
            onClick={() => getRandomWord(words, setCurrentWord, setShowMeaning)}
          >
            <Shuffle className="mr-2 h-4 w-4" /> 次の単語
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WordBookCard;
