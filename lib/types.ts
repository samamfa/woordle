export type LetterResult =
  | "correct"
  | "present"
  | "absent"
  | "unused"
  | "typing"
  | "empty";
export const STATUS_STYLES: Record<LetterResult, string> = {
  correct: "bg-green-600 text-white border-green-600",
  present: "bg-yellow-500 text-white border-yellow-500",
  absent: "bg-gray-600 text-white border-gray-600",
  unused: "border-gray-400 text-black dark:text-white",
  typing: "bg-transparent text-white",
  empty: "",
};
