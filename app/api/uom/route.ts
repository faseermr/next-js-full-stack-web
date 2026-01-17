import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/uom → list all UOMs
export async function GET() {
  const uoms = await prisma.uOM.findMany({
    orderBy: { name: "asc" },
  });

  return NextResponse.json(uoms);
}

// POST /api/uom → create UOM
export async function POST(req: Request) {
  const body = await req.json();

  if (!body.name || !body.code) {
    return NextResponse.json({ error: "name and code are required" }, { status: 400 });
  }

  const uom = await prisma.uOM.create({
    data: {
      name: body.name,
      code: body.code,
    },
  });

  return NextResponse.json(uom, { status: 201 });
}
