import React, { useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import { useLanguage } from "../../context/LanguageContext.js";
import TodoDetailModal from "./todoDetailModal.js";
import { mdCalendarToday, mdCalendarMont } from "react-icons/md";
import { CalendarEventModal } from "./calendarEventModal.js";
import { getCalendarStatus, getCalendarStatus, createCalendarEvent, updateCalendarEvent, deleteCalendarEvent, getCalendaraAuthUrl } from "../../services/conection.js";



const KanbanCard = ({ todo, prev, next, onMove, onEdit, onDelete, onTodoUpdate }) => {
  const { t } = useLanguage();
  const [showDetail, setShowDetail] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarMode, setCalendarMode] = useState("add");

  const handleCalendarClick = async () => {
    const { connected } = await getCalendarStatus();
    if (!connected) {
      const { url } = await getCalendaraAuthUrl();
      window.location.href = url;
      return;
    }
    setCalendarMode(todo.calendarSynced ? "edit" : "add");
    setShowCalendar(true);
  };

  const handleCalendarSubmit = async (startDateTime, endDateTime) => {
    if (calendarMode === "edit") {
      await updateCalendarEvent(todo.id, startDateTime, endDateTime)
    } else {
      await createCalendarEvent(todo.id, startDateTime, endDateTime)
      onTodoUpdate(todo.id, { calendarSynced: true });
    }
  };

  const handleCalendarDelete = async () => {
    await deleteCalendarEvent(todo.id);
    onTodoUpdate(todo.id, { calendarSynced: false, CalendarEventId: null });
  };

  const renderCalendarAction = () => {
    if (todo.status === "done") return null;
    if (todo.status === "pending") {
      if (!todo.calendarSynced) {
        return (
          <button className="kanban-card__calendar-btn" onClick={handleCalendarClick}>
            <mdCalendarToday size={14} /> {t("calendar.addEvent")}
          </button>
        );
      }
      return (
        <div className="kanban-card__calendar-synced">
          <button className="kanban-card__calendar-btn kanban-card__calendar-btn--synced" onClick={handleCalendarClick} >
            <mdCalendarMont size={14} /> {t("calendar.editEvent")}
          </button>
          <button className="kanban-card__calendar-btn kanban-card__calendar-btn--remove" onClick={handleCalendarDelete} >
            🗑️
          </button>
          </div>
      );
    }
    if (todo.status === "doing") {
      if (!todo.calendarSynced) return null;
      return (
        <div className="kanban-card__calendar-synced">
          <button className="kanban-card__calendar-btn kanban-card__calendar-btn--synced" onClick={handleCalendarClick} >
            <mdCalendarMont size={14} /> {t("calendar.editEvent")}
          </button>
          <button className="kanban-card__calendar-btn kanban-card__calendar-btn--remove" onClick={handleCalendarDelete} >
            🗑️
          </button>
          </div>
      );
    }
  };

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
              {t(`todo.${prev}`)} ❮❮❮❮
            </button>
          )}
          {next && (
            <button
              className="kanban-card__btn kanban-card__btn--next"
              onClick={() => onMove(todo.id, next)}
            > 
              {t(`todo.${next}`)} ❯❯❯❯
            </button>
          )}
        </div>
        <div className="kanban-card__calendar">
          {renderCalendarAction()}
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
      {showCalendar &&(
        <CalendarEventModal
        todo={todo}
        mode={calendarMode}
        onClose={()=>setShowCalendar(false)}
        onSubmit={handleCalendarSubmit}
        />
      )}
    </>
  );
}
export default KanbanCard;