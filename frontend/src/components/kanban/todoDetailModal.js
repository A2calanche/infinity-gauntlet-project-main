import React from "react";
import { useLanguage } from "../../context/LanguageContext";

const statusColors = {
  pending: "var(--warning-a0)",
  doing:   "var(--info-a0)",
  done:    "var(--success-a0)",
};

const TodoDetailModal = ({ todo, onClose, onEdit, onDelete }) => {
  const { t } = useLanguage();

  const createdAt = new Date(todo.createdAt).toLocaleDateString(undefined, {
    year:  "numeric",
    month: "long",
    day:   "numeric",
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card todo-detail" onClick={(e) => e.stopPropagation()}>

        <div className="modal-card__header">
          <h2>{todo.title}</h2>
          <button className="modal-card__close" onClick={onClose}>✕</button>
        </div>

        <span
          className="todo-detail__status"
          style={{ color: statusColors[todo.status] }}
        >
          ● {t(`todo.${todo.status}`)}
        </span>

        <p className="todo-detail__description">{todo.description}</p>

        <p className="todo-detail__date">
          {t("todo.createdAt")} {createdAt}
        </p>

        <div className="todo-detail__actions">
          <button
            className="kanban-logout-btn"
            onClick={() => { onDelete(todo.id); onClose(); }}
          >
            {t("todo.delete")}
          </button>
          <button
            className="auth-button"
            onClick={() => { onEdit(todo); onClose(); }}
          >
            {t("todo.edit")}
          </button>
        </div>

      </div>
    </div>
  );
};

export default TodoDetailModal;