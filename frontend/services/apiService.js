const BASE_URL = 'http://localhost:3000';

const getAuthHeaders = () => {
    const token = localStorage.getItem('authToken');
    console.log("Current token:", token);
    return {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    };
};

export const login = async (email, password) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    if (!response.ok) throw new Error('Login failed');

    const result = await response.json();

    localStorage.setItem('authToken', result.accessToken);
    localStorage.setItem('refreshToken', result.refreshToken);

    return result.user;
};

const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error("No refresh token");

    const response = await fetch(`${BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken })
    });

    if (!response.ok) throw new Error("Refresh failed");

    const data = await response.json();
    localStorage.setItem('authToken', data.accessToken);
};

const secureFetch = async (url, options = {}) => {
    let response = await fetch(url, {
        ...options,
        headers: { ...getAuthHeaders(), ...(options.headers || {}) }
    });

    if (response.status === 401) {
        try {
            await refreshAccessToken();

            response = await fetch(url, {
                ...options,
                headers: { ...getAuthHeaders(), ...(options.headers || {}) }
            });
        } catch (err) {
            throw new Error('unauthorized');
        }
    }

    return response;
};

export const getUsers = async () => {
    const response = await secureFetch(`${BASE_URL}/users`);
    if (!response.ok) throw new Error('Failed to fetch users');
    return await response.json();
};

export const addUser = async (user) => {
    const response = await secureFetch(`${BASE_URL}/users/add`, {
        method: 'POST',
        body: JSON.stringify(user)
    });
    if (!response.ok) throw new Error('Failed to add user');
};

export const updateUser = async (id, userData) => {
    const response = await secureFetch(`http://localhost:3000/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(userData)
    });
    if (!response.ok) throw new Error('Failed to update user');
};

export const deleteUser = async (id) => {
    const response = await secureFetch(`${BASE_URL}/users/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete user');
};