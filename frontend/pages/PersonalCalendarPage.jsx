import { useEffect, useState } from "react";
import dayjs from "dayjs";
import * as api from "../services/eventsApi"; // Replace with your actual API file
import { useUser } from "../src/context/UserContext"; // adjust path if needed

export default function PersonalCalendarPage() {
    const [events, setEvents] = useState([]);
    const [form, setForm] = useState({ name: "", start: "", end: "" });
    const [currentMonth, setCurrentMonth] = useState(dayjs());
    const [selectedDate, setSelectedDate] = useState(null);
    const [editingEvent, setEditingEvent] = useState(null);
    const { user } = useUser();
    useEffect(() => {
        api.getEventsFromUser().then(setEvents);
    }, []);

    const handleAdd = async () => {
        if (!form.name || !form.start || !form.end) return;

        if (editingEvent) {
            await api.updateEvent(editingEvent.id, form);
            setEditingEvent(null);
        } else {
            console.log("userId being sent:", user.id);
            await api.addEventToUser(user.id, form);
        }

        setForm({ name: "", start: "", end: "" });
        const updated = await api.getEventsFromUser();
        setEvents(updated);
    };

    const handleDelete = async (eventId) => {
        await api.deleteEvent(eventId);
        const updated = await api.getEventsFromUser();
        setEvents(updated);
        setSelectedDate(null);
    };

    const handleEdit = (event) => {
        setEditingEvent(event);
        setForm({
            name: event.name,
            start: dayjs(event.start).format("YYYY-MM-DDTHH:mm"),
            end: dayjs(event.end).format("YYYY-MM-DDTHH:mm"),
        });
        setSelectedDate(null);
    };

    const daysInMonth = currentMonth.daysInMonth();
    const firstDayOfMonth = currentMonth.startOf("month").day();
    const calendarDays = Array.from({ length: firstDayOfMonth + daysInMonth }).map((_, i) => {
        const day = i - firstDayOfMonth + 1;
        return day > 0 ? currentMonth.date(day) : null;
    });

    return (
        <div className="dashboard-content">
            <h3 className="section-title">My Calendar</h3>

            <div className="calendar-header">
                <div className="calendar-nav">
                    <button className="calendar-nav-btn" onClick={() => setCurrentMonth(currentMonth.subtract(1, 'month'))}>←</button>
                    <div className="calendar-month">{currentMonth.format("MMMM YYYY")}</div>
                    <button className="calendar-nav-btn" onClick={() => setCurrentMonth(currentMonth.add(1, 'month'))}>→</button>
                </div>
            </div>

            <div className="calendar-grid">
                <table className="calendar-table">
                    <thead>
                    <tr>
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                            <th key={day}>{day}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {Array.from({ length: Math.ceil(calendarDays.length / 7) }).map((_, weekIndex) => (
                        <tr key={weekIndex}>
                            {calendarDays.slice(weekIndex * 7, weekIndex * 7 + 7).map((date, i) => (
                                <td key={i} onClick={() => date && setSelectedDate(date)}>
                                    {date && (
                                        <div>
                                            <div className="calendar-date">{date.date()}</div>
                                            {events.some(e => dayjs(e.start).isSame(date, "day")) && (
                                                <div className="calendar-dot"></div>
                                            )}
                                        </div>
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="calendar-actions">
                <input
                    className="form-control"
                    placeholder="Event name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                />
                <input
                    type="datetime-local"
                    className="form-control"
                    value={form.start}
                    onChange={e => setForm({ ...form, start: e.target.value })}
                />
                <input
                    type="datetime-local"
                    className="form-control"
                    value={form.end}
                    onChange={e => setForm({ ...form, end: e.target.value })}
                />
                <button className="calendar-action-btn" onClick={handleAdd}>
                    {editingEvent ? "Update" : "Add"}
                </button>
            </div>

            {selectedDate && (
                <div className="calendar-overlay">
                    <div className="calendar-overlay-content">
                        <h4>Events on {selectedDate.format("MMMM D, YYYY")}</h4>
                        <ul>
                            {events.filter(e => dayjs(e.start).isSame(selectedDate, "day")).map(e => (
                                <li key={e.id}>
                                    <strong>{e.name}</strong> (
                                    {dayjs(e.start).format("HH:mm")} – {dayjs(e.end).format("HH:mm")})
                                    <div>
                                        <button onClick={() => handleEdit(e)}>Edit</button>
                                        <button onClick={() => handleDelete(e.id)}>Delete</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <button onClick={() => setSelectedDate(null)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}