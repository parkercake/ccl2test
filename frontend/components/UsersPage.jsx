import { useEffect, useState } from "react";
import * as api from "../services/apiService.js";

function UsersPage() {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const data = await api.getUsers();
            console.log('Fetched users:', data);
            setUsers(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        void fetchUsers();
    }, []);

    return (
        <div>
            <h1>Users</h1>
            <p>This is the Users component.</p>
            <table>
                <thead>
                <tr><th>Name</th></tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.name}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default UsersPage;
