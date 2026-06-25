import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { llamarLista, createTodo, actualizar, eliminar } from "../services/conection";
import KanbanBoard from "./kanban/kanbanBoard";
import TodoModal from "./kanban/todoModal";

//Crear To Do list
const TodoList = ({ onLogout }) => {
  const { t } = useLanguage();
  const [todos, setTodos]         = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editTodo, setEditTodo]   = useState(null);

  useEffect(() => {
  llamarLista().then((data) => {
    if (data && data.todos) {
      setTodos(data.todos.map((t) => ({ ...t, id: t._id || t.id })));
    }
  });
}, []);
//Añadir elementos al To Do List
  const addTodo = async (todo) => {
    const saved = await createTodo(todo);
    const newTodo = { ...todo, id: saved.id };
    setTodos((prev) => [newTodo, ...prev]);
    setShowModal(false);
  };

  //Actualizar elementos del To Do List
  const updateTodo = async (id, updated) => {
    await actualizar(id, updated);
    setTodos((prev) => prev.map((t) => t.id === id ? { ...t, ...updated } : t));
    setEditTodo(null);
  };

  const moveStatus = async (id, newStatus) => {
    await actualizar(id, { status: newStatus });
    setTodos((prev) => prev.map((t) => t.id === id ? { ...t, status: newStatus } : t));
  };

  //Eliminar elementos del To Do List
  const removeTodo = async (id) => {
    await eliminar(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const pending = todos.filter((t) => t.status === "pending");
  const doing   = todos.filter((t) => t.status === "doing");
  const done    = todos.filter((t) => t.status === "done");

  return (
    <div className="kanban-wrapper">
      <div className="kanban-header">
        <h1>{t("todo.title")}</h1>
        <div className="kanban-header__actions">
          <button className="kanban-add-btn" onClick={() => setShowModal(true)}>
            + {t("todo.add")}
          </button>
          <button className="kanban-logout-btn" onClick={onLogout}>
            {t("todo.logout")}
          </button>
        </div>
      </div>

      <KanbanBoard
        pending={pending}
        doing={doing}
        done={done}
        onMove={moveStatus}
        onEdit={(todo) => setEditTodo(todo)}
        onDelete={removeTodo}
      />

      {(showModal || editTodo) && (
        <TodoModal
          todo={editTodo}
          onSubmit={editTodo
            ? (data) => updateTodo(editTodo.id, data)
            : addTodo
          }
          onClose={() => {
            setShowModal(false);
            setEditTodo(null);
          }}
        />
      )}
    </div>
  );
};

export default TodoList;