import React, { useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import { useEffect } from "react";
import {llamarLista, createTodo, actualizar, eliminar, } from "./conection";

//Crear To Do list
function TodoList() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    llamarLista()
 //   console.log(todos);
  }, [todos]);

  //Añadir elementos al To Do List
  const addTodo = async  (todo) => {
   
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return ;
    }
    const todoId = await createTodo(todo);
    todo.id = todoId.id;
 //   console.log(todo)
    const newTodos = [todo, ...todos];

    setTodos(newTodos);
    console.log(...todos);
  };

  //Mostrat la descripción
  const showDescription = (todoId) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        todo.showDescription = !todo.showDescription;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  //Actualizar Elementos en el To Do List
  const updateTodo = (todoId, newValue) => {
   
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    newValue.id = todoId;
  setTodos((prev) =>
    prev.map((item) => (item.id === todoId ? newValue : item))
  );
    actualizar(todoId,newValue)
      console.log(newValue)
  };

//Marcar como "Done"
const completeTodo = (id) => {

  let updatedTodos = todos.map((todo) => {
    if (todo.id === id) {
      todo.is_done = !todo.is_done;
    }
    actualizar(id,todo)
    return todo;
    
  });
  setTodos(updatedTodos);

  console.log(todos)
};
  //Eliminar Elementos del To Do List
  const removeTodo = (id) => {
    eliminar(id);
    const removedArr = [...todos].filter((todo) => todo.id !== id);

    setTodos(removedArr);
  };
  
  return (
    <>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        showDescription={showDescription}
      />
    </>
  );
}

export default TodoList;
