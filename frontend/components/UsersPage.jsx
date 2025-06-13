import { useEffect, useState } from "react";
import * as api from "../services/apiService.js";

function UsersPage() {
    const [users, setUsers] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null);
    const [newUser, setNewUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",  // required in DB!
        bio: ""
    });



    const fetchUsers = async () => {
        try {
            const data = await api.getUsers();
            setUsers(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleAddUser = async () => {
        try {
            await api.addUser(newUser);
            // Reset form
            setNewUser({
                first_name: "",
                last_name: "",
                email: "",
                bio: ""
            });
            await fetchUsers();
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const handleUpdateUser = async () => {
        try {
            await api.updateUser(editingUserId, newUser);
            setEditingUserId(null);
            setNewUser({
                first_name: "",
                last_name: "",
                email: "",
                password: "",
                bio: ""
            });
            await fetchUsers();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await api.deleteUser(id);
            await fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const startEditing = (user) => {
        setEditingUserId(user.id);
        setNewUser({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            bio: user.bio,
            password: ""  // optional, or leave empty for update
        });
    };

    useEffect(() => {
        void fetchUsers();
    }, []);

    return (
        <div>
            <h1>Users</h1>

            <div>
                <input
                    type="text"
                    placeholder="Enter first name"
                    value={newUser.first_name}
                    onChange={(e) =>
                        setNewUser({ ...newUser, first_name: e.target.value })
                    }
                />
                <input
                    type="text"
                    placeholder="Enter last name"
                    value={newUser.last_name}
                    onChange={(e) =>
                        setNewUser({ ...newUser, last_name: e.target.value })
                    }
                />
                <input
                    type="email"
                    placeholder="Enter email"
                    value={newUser.email}
                    onChange={(e) =>
                        setNewUser({ ...newUser, email: e.target.value })
                    }
                />
                <input
                    type="text"
                    placeholder="Enter bio"
                    value={newUser.bio}
                    onChange={(e) =>
                        setNewUser({ ...newUser, bio: e.target.value })
                    }
                />
                <input
                    type="password"
                    placeholder="Enter password"
                    value={newUser.password}
                    onChange={(e) =>
                        setNewUser({ ...newUser, password: e.target.value })
                    }
                />
                <button onClick={editingUserId ? handleUpdateUser : handleAddUser}>
                    {editingUserId ? "Update User" : "Add User"}
                </button>
            </div>

            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.first_name} {user.last_name}</td>
                        <td>
                            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                            <button onClick={() => startEditing(user)}>Edit</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default UsersPage;
