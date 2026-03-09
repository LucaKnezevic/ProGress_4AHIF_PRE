import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const numId = Number(id);

  const existing = await prisma.mealEntry.findUnique({ where: { id: numId } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.mealEntry.delete({ where: { id: numId } });
  return new NextResponse(null, { status: 204 });
}
