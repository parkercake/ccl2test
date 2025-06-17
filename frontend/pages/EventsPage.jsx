import { useEffect, useState } from "react";
import * as api from "../services/eventsApi";

function EventsPage({ groupId = 1 }) {
    const [events, setEvents] = useState([]);
    const [name, setName] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");

    const fetchEvents = async () => {
        const data = await api.getEvents(groupId);
        setEvents(data || []);
    };

    const addEvent = async () => {
        await api.addEvent(groupId, { name, start, end });
        setName(""); setStart(""); setEnd("");
        await fetchEvents();
    };

    useEffect(() => { fetchEvents(); }, [groupId]);

    return (
        <div>
            <h2>Events for Group {groupId}</h2>
            <input placeholder="Event name" value={name} onChange={e => setName(e.target.value)} />
            <input type="datetime-local" value={start} onChange={e => setStart(e.target.value)} />
            <input type="datetime-local" value={end} onChange={e => setEnd(e.target.value)} />
            <button onClick={addEvent}>Add</button>

            <ul>
                {events.map(ev => (
                    <li key={ev.id}>
                        {ev.name} ({ev.start} → {ev.end})
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EventsPage;
