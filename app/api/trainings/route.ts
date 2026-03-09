import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const entries = await prisma.trainingEntry.findMany({
    orderBy: { date: "desc" },
  });
  return NextResponse.json(entries);
}

export async function POST(req: Request) {
  const body = await req.json();
  const entry = await prisma.trainingEntry.create({
    data: {
      date: body.date,
      exercise: body.exercise,
      sets: Number(body.sets),
      reps: Number(body.reps),
      weightKg: Number(body.weightKg),
    },
  });
  return NextResponse.json(entry, { status: 201 });
}
