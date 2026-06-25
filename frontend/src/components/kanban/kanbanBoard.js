import React from "react";
import KanbanColumn  from "./kanbanColumn";
import { useLanguage } from "../../context/LanguageContext.js";

const KanbanBoard = ({ pending, doing, done, onMove, onEdit, onDelete }) => {
  const { t } = useLanguage();

  const columns = [
    {
      id: "pending",
      label: t("todo.pending"),
      todos: pending,
      prev: null,
      next: "doing",
    },
    {
      id: "doing",
      label: t("todo.doing"),
      todos: doing,
      prev: "pending",
      next: "done",
    },
    {
      id: "done",
      label: t("todo.done"),
      todos: done,
      prev: "doing",
      next: null,
    },
  ];

  return (
    <div className="kanban-board">
      {columns.map((col) => (
        <KanbanColumn
          key={col.id}
          label={col.label}
          todos={col.todos}
          prev={col.prev}
          next={col.next}
          onMove={onMove}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;