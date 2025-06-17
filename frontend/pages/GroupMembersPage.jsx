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
        console.log("Fetched members:", data);
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
    console.log("Members list:", members.map(m => m.id))
    return (
        <div>
            <h3>Group Members</h3>
            <ul>
                {members.map(m => (
                    <li key={m.id}>
                        {m.first_name} {m.last_name} ({m.role})
                        <button onClick={() => handleRemove(m.id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <input
                type="number"
                placeholder="User ID"
                value={newUserId}
                onChange={e => setNewUserId(e.target.value)}
            />
            <button onClick={handleAdd}>Add Member</button>
        </div>
    );
}