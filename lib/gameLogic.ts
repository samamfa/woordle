/* eslint-disable @typescript-eslint/no-unused-vars */
import { WORD_LENGTH } from "./constants";
import { TARGET_WORD, VALID_WORDS } from "./words";
import { LetterResult } from "./types";

export function checkGuess(guess: string, target: string): LetterResult[] {
  // Two pass solution
  const WORD_LENGTH = 5;
  const result: LetterResult[] = Array(WORD_LENGTH).fill("absent");

  // Track remaining available letters in target
  const availableLetters: Map<string, number> = new Map();
  for (const letter of target) {
    availableLetters.set(letter, (availableLetters.get(letter) || 0) + 1);
  }

  // First pass: Mark correct positions
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guess[i] === target[i]) {
      result[i] = "correct";
      availableLetters.set(guess[i], availableLetters.get(guess[i])! - 1);
    }
  }

  // Second pass: Mark present letters
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (result[i] === "correct") continue;

    const letter = guess[i];
    const remaining = availableLetters.get(letter) || 0;

    if (remaining > 0) {
      result[i] = "present";
      availableLetters.set(letter, remaining - 1);
    }
  }

  return result;
}

export function getLetterStatuses(
  guessResults: LetterResult[][],
  guesses: string[],
): Map<string, LetterResult> {
  const map = new Map<string, LetterResult>();
  for (const [i, guess] of guesses.entries()) {
    const result = guessResults[i];
    for (const [j, letter] of guess.split("").entries()) {
      const status = result[j];
      const current = map.get(letter);

      // Only upgrade, never downgrade
      if (
        !current ||
        status === "correct" ||
        (status === "present" && current !== "correct")
      ) {
        map.set(letter, status);
      }
    }
  }
  return map;
}

export function isValidGuess(guess: string): boolean {
  return guess.length === WORD_LENGTH && VALID_WORDS.includes(guess);
}
