import React from "react";
import KanbanCard from "./kanbanCard";
import { useLanguage } from "../../context/LanguageContext.js";

const KanbanColumn = ({ label, todos, prev, next, onMove, onEdit, onDelete, onTodoUpdate }) => {
  const { t } = useLanguage();

  return (
    <div className="kanban-column">
      <div className="kanban-column__header">
        <h2>{label}</h2>
        <span className="kanban-column__count">{todos.length}</span>
      </div>

      <div className="kanban-column__body">
        {todos.length === 0 ? (
          <p className="kanban-column__empty">{t("todo.empty")}</p>
        ) : (
          todos.map((todo) => (
            <KanbanCard
              key={todo.id}
              todo={todo}
              prev={prev}
              next={next}
              onMove={onMove}
              onEdit={onEdit}
              onDelete={onDelete}
              onTodoUpdate={onTodoUpdate}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;