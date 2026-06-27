import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext.js";

const CalendarEventModal = ({ todo, mode, onClose, onSubmit }) => {
    const { t } = useLanguage();
    const now = new Date();
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
    
    const toLocalISO = (date) => {
        const offset = date.getTimezoneOffset()*60000;
        return new Date(date - offset).toISOString().slice(0 ,16);
    };
    const [startDateTime, setStartDateTime] = useState(
        todo.calendarStart ? toLocalISO(new Date(todo.calendarStart)): toLocalISO(now)
    );
    const [endDateTime, setEndDateTime] = useState(
        todo.calendarEnd ? toLocalISO(new Date(todo.calendarEnd)): toLocalISO(oneHourLater)
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setError();
        if(new Date(endDateTime) <= new Date(startDateTime)) {
            setError(t("calendar.endBeforeStart"));
            return;
        }
        setLoading(true);
        try{
            await onSubmit(startDateTime, endDateTime);
            onClose();
        }catch {
            setError(t("calendar.error"));
        }
        finally{
            setLoading(false);
        }
    }

return (
    <div className = "modal-overlay" onClick={onClose}>
        <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-card__header">
            <h2>
                { mode === "edit" ? t("calendar.editEvent") : t("calendar.addEvent")}
            </h2>
            <button className="modal-card__close" onClick={onClose}>X</button>
        </div>
        <p className="todo-detail__description">{t("todo.title")}</p>
        <form className="modal-card__form" onSubmit={handleSubmit}>
            <label>{t("calendar.start")}</label>
            <input className="auth-input"
            type="datetime-local"
            value={startDateTime}
            onChange={(e) => setStartDateTime(e.target.value)}
            disabled={loading}
            />
            <label>{t("calendar.end")}</label>
            <input className="auth-input"
            type="datetime-local"
            value={endDateTime}
            onChange={(e) => setEndDateTime(e.target.value)}
            disabled={loading}
            />
            {error && (
            <p style={{color: "var(--danger-a0)", fontSize: "0.85rem"}}>
            {error}
            </p>
        )}
        <div className="modal-card__footer">
            <button
            type="button"
            className="kanban-logout-btn"
            onClick={onClose}>
                {t("todo.cancel")}
            </button>
            <button 
            type="submit"
            className="auth-button"
            disabled={loading}
            >
                {loading ? "..." : mode === "edit" ? t("calendar.save") : t("calendar.add")}
            </button>
            </div>
            </form>
        </div>
    </div>
    )
};
export default CalendarEventModal;