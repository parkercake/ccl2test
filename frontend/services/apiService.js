const BASE_URL = 'http://localhost:3000';

export const login = async (email, password) => {
    try {
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        return await response.json();  // returns user data
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

export const getUsers = async () => {
    const response = await fetch(`${BASE_URL}/users`);
    return await response.json();
};

export const addUser = async (user) => {
    const response = await fetch(`${BASE_URL}/users/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    });
    if (!response.ok) throw new Error('Failed to add user');
};

export const updateUser = async (id, userData) => {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });
    if (!response.ok) throw new Error('Failed to update user');
};

export const deleteUser = async (id) => {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete user');
};
