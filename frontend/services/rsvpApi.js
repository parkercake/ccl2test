import { secureFetch } from "./apiService.js";

export const rsvpToEvent = async (eventId, status) => {
    return secureFetch(`/events/${eventId}/rsvp`, {
        method: "PATCH",
        body: JSON.stringify({ status })
    });
};

export const getUserRSVPs = async (userId) => {
    const res = await secureFetch(`/users/${userId}/events`);
    return res.ok ? res.json() : [];
};