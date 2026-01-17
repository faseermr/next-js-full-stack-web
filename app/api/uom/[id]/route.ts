import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/uom/:id
export async function GET(_req: Request, context: { params: Promise<{ id: string }> }) {
  const params = await context.params; // ✅ unwrap the promise
  const id = params.id;

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const uom = await prisma.uOM.findUnique({
    where: { id },
  });

  if (!uom) {
    return NextResponse.json({ error: "UOM not found" }, { status: 404 });
  }

  return NextResponse.json(uom);
}

// PUT /api/uom/:id → update UOM
export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  const params = await context.params; // ✅ unwrap the promise
  const id = params.id;
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  const body = await req.json();
  const { name, code } = body;

  if (!name && !code) {
    return NextResponse.json({ error: "name or code required" }, { status: 400 });
  }

  const uom = await prisma.uOM.update({
    where: { id },
    data: { name, code },
  });

  return NextResponse.json(uom);
}

// DELETE /api/uom/:id → delete UOM
export async function DELETE(_req: Request, context: { params: Promise<{ id: string }> }) {
  const params = await context.params; // ✅ unwrap the promise
  const id = params.id;
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  await prisma.uOM.delete({ where: { id } });
  return NextResponse.json({ message: "UOM deleted" });
}
