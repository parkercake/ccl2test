import { Outlet } from "react-router-dom";
import Sidebar from "../../pages/components/Sidebar";

export default function SidebarLayout() {
    return (
        <div className="app-container">
            <Sidebar />
            <div className="main-content">
                <Outlet /> {/* this is where users, groups, etc. render */}
            </div>
        </div>
    );
}