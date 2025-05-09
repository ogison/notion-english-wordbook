"use client";
import { useEffect, useState } from "react";
import { WORD } from "../types/index";
import styles from "@/styles/Home.module.css";
import WordNewCard from "@/components/wordNewCard";
import { fetchWords } from "@/lib/api";
import WordBookCard from "@/components/wordBookCard";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

export default function Home() {
  const [words, setWords] = useState<WORD[]>([]);
  const [currentWord, setCurrentWord] = useState<WORD | null>(null);
  const [showMeaning, setShowMeaning] = useState<boolean>(false);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  useEffect(() => {
    fetchWords(setWords, setCurrentWord, setError);
  }, []);

  const handleNotionConnect = async () => {
    setIsConnecting(true);
    try {
      const response = await fetch("/api/notion/auth");
      const { authUrl } = await response.json();
      window.location.href = authUrl;
    } catch {
      setError("Notion連携に失敗しました");
      setIsConnecting(false);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8 lg:p-10 max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-4xl">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 text-center">
        英語単語ランダム学習
      </h1>

      <div className="text-center mb-8">
        <Button
          onClick={handleNotionConnect}
          disabled={isConnecting}
          className="inline-flex items-center"
        >
          <LogIn className="mr-2 h-4 w-4" />
          Notionと連携する
        </Button>
      </div>

      <WordNewCard
        setWords={setWords}
        setCurrentWord={setCurrentWord}
        setError={setError}
      />

      {currentWord && (
        <div
          className={`${styles.perspective} ${
            isFlipping ? styles["animate-flip"] : ""
          }`}
        >
          <WordBookCard
            currentWord={currentWord}
            showMeaning={showMeaning}
            setShowMeaning={setShowMeaning}
            words={words}
            setCurrentWord={setCurrentWord}
            setWords={setWords}
            setIsFlipping={setIsFlipping}
            setError={setError}
          />
        </div>
      )}

      {words.length === 0 && (
        <p className="text-center text-gray-600 text-sm sm:text-base md:text-lg">
          単語を追加してください。
        </p>
      )}
    </div>
  );
}
