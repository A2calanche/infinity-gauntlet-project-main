import React, { useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import { useEffect } from "react";
import {llamarLista, createTodo, actualizar, eliminar, } from "../locales/conection";

//Crear To Do list
function TodoList({ onLogout }) {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    llamarLista().then((data) => {
    if (data && data.todos) setTodos(data.todos);
  });
}, []);
  
  //Añadir elementos al To Do List
  const addTodo = async  (todo) => {
   
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return ;
    }
    const todoId = await createTodo(todo);
    todo.id = todoId.id || todoId._id;
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
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h1>What's the Plan for Today?</h1>
      <button
        onClick={onLogout}
        style={{
          background: "transparent",
          border: "1px solid var(--danger-a0)",
          borderRadius: "8px",
          padding: "6px 14px",
          color: "var(--danger-a0)",
          cursor: "pointer",
          fontSize: "13px",
        }}
      >
        Logout
      </button>
    </div>
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
