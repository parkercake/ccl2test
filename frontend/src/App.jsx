import { Routes, Route } from 'react-router-dom';
import ProfilePage from '../pages/ProfilePage';
import LoginPage from '../pages/LoginPage';
import GroupsPage from "../pages/GroupsPage";
import GroupPage from "../pages/GroupPage.jsx";
import GroupResourcesPage from "../pages/GroupResourcesPage.jsx";
import GroupChatPage from "../pages/GroupChatPage.jsx";
import GroupCalendarPage from "../pages/GroupCalendarPage.jsx";
import GroupMembersPage from "../pages/GroupMembersPage.jsx";
import LandingPage from "../pages/LandingPage.jsx";
import SidebarLayout from "./layouts/SidebarLayout";
import PersonalCalendarPage from "../pages/PersonalCalendarPage.jsx";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Protected app layout with sidebar */}
            <Route element={<SidebarLayout />}>
                <Route path="/users/:userId" element={<ProfilePage />} />
                <Route path="/groups" element={<GroupsPage />} />
                <Route path="/calendar" element={<PersonalCalendarPage />} />

                {/* Group-specific layout */}
                <Route path="/groups/:groupId" element={<GroupPage />}>
                    <Route path="chat" element={<GroupChatPage />} />
                    <Route path="resources" element={<GroupResourcesPage />} />
                    <Route path="calendar" element={<GroupCalendarPage />} />
                    <Route path="members" element={<GroupMembersPage />} />
                </Route>
            </Route>
        </Routes>
    );
}