import { useEffect, useState } from "react";
import { getEvents, addEvent } from "../services/eventsApi";
import { useParams } from "react-router-dom";

export default function GroupCalendarPage() {
    const { groupId } = useParams();
    const [events, setEvents] = useState([]);
    const [form, setForm] = useState({ name: "", start: "", end: "" });

    useEffect(() => {
        getEvents(groupId).then(setEvents);
    }, [groupId]);

    const handleAdd = async () => {
        await addEvent(groupId, form);
        setForm({ name: "", start: "", end: "" });
        getEvents(groupId).then(setEvents);
    };

    return (
        <div>
            <h3>Calendar</h3>
            <ul>
                {events.map(e => (
                    <li key={e.id}>{e.name} ({e.start} - {e.end})</li>
                ))}
            </ul>
            <input placeholder="Event name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <input type="datetime-local" value={form.start} onChange={e => setForm({ ...form, start: e.target.value })} />
            <input type="datetime-local" value={form.end} onChange={e => setForm({ ...form, end: e.target.value })} />
            <button onClick={handleAdd}>Add Event</button>
        </div>
    );
}