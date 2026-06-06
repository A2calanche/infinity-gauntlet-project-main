import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    is_done: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["pending", "doing", "done"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export const Todo = mongoose.model("Todo", todoSchema);