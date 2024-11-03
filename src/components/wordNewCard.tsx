"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { Input } from "./ui/input";
import { addWord } from "@/lib/api";
import { WORD } from "@/types";

interface WordNewCardProps {
  setWords: (words: WORD[]) => void;
  setCurrentWord: (currentWord: WORD) => void;
  setError: (error: string) => void;
}

const WordNewCard: React.FC<WordNewCardProps> = ({
  setWords,
  setCurrentWord,
  setError,
}) => {
  const [newWord, setNewWord] = useState<string>("");
  const [newMeaning, setNewMeaning] = useState<string>("");
  const [newExample, setNewExample] = useState<string>("");
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>新しい単語を追加</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Input
            placeholder="単語"
            value={newWord}
            onChange={(e) => setNewWord(e.target.value)}
          />
          <Input
            placeholder="意味"
            value={newMeaning}
            onChange={(e) => setNewMeaning(e.target.value)}
          />
          <Input
            placeholder="例文"
            value={newExample}
            onChange={(e) => setNewExample(e.target.value)}
          />
          <Button
            onClick={() =>
              addWord(
                newWord,
                newMeaning,
                newExample,
                setWords,
                setCurrentWord,
                setError
              )
            }
            className="w-full"
          >
            <Plus className="mr-2 h-4 w-4" /> 単語を追加
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WordNewCard;
