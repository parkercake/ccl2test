import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import UsersPage from '../pages/UsersPage';
import LoginPage from '../pages/LoginPage';
import GroupsPage from "../pages/GroupsPage";
import GroupPage from "../pages/GroupPage.jsx";
import GroupResourcesPage from "../pages/GroupResourcesPage.jsx";
import GroupChatPage from "../pages/GroupChatPage.jsx";
import GroupCalendarPage from "../pages/GroupCalendarPage.jsx";
import GroupMembersPage from "../pages/GroupMembersPage.jsx";

function App() {
    return (
            <Routes>
                <Route path="/users" element={<UsersPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/groups" element={<GroupsPage/>}/>
                <Route path="/" element={<Navigate to="/groups"/>}/>
                <Route path="/groups" element={<GroupsPage/>}/>

                <Route path="/groups/:groupId" element={<GroupPage/>}>
                    <Route path="chat" element={<GroupChatPage/>}/>
                    <Route path="resources" element={<GroupResourcesPage/>}/>
                    <Route path="calendar" element={<GroupCalendarPage/>}/>
                    <Route path="members" element={<GroupMembersPage/>}/>
                </Route>
            </Routes>
    );
}

export default App;
