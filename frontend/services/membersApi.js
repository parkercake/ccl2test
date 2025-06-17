import { secureFetch } from "./apiService.js";

export const getGroupMembers = async (groupId) => {
    const res = await secureFetch(`/groups/${groupId}/members`);
    return res.ok ? res.json() : [];
};

export const addGroupMember = async (groupId, userId, role = "member") => {
    return secureFetch(`/groups/${groupId}/members`, {
        method: "POST",
        body: JSON.stringify({ userId, role }),
    });
};

export const updateGroupMemberRole = async (groupId, userId, role) => {
    return secureFetch(`/groups/${groupId}/members/${userId}`, {
        method: "PATCH",
        body: JSON.stringify({ role }),
    });
};

export const removeGroupMember = async (groupId, userId) => {
    return secureFetch(`/groups/${groupId}/members/${userId}`, {
        method: "DELETE",
    });
};
