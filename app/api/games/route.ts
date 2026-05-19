import prisma from "@/lib/prisma";
import { TARGET_WORD } from "@/lib/words";

export async function POST(request: Request): Promise<Response> {
  try {
    const newGame = await prisma.game.create({ data: { word: TARGET_WORD } });
    return Response.json({ id: newGame.id });
  } catch {
    return Response.json({ error: "Post failed" }, { status: 500 });
  }
}
