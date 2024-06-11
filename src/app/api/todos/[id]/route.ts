import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

interface Segments {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: Segments) {
  const todo = await prisma.todo.findUnique({ where: { id: params.id } });

  if (!todo) {
    return NextResponse.json(
      { message: "No existe un Todo con ese ID" },
      { status: 404 }
    );
  }

  return NextResponse.json(todo);
}

export async function PUT(request: Request, { params }: Segments) {
  const todo = await prisma.todo.findUnique({ where: { id: params.id } });

  if (!todo) {
    return NextResponse.json(
      { message: "No existe un Todo con ese ID" },
      { status: 404 }
    );
  }

  const body = await request.json();

  const updatedTodo = await prisma.todo.update({
    where: { id: params.id },
    data: body,
  });

  return NextResponse.json(updatedTodo);
}
