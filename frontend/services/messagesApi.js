import { secureFetch } from "./apiService.js";

export const getMessages = async (groupId) => {
    const res = await secureFetch(`/groups/${groupId}/messages`);
    return res.ok ? res.json() : [];
};

export const sendApiMessage = async (groupId, content) => {
    return secureFetch(`/groups/${groupId}/messages`, {
        method: "POST",
        body: JSON.stringify({ content })
    });
};