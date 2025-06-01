const BASE_URL = 'http://localhost:3000';

export const getUsers = async () => {
    try {
        const response = await fetch(`${BASE_URL}/users`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}