// src/pages/GroupsPage.jsx
import { useEffect, useState } from "react";
import { getGroups } from "../services/groupsApi";
import { Link } from "react-router-dom";

export default function GroupsPage() {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        getGroups().then(setGroups);
    }, []);

    return (
        <div className="dashboard-content">
            <h2 className="section-title">Your Groups</h2>

            <div className="groups-grid">
                {groups.map(g => (
                    <div key={g.id} className={`group-card ${g.slug}`}>
                        <div className="group-card-header"></div>
                        <div className="group-title">{g.name}</div>
                        <div className="group-description">{g.description}</div>
                        <Link to={`/groups/${g.id}`}>
                            <button className="open-btn">Open Group</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}