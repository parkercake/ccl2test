import { NavLink, useParams } from "react-router-dom";

export default function GroupNavbar() {
    const { groupId } = useParams();

    return (
        <nav className="tab-nav">
            <NavLink to={`/groups/${groupId}/chat`} className="tab-btn">Chat</NavLink>
            <NavLink to={`/groups/${groupId}/resources`} className="tab-btn">Resources</NavLink>
            <NavLink to={`/groups/${groupId}/calendar`} className="tab-btn">Calendar</NavLink>
            <NavLink to={`/groups/${groupId}/members`} className="tab-btn">Members</NavLink>
            {/* Optional future tab: */}
            {/* <NavLink to={`/groups/${groupId}/settings`} className="tab-btn">Settings</NavLink> */}
        </nav>
    );
}
