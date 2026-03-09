import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  const entries = await prisma.mealEntry.findMany({
    where: date ? { date } : undefined,
    orderBy: { id: "asc" },
  });
  return NextResponse.json(entries);
}

export async function POST(req: Request) {
  const body = await req.json();
  const entry = await prisma.mealEntry.create({
    data: {
      date: body.date,
      meal: body.meal,
      name: body.name,
      kcal: Number(body.kcal),
      protein: Number(body.protein ?? 0),
      carbs: Number(body.carbs ?? 0),
      fat: Number(body.fat ?? 0),
    },
  });
  return NextResponse.json(entry, { status: 201 });
}
