import { WORD_LENGTH } from "./constants";
import { TARGET_WORD, VALID_WORDS } from "./words";

function checkGuess(guess: string, target: string): string[] {
  // two pass solution
  const s = new Set<number>();
  const res = Array(5).fill("");

  // first loop: check all letters in correct position
  for (let i: number = 0; i < 5; i++) {
    if (target[i] === guess[i]) {
      res[i] = "correct";
      s.add(i);
    }
  }

  // second loop: find letters in the wrong position
  for (let i: number = 0; i < 5; i++) {
    if (res[i]) continue;

    const ch = guess[i];
    let idx = -1;
    for (let j: number = 0; j < 5; j++) {
      if (!s.has(j) && target[j] === ch) {
        idx = j;
        break;
      }
    }

    if (idx !== -1) res[idx] = "present";
    else res[idx] = "absent";
  }

  return res;
}

function isValidGuess(guess: string): boolean {
  const idx = VALID_WORDS.indexOf(guess);
  return idx !== -1 && guess.length === WORD_LENGTH;
}
