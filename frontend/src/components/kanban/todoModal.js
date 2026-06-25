import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

const TodoModal = ({ todo, onSubmit, onClose }) => {
  const { t } = useLanguage();

  const [title, setTitle]             = useState(todo?.title || "");
  const [description, setDescription] = useState(todo?.description || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    onSubmit({ title, description, status: todo?.status || "pending" });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-card__header">
          <h2>{todo ? t("todo.edit") : t("todo.new")}</h2>
          <button className="modal-card__close" onClick={onClose}>✕</button>
        </div>

        <form className="modal-card__form" onSubmit={handleSubmit}>
          <label>{t("todo.titleLabel")}</label>
          <input
            className="auth-input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t("todo.placeholder")}
            autoFocus
          />

          <label>{t("todo.descriptionLabel")}</label>
          <textarea
            className="auth-input modal-card__textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t("todo.descriptionPlaceholder")}
            rows={4}
          />

          <div className="modal-card__footer">
            <button
              type="button"
              className="kanban-logout-btn"
              onClick={onClose}
            >
              {t("todo.cancel")}
            </button>
            <button
              type="submit"
              className="auth-button"
              disabled={!title.trim() || !description.trim()}
            >
              {todo ? t("todo.save") : t("todo.add")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoModal;