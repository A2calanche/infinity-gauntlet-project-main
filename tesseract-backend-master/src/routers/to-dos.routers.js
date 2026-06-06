import express from "express";
import { Todo } from "../models/Todo.js";
import { validator } from "../middlewares/validator.js";
import { authMiddleware } from "../middlewares/auth.js";
 
export const TodosRouter = express.Router();

/* C.R.U.D. */

//CREATE
TodosRouter.get("/to-dos",authMiddleware, async function (request, response) {
    try {
      const todos = await Todo.find();  
      response.send({ todos });  
     } catch (error) {
    response.status(500).send({
      message: "Something went wrong trying to get todos",
      error,
    });
  }
});

//READ
TodosRouter.post("/to-do", validator, authMiddleware, async function (request, response) {
      try {

        const { title, description, is_done, status } = request.body;
        const todo = new Todo({title, description,  is_done: is_done || false, status: status || "pending"});
        const savedTodo = await todo.save();
            response.status(201).send({ id: savedTodo._id });
              }
      catch (error) {
        console.error(error);
        response.status(500).send({
          message: "Something went wrong trying to create a todo",
          error,
        });
      }
    })

//UPDATE
TodosRouter.patch("/to-do/:id", authMiddleware, async function (request, response) {
  try {
    const { id } = request.params;

    const todo = await Todo.findById(id);

    if (!todo) {
      return response.status(404).send({ message: "Todo not found" });
    }

    const { title, description, is_done, status } = request.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      {
        title: title || todo.title,
        description: description || todo.description,
        is_done: is_done !== undefined ? is_done : todo.is_done,
        status: status || todo.status,
      },
      { new: true }
    );

    response.send({ message: "Todo updated", todo: updatedTodo });
  } catch (error) {
    response.status(500).send({
      message: "Something went wrong trying to update the todo",
      error,
    });
  }
});

//DELETE
TodosRouter.delete("/to-do/:id", authMiddleware, async function (request, response) {
  try {
    const { id } = request.params;

    const todo = await Todo.findById(id);

    if (!todo) {
      return response.status(404).send({ message: "Todo not found" });
    }

    await Todo.findByIdAndDelete(id);

    response.send({ message: "Todo deleted successfully" });
  } catch (error) {
    response.status(500).send({
      message: "Something went wrong trying to delete the todo",
      error,
    });
  }
});