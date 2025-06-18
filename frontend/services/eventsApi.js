import { secureFetch } from "./apiService.js";

export const getEvents = async (groupId) => {
    const res = await secureFetch(`/groups/${groupId}/events`);
    return res.ok ? res.json() : [];
};

export const getEventsFromUser = async (userId) => {
    const res = await secureFetch(`/users/${userId}/events`);
    return res.ok ? res.json() : [];
}

export const addEventToGroup = async (groupId, event) => {
    return secureFetch(`/groups/${groupId}/events`, {
        method: "POST",
        body: JSON.stringify(event)
    });
};

export const addEventToUser = async (userId, event) => {
    return secureFetch(`/events/users/${userId}`, {
        method: "POST",
        body: JSON.stringify(event)
    });
};

export const updateEvent = async (eventId, event) => {
    return secureFetch(`/events/${eventId}`, {
        method: "PATCH",
        body: JSON.stringify(event)
    });
};

export const deleteEvent = async (eventId) => {
    return secureFetch(`/events/${eventId}`, { method: "DELETE" });
};