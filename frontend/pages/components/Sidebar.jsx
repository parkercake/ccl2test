// src/components/Sidebar.jsx
import { NavLink } from "react-router-dom";

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="logo">StudyGroups</div>
            <nav>
                <NavLink to="/dashboard" className="nav-item">Dashboard</NavLink>
                <NavLink to="/groups" className="nav-item">My Groups</NavLink>
                <NavLink to="/calendar" className="nav-item">Calendar</NavLink>
                <NavLink to="/profile" className="nav-item">Profile</NavLink>
            </nav>
        </div>
    );
}