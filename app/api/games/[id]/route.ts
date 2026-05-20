import prisma from "@/lib/prisma";

// fetches game and all associated guesses
export async function GET(
  request: Request,
  { params }: { params: { id: string } },
): Promise<Response> {
  const { id: gameId } = await params;
  const game = await prisma.game.findUnique({
    where: { id: gameId },
    include: { guesses: true },
  });
  return Response.json({ game: game });
}
