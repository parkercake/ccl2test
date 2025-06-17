import { useState } from "react";
import * as api from "../services/apiService";

function RSVPPage({ eventId = 1 }) {
    const [status, setStatus] = useState("attending");

    const handleRSVP = async () => {
        await api.rsvpToEvent(eventId, status);
        alert("RSVP submitted!");
    };

    return (
        <div>
            <h2>RSVP for Event {eventId}</h2>
            <select value={status} onChange={e => setStatus(e.target.value)}>
                <option value="attending">Attending</option>
                <option value="maybe">Maybe</option>
                <option value="not_attending">Not Attending</option>
            </select>
            <button onClick={handleRSVP}>Submit RSVP</button>
        </div>
    );
}

export default RSVPPage;