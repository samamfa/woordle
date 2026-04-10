/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState, useEffect } from "react";
import { MAX_ATTEMPTS, WORD_LENGTH } from "../lib/constants";
import { checkGuess, isValidGuess } from "../lib/gameLogic";
import { TARGET_WORD } from "../lib/words";
// import

function GameBoard() {
  const [guess, setGuess] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">(
    "playing",
  );
  const [usedLetters, setUsedLetters] = useState<Set<string>>(new Set());

  function handleKey(key: string): void {
    if (/^[a-zA-Z]$/.test(key) && currentGuess.length < 5)
      setCurrentGuess((curr) => curr + key.toUpperCase());
    else if (key === "backspace") setCurrentGuess((curr) => curr.slice(0, -1));
    else if (key === "enter" && currentGuess.length === WORD_LENGTH) {
      if (isValidGuess(currentGuess)) {
        const letterRes = checkGuess(currentGuess, TARGET_WORD);

        setGuess((g) => [...g, currentGuess]);
        setUsedLetters((prevSet) => new Set([...prevSet, ...currentGuess]));

        if (letterRes.every((l) => l === "correct")) setGameStatus("won");
        else if (guess.length === MAX_ATTEMPTS) {
          setGameStatus("lost");
          setCurrentGuess("");
        }
      }
    }
  }

  function handleReset(): void {
    setCurrentGuess("");
    setGuess([]);
    setGameStatus("playing");
    setUsedLetters(new Set());
  }

  function handleKeyDown(event: KeyboardEvent): void {
    const key = event.key.toLowerCase();
    handleKey(key);
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKey]);
}
