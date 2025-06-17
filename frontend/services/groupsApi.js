import { secureFetch } from "./apiService.js";

export const getGroups = async () => {
    const res = await secureFetch("/groups");
    return res.ok ? res.json() : [];
};

export const addGroup = async (group) => {
    return secureFetch("/groups", {
        method: "POST",
        body: JSON.stringify(group)
    });
};

export const deleteGroup = async (id) => {
    return secureFetch(`/groups/${id}`, { method: "DELETE" });
};