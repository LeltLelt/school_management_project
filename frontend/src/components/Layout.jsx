import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout() {
 const [open, setOpen] = useState(false);
    return (
        <div>
            <Navbar  
                onMenuClick={() => setOpen(true)}
            />

            <div>
                <Sidebar 
                open={open}
                onClose={() => setOpen(false)}
                />

                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default Layout;