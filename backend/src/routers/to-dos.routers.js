import express from "express";
import { Todo } from "../models/Todo.js";
import { validator } from "../middlewares/validator.js";
import { authMiddleware, isValidId } from "../middlewares/auth.js";
 
export const TodosRouter = express.Router();

/* C.R.U.D. */

//GET
TodosRouter.get("/to-dos", authMiddleware, async function (request, response) {
  try {
    const todos = await Todo.find({ userId: request.user.id });
    response.send({ todos });
  } catch (error) {
    response.status(500).send({
      message: "Something went wrong trying to get todos",
      error,
    });
  }
});

//POST
TodosRouter.post("/to-dos", authMiddleware, validator,  async function (request, response) {
      try {

        const { title, description, status } = request.body;
        const todo = new Todo({
          title, 
          description,  
          status: status || "pending",   
          userId: request.user.id,
        });
        const savedTodo = await todo.save();
            response.status(201).send({ id: savedTodo.id });
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
TodosRouter.patch("/to-dos/:id", authMiddleware, async function (request, response) {
  const { id } = request.params;
  if (!isValidId(id)) {
    return response.status(400).send({ message: "Invalid todo ID" });
  }
  try {
    
    const todo = await Todo.findOne({_id: id, userId: request.user.id });
    if (!todo) {
      return response.status(404).send({ message: "Todo not found" });
    }
    const { title, description, status } = request.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      {
        title: title ?? todo.title,
        description: description ?? todo.description,
        status: status ?? todo.status
      },
      { returnDocument: 'after'}
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
TodosRouter.delete("/to-dos/:id", authMiddleware, async function (request, response) {
   const { id } = request.params;
  if (!isValidId(id)) {
    return response.status(400).send({ message: "Invalid todo ID" });
  }
  try {
      const todo = await Todo.findOne({ _id: id, userId: request.user.id });

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