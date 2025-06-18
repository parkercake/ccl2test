import { secureFetch } from "./apiService.js";
// const BASE_URL = " http://localhost:3000";
const BASE_URL = "https://cc241066-10723.node.fhstp.cc/api";

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

export const addEventToUser = (userId, event) =>
    fetch(`${BASE_URL}/events/users/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event)
    });

export const updateEvent = async (eventId, event) => {
    return secureFetch(`/events/${eventId}`, {
        method: "PATCH",
        body: JSON.stringify(event)
    });
};

export const deleteEvent = async (eventId) => {
    return secureFetch(`/events/${eventId}`, { method: "DELETE" });
};