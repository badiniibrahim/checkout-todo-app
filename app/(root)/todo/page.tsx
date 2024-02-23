import AddTodoForm from "@/components/shared/AddTodoForm";
import Header from "@/components/shared/Header";
import React from "react";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Todo = async () => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);

  return (
    <div>
      <Header title={"Todo"} subtitle={""} />
      <AddTodoForm userId={user._id} creditBalance={user.creditBalance} />
    </div>
  );
};

export default Todo;
