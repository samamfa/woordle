import { checkGuess } from "../lib/gameLogic";
import { LetterResult, STATUS_STYLES } from "../lib/types";

interface TileProps {
  letter: string;
  letterResult: LetterResult;
}

interface GridProps {
  guesses: string[];
  guessResults: LetterResult[][]; // Array of guessed words
  currentGuess: string; // Current word being typed
}

function Tile({ letter, letterResult }: TileProps) {
  return (
    <div
      className={`w-14 h-14 flex items-center justify-center border rounded font-bold text-2xl uppercase ${STATUS_STYLES[letterResult]}`}
    >
      {letter}
    </div>
  );
}

export function Grid({ guesses, guessResults, currentGuess }: GridProps) {
  const rows = Array.from({ length: 6 }, (_, rowIdx) => {
    if (rowIdx < guesses.length) {
      return {
        letters: guesses[rowIdx].split(""),
        results: guessResults[rowIdx],
      };
    } else if (rowIdx === guesses.length) {
      return { letters: currentGuess.split(""), results: null };
    } else {
      return { letters: [], results: null };
    }
  });

  return (
    <div className="grid grid-rows-6 gap-1">
      {rows.map((row, rowIdx) => (
        <div key={rowIdx} className="grid grid-cols-5 gap-1">
          {Array.from({ length: 5 }, (_, colIdx) => {
            const letter = row.letters[colIdx] ?? "";
            const status = row.results
              ? row.results[colIdx]
              : letter
                ? "typing"
                : "empty";
            return <Tile key={colIdx} letter={letter} letterResult={status} />;
          })}
        </div>
      ))}
    </div>
  );
}
