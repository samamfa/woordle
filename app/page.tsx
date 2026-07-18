import { GameBoard } from "./components/GameBoard";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

type GamePageProps = {
  params: { id: string };
};

export default async function GamePage({ params }: GamePageProps) {
  const game = await prisma.game.findUnique({
    where: { id: params.id },
    include: { guesses: true },
  });

  if (!game) {
    notFound();
  }

  return (
    <GameBoard
      gameId={game.id}
      targetWord={game.word}
      initialGuesses={game.guesses.map((guess) => guess.word)}
    />
  );
}
