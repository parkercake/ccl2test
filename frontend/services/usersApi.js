import { secureFetch } from "./apiService.js";

export const getUsers = async () => {
    const res = await secureFetch("/users");
    return res.ok ? res.json() : [];
};

export const addUser = async (user) => {
    return secureFetch("/users/add", {
        method: "POST",
        body: JSON.stringify(user)
    });
};

export const deleteUser = async (id) => {
    return secureFetch(`/users/${id}`, { method: "DELETE" });
};

export const updateUser = async (id, user) => {
    return secureFetch(`/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(user)
    });
};