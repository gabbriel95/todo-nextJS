export const dynamic = "force-dynamic";
export const revalidate = 0;

import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";
//import { useEffect } from "react";

export const metadata = {
  title: "Listado de todos",
  description: "SEO title",
};

export default async function ServerTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } });

  /*useEffect(() => {
    fetch("/api/todos")
      .then((resp) => resp.json())
      .then(console.log);
  }, []);*/

  return (
    <>
      <span className="text-3xl mb-10">Server Actions</span>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </>
  );
}
