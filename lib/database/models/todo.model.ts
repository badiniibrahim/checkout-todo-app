import { Schema, model, models } from "mongoose";

const TodoSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Todo = models?.Todo || model("Todo", TodoSchema);

export default Todo;
