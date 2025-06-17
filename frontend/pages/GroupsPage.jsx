import { useEffect, useState } from "react";
import { getGroups } from "../services/groupsApi";
import { Link } from "react-router-dom";

export default function GroupsPage() {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        getGroups().then(setGroups);
    }, []);

    return (
        <div>
            <h2>Your Groups</h2>
            <ul>
                {groups.map(g => (
                    <li key={g.id}>
                        <Link to={`/groups/${g.id}`}>{g.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}