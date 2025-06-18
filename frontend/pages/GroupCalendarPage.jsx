import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvents, addEventToGroup } from "../services/eventsApi";
import dayjs from "dayjs";

export default function GroupCalendarPage() {
    const { groupId } = useParams();
    const [events, setEvents] = useState([]);
    const [form, setForm] = useState({ name: "", start: "", end: "" });
    const [currentMonth, setCurrentMonth] = useState(dayjs());

    useEffect(() => {
        getEvents(groupId).then(setEvents);
    }, [groupId]);

    const handleAdd = async () => {
        await addEventToGroup(groupId, form);
        setForm({ name: "", start: "", end: "" });
        getEvents(groupId).then(setEvents);
    };

    const daysInMonth = currentMonth.daysInMonth();
    const firstDayOfMonth = currentMonth.startOf("month").day(); // 0 = Sun

    const calendarDays = Array.from({ length: firstDayOfMonth + daysInMonth }).map((_, index) => {
        const day = index - firstDayOfMonth + 1;
        return day > 0 ? currentMonth.date(day) : null;
    });

    return (
        <div className="dashboard-content">
            <h3 className="section-title">Group Calendar</h3>

            {/* Navigation */}
            <div className="calendar-header">
                <div className="calendar-nav">
                    <button className="calendar-nav-btn" onClick={() => setCurrentMonth(currentMonth.subtract(1, 'month'))}>←</button>
                    <div className="calendar-month">{currentMonth.format("MMMM YYYY")}</div>
                    <button className="calendar-nav-btn" onClick={() => setCurrentMonth(currentMonth.add(1, 'month'))}>→</button>
                </div>
            </div>

            {/* Calendar Grid */}
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
                                <td key={i}>
                                    {date && (
                                        <div>
                                            <div className="calendar-date">{date.date()}</div>
                                            {events.filter(e => dayjs(e.start).isSame(date, "day")).map(e => (
                                                <div key={e.id} className="event-item">{e.name}</div>
                                            ))}
                                        </div>
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Add Event Form */}
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
                <button className="calendar-action-btn" onClick={handleAdd}>Add</button>
            </div>
        </div>
    );
}
