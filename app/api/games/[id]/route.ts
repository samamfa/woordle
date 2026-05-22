import { getGameById } from "@/lib/db/games";

// fetch game and all associated guesses
export async function GET(
  request: Request,
  { params }: { params: { id: string } },
): Promise<Response> {
  const { id: gameId } = await params;
  const game = await getGameById(gameId, {
    word: false,
    createdAt: true,
    guesses: true,
  });
  return Response.json({ game: game });
}
