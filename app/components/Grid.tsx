import { checkGuess } from "../lib/gameLogic";

interface TileProps {
  letter: string;
  status: "correct" | "present" | "absent" | "tbd" | "empty";
}

interface GridProps {
  guesses: string[]; // Array of guessed words
  currentGuess: string; // Current word being typed
  targetWord: string; // The word to guess
}

const statusStyles = {
  correct: "bg-green-600 text-white border-green-600",
  present: "bg-yellow-500 text-white border-yellow-500",
  absent: "bg-gray-600 text-white border-gray-600",
  tbd: "border-gray-400 text-black dark:text-white",
  empty: "border-gray-300 dark:border-gray-700",
};

function Tile({ letter, status }: TileProps) {
  return (
    <div
      className={`w-14 h-14 flex items-center justify-center border rounded font-bold text-2xl uppercase ${statusStyles[status]}`}
    >
      {letter}
    </div>
  );
}

function Grid({ guesses, currentGuess, targetWord }: GridProps) {
  const rows = Array.from({ length: 6 }, (_, rowIdx) => {
    if (rowIdx < guesses.length) {
      const res = checkGuess(guesses[rowIdx], targetWord);
      return { letters: guesses[rowIdx].split(""), results: res };
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
            const status = row.results ? row.results[colIdx] : "empty";
            return <Tile key={colIdx} letter={letter} status={status} />;
          })}
        </div>
      ))}
    </div>
  );
}
