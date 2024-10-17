"use client";
import { useEffect, useState } from "react";
import { WORD } from "../types/index";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Plus, Shuffle } from "lucide-react";

export default function Home() {
  const [words, setWords] = useState<WORD[]>([]);
  const [currentWord, setCurrentWord] = useState<WORD | null>(null);
  const [newWord, setNewWord] = useState("");
  const [newMeaning, setNewMeaning] = useState("");
  const [newExample, setNewExample] = useState("");
  const [showMeaning, setShowMeaning] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchWords = async () => {
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

    fetchWords();
  }, []);

  // TODO 単語を追加する機能を実装
  const addWord = async () => {};

  const toggleMeaning = () => {
    setShowMeaning(!showMeaning);
  };

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setCurrentWord(words[randomIndex]);
    setShowMeaning(false);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">
        英語単語ランダム学習
      </h1>

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
            <Button onClick={addWord} className="w-full">
              <Plus className="mr-2 h-4 w-4" /> 単語を追加
            </Button>
          </div>
        </CardContent>
      </Card>

      {currentWord && (
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">
              {currentWord.word}
            </h2>
            {showMeaning && (
              <>
                <p className="text-lg mb-2">
                  <strong>意味:</strong> {currentWord.meaning}
                </p>
                <p className="text-lg italic">
                  <strong>例文:</strong> {currentWord.example}
                </p>
              </>
            )}
            <div className="flex justify-center space-x-4 mt-6">
              <Button onClick={toggleMeaning}>
                {showMeaning ? (
                  <EyeOff className="mr-2 h-4 w-4" />
                ) : (
                  <Eye className="mr-2 h-4 w-4" />
                )}
                {showMeaning ? "意味を隠す" : "意味を表示"}
              </Button>
              <Button onClick={getRandomWord}>
                <Shuffle className="mr-2 h-4 w-4" /> 次の単語
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {words.length === 0 && (
        <p className="text-center text-gray-600">単語を追加してください。</p>
      )}
    </div>
  );
}
