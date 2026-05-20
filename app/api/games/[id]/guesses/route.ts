import prisma from "@/lib/prisma";
import { checkGuess, isValidGuess } from "@/lib/gameLogic";

// Validates the incoming guess and saves it to the DB
export async function POST(
  request: Request,
  { params }: { params: { id: string } },
): Promise<Response> {
  const { id: gameId } = await params;

  // check game exists
  const game = await prisma.game.findUnique({
    where: { id: gameId },
    include: { guesses: true },
  });
  if (!game) {
    return Response.json({ error: "Game not found" }, { status: 404 });
  }

  // validate guess
  const { word } = await request.json();
  if (isValidGuess(word, game?.guesses.length || 8)) {
  }

  // run checkGuess on word
  await prisma.guess.create({ data: { gameId: gameId, word } });
  const res = checkGuess(word, game.word);

  return Response.json({ result: res, guess: word });
}
