/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState, useEffect } from "react";
import { MAX_ATTEMPTS, WORD_LENGTH } from "../../lib/constants";
import { TARGET_WORD } from "../../lib/words";
import { Grid } from "./Grid";
import { Keyboard } from "./Keyboard";
import { useCallback } from "react";
import { LetterResult } from "../../lib/types";
import {
  checkGuess,
  isValidGuess,
  getLetterStatuses,
} from "../../lib/gameLogic";

interface GameBoardProps {
  gameId: string;
  targetWord: string;
  initialGuesses: string[];
}

export function GameBoard({
  gameId,
  targetWord,
  initialGuesses,
}: GameBoardProps) {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">(
    "playing",
  );

  const guessResults: LetterResult[][] = guesses.map((guess) =>
    checkGuess(guess, TARGET_WORD),
  );

  const letterStatuses = getLetterStatuses(guessResults, guesses);

  const handleKey = useCallback(
    (key: string) => {
      if (/^[a-zA-Z]$/.test(key) && currentGuess.length < 5)
        setCurrentGuess((curr) => curr + key.toUpperCase());
      else if (key === "backspace")
        setCurrentGuess((curr) => curr.slice(0, -1));
      else if (key === "enter") {
        if (isValidGuess(currentGuess, guesses.length)) {
          const letterRes = checkGuess(currentGuess, TARGET_WORD);

          setGuesses((g) => [...g, currentGuess]);
          setCurrentGuess("");

          if (letterRes.every((l) => l === "correct")) setGameStatus("won");
          else if (guesses.length + 1 === MAX_ATTEMPTS) setGameStatus("lost");
        }
      }
    },
    [currentGuess, guesses.length],
  );

  function handleReset(): void {
    setCurrentGuess("");
    setGuesses([]);
    setGameStatus("playing");
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent): void {
      const key = event.key.toLowerCase();
      handleKey(key);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKey]);

  return (
    <div className="flex flex-col items-center">
      <Grid
        guesses={guesses}
        guessResults={guessResults}
        currentGuess={currentGuess}
      />
      <Keyboard onKey={handleKey} letterStatuses={letterStatuses} />
      {gameStatus === "won" && ( // conditionally rendered
        <p>You won!</p>
      )}
      {gameStatus === "lost" && <p>The word was {TARGET_WORD}</p>}
      {gameStatus !== "playing" && (
        <button onClick={handleReset}>Play Again</button>
      )}
    </div>
  );
}
