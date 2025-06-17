import { Outlet, useParams, NavLink } from "react-router-dom";
export default function GroupPage() {
    const { groupId } = useParams();
    return (
        <div>
            <h1>Group {groupId}</h1>
            <nav>
                <NavLink to="chat">Chat</NavLink>
                <NavLink to="resources">Resources</NavLink>
                <NavLink to="calendar">Calendar</NavLink>
                <NavLink to="members">Members</NavLink>
            </nav>
            <Outlet />
        </div>
    );
}