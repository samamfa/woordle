import { getGameById } from "@/lib/db/games";
import { notFound } from "next/navigation";
import { GameBoard } from "@/app/components/GameBoard";
import { TARGET_WORD } from "@/lib/words";

export default async function GamePage({ params }: { params: { id: string } }) {
  const game = await getGameById(params.id, {
    word: false,
    createdAt: true,
    guesses: true,
  });
  if (!game) notFound(); // built in helper to render 404 page

  return (
    <GameBoard
      gameId={params.id}
      targetWord={TARGET_WORD}
      initialGuesses={game.guesses.map((guess) => guess.word)}
    />
  );
}
