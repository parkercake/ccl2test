// src/pages/GroupMembersPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGroupMembers, addGroupMember, removeGroupMember } from "../services/membersApi";

export default function GroupMembersPage() {
    const { groupId } = useParams();
    const [members, setMembers] = useState([]);
    const [newUserId, setNewUserId] = useState("");

    const fetchMembers = async () => {
        const data = await getGroupMembers(groupId);
        setMembers(data || []);
    };

    const handleAdd = async () => {
        if (!newUserId) return;
        await addGroupMember(groupId, newUserId);
        setNewUserId("");
        fetchMembers();
    };

    const handleRemove = async (userId) => {
        await removeGroupMember(groupId, userId);
        fetchMembers();
    };

    useEffect(() => {
        fetchMembers();
    }, [groupId]);

    return (
        <div className="dashboard-content">
            <div className="members-header">
                <h3 className="section-title">Group Members</h3>
                <button className="invite-btn" onClick={handleAdd}>Add Member</button>
            </div>

            <input
                type="number"
                placeholder="User ID"
                value={newUserId}
                onChange={e => setNewUserId(e.target.value)}
                className="form-input"
            />

            <table className="members-table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {members.map(m => (
                    <tr key={m.id}>
                        <td><span className="member-name">{m.first_name} {m.last_name}</span></td>
                        <td><span className="member-role">{m.role}</span></td>
                        <td className="member-actions">
                            <button onClick={() => handleRemove(m.id)}>Remove</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
