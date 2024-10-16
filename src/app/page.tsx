"use client";
import { useEffect, useState } from "react";
import { WORD } from "../types/index";
import axios from "axios";

export default function Home() {
  const [words, setWords] = useState<WORD[]>([]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await axios.get("/api/notion-words");
        const data = await response.data;
        setWords(data);
      } catch (error) {
        setError("Failed to load words");
        console.error(error);
      }
    };

    fetchWords();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>英語の単語帳</h1>
      <ul>
        {words.map((word) => (
          <li key={word.id}>
            <h2>{word.word}</h2>
            <p>意味: {word.meaning}</p>
            <p>例文: {word.example}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
