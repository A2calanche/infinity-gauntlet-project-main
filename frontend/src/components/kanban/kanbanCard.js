import React, { useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import { useLanguage } from "../../context/LanguageContext.js";
import  TodoDetailModal  from "./todoDetailModal.js";

const KanbanCard = ({ todo, prev, next, onMove, onEdit, onDelete }) => {
  const { t } = useLanguage();
  const [showDetail, setShowDetail] = useState(false);

  return (
    <>
    <div className="kanban-card">
      <div className="kanban-card__header">
        <h3
          className="kanban-card__title"
          onClick={() => setShowDetail(true)}
        >
          {todo.title}
        </h3>
        <div className="kanban-card__icons">
          <TiEdit
            onClick={() => onEdit(todo)}
            className="kanban-icon kanban-icon--edit"
          />
          <RiCloseCircleLine
            onClick={() => onDelete(todo.id)}
            className="kanban-icon kanban-icon--delete"
          />
        </div>
      </div>

      <div className="kanban-card__actions">
          {prev && (
            <button
              className="kanban-card__btn kanban-card__btn--prev"
              onClick={() => onMove(todo.id, prev)}
            >
               {t(`todo.${prev}`)}
            </button>
          )}
          {next && (
            <button
              className="kanban-card__btn kanban-card__btn--next"
              onClick={() => onMove(todo.id, next)}
            >
              {t(`todo.${next}`)} 
            </button>
          )}
        </div>
      </div>

      {showDetail && (
        <TodoDetailModal
          todo={todo}
          onClose={() => setShowDetail(false)}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    </>
  );
};

export default KanbanCard;