const ROWS = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["Enter", "z", "x", "c", "v", "b", "n", "m", "Backspace"],
];

interface KeyboardProps {
  onKey: (key: string) => void;
  usedLetters: Set<string>;
}

interface KeyProps {
  value: string;
  used: boolean;
  wide: boolean;
  onKey: (key: string) => void;
}

function Key({ value, used, wide, onKey }: KeyProps) {
  return (
    <button
      className={`uppercase ${wide ? "w-14" : "w-8"} ${used ? "bg-gray-600 text-white" : "bg-white text-black"}`}
    >
      {value}
    </button>
  );
}

function Keyboard({ onKey, usedLetters }: KeyboardProps) {
  return (
    <div className="p1">
      {ROWS.map((row, rowIdx) => (
        <div key={rowIdx} className="flex justify-center mb-1">
          {row.map((letter, letterIdx) => {
            const isWide = letter === "Enter" || letter === "Backspace";
            const isUsed = usedLetters.has(letter) && !isWide;
            return (
              <Key
                key={letterIdx}
                value={letter}
                used={isUsed}
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
