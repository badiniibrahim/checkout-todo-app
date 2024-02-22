import { Document, Schema, model, models } from "mongoose";

const TodoSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Image = models?.Image || model("Todo", TodoSchema);

export default Image;
