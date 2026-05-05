import { TARGET_WORD } from "../lib/words";
import { LetterResult, STATUS_STYLES } from "../lib/types";
import { getLetterStatuses } from "../lib/gameLogic";
const ROWS = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["enter", "z", "x", "c", "v", "b", "n", "m", "backspace"],
];

interface KeyboardProps {
  onKey: (key: string) => void;
  letterStatuses: Map<string, LetterResult>;
}

interface KeyProps {
  value: string;
  result: LetterResult;
  wide: boolean;
  onKey: (key: string) => void;
}

function Key({ value, result, wide, onKey }: KeyProps) {
  return (
    <button
      onClick={() => onKey(value.toLowerCase())}
      className={`uppercase ${wide ? "w-14" : "w-8"} ${STATUS_STYLES[result]}`}
    >
      {value}
    </button>
  );
}

export function Keyboard({ onKey, letterStatuses }: KeyboardProps) {
  return (
    <div className="p-1">
      {ROWS.map((row, rowIdx) => (
        <div key={rowIdx} className="flex justify-center mb-1">
          {row.map((letter, letterIdx) => {
            const isWide = letter === "enter" || letter === "backspace";
            const isUsed: LetterResult =
              letterStatuses.get(letter.toUpperCase()) || "unused";

            return (
              <Key
                key={letterIdx}
                value={letter}
                result={isUsed}
                wide={isWide}
                onKey={onKey}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
