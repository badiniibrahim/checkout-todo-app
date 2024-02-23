"use server";

import Todo from "../database/models/todo.model";
import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";

export const createTodo = async (userId: string, todo: CreateTodoParams) => {
  try {
    await connectToDatabase();

    const author = await User.findById(userId);
    console.log({ author });

    if (!author) {
      throw new Error("User not found");
    }
    const newTodo = await Todo.create({ ...todo, author: userId });
    return JSON.parse(JSON.stringify(newTodo));
  } catch (error) {
    handleError(error);
  }
};
