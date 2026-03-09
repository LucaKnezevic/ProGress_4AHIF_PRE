import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const numId = Number(id);
  const body = await req.json();

  const existing = await prisma.trainingEntry.findUnique({ where: { id: numId } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const updated = await prisma.trainingEntry.update({
    where: { id: numId },
    data: {
      date: body.date,
      exercise: body.exercise,
      sets: Number(body.sets),
      reps: Number(body.reps),
      weightKg: Number(body.weightKg),
    },
  });
  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const numId = Number(id);

  const existing = await prisma.trainingEntry.findUnique({ where: { id: numId } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.trainingEntry.delete({ where: { id: numId } });
  return new NextResponse(null, { status: 204 });
}
