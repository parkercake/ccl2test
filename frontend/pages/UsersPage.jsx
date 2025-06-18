// src/pages/UsersPage.jsx
import { useEffect, useState } from "react";
import * as api from "../services/usersApi.js";
import * as authApi from "../services/authApi.js";
import { useNavigate } from 'react-router-dom';
import { useUser } from "../src/context/UserContext";

function UsersPage() {
    const [users, setUsers] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null);
    const [newUser, setNewUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        bio: ""
    });
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();
    const { setUser } = useUser();

    const fetchUsers = async () => {
        try {
            const data = await api.getUsers();
            setUsers(Array.isArray(data) ? data : []);
            setErrorMessage("");
        } catch (error) {
            if (error.message === 'unauthorized' || error.status === 401) {
                navigate('/login');
            } else {
                setErrorMessage("Error loading users.");
            }
        }
    };

    const handleAddUser = async () => {
        try {
            await api.addUser(newUser);
            setNewUser({ first_name: "", last_name: "", email: "", password: "", bio: "" });
            await fetchUsers();
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const handleUpdateUser = async () => {
        try {
            await api.updateUser(editingUserId, newUser);
            setEditingUserId(null);
            setNewUser({ first_name: "", last_name: "", email: "", password: "", bio: "" });
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
            password: ""
        });
    };

    const handleLogout = async () => {
        try {
            await authApi.logout();
            setUser(null);
            navigate('/login');
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="dashboard-content">
            <div className="header">
                <h1 className="section-title">Users</h1>
                <button className="login-btn" onClick={handleLogout}>Logout</button>
            </div>

            {errorMessage && <p className="auth-link">{errorMessage}</p>}

            <div className="auth-form">
                <div className="form-row">
                    <input
                        type="text"
                        className="form-input"
                        placeholder="First name"
                        value={newUser.first_name}
                        onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
                    />
                    <input
                        type="text"
                        className="form-input"
                        placeholder="Last name"
                        value={newUser.last_name}
                        onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
                    />
                </div>

                <input
                    type="email"
                    className="form-input"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />

                <input
                    type="text"
                    className="form-input"
                    placeholder="Bio"
                    value={newUser.bio}
                    onChange={(e) => setNewUser({ ...newUser, bio: e.target.value })}
                />

                <input
                    type="password"
                    className="form-input"
                    placeholder="Password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                />

                <button className="auth-btn" onClick={editingUserId ? handleUpdateUser : handleAddUser}>
                    {editingUserId ? "Update User" : "Add User"}
                </button>
            </div>

            <table className="members-table">
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
                        <td className="member-actions">
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