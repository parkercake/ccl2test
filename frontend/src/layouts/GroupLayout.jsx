import { Outlet } from "react-router-dom";
import GroupNavbar from "../../pages/components/GroupNavbar";

export default function GroupLayout() {
    return (
        <div className="dashboard-content">
            <GroupNavbar />      {/* group-specific top nav */}
            <Outlet />           {/* renders the active group subpage */}
        </div>
    );
}
