import prisma from "../prisma";

export async function getGameById(
  id: string,
  select: { word?: boolean; createdAt?: boolean; guesses?: boolean },
) {
  const game = await prisma.game.findUnique({
    where: { id: id },
    select: { id: true, ...select },
  });
  return game;
}
