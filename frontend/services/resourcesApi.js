import {secureFetch} from "./apiService.js";

export const getResources = async (groupId) => {
    const res = await secureFetch(`/groups/${groupId}/resources`);
    return res.ok ? res.json() : [];
};

export const addResource = async (groupId, resource) => {
    const formData = new FormData();
    formData.append("file", resource.file);
    formData.append("name", resource.name);

    return secureFetch(`/groups/${groupId}/resources`, {
        method: "POST",
        body: formData,
        // ✅ Do NOT set headers — secureFetch adds auth, and FormData sets its own content-type
    });
};


export const deleteResource = async (groupId, resourceId) => {
    return secureFetch(`/groups/${groupId}/resources/${resourceId}`, {
        method: "DELETE"
    });
};