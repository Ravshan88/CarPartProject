import React, {useContext, useEffect} from 'react';
import Header from "../admin/Header";

import {Outlet, useLocation} from "react-router-dom";
import {SidebarContext} from "../admin/Sidebar/SidebarContext";
import Sidebar from "../admin/Sidebar/Sidebar";
import PageTitle from "./PageTitle";
function Admin(props) {
    const { isSidebarOpen, closeSidebar } = useContext(SidebarContext)
    let location = useLocation()

    useEffect(() => {
        closeSidebar()
    }, [location])

    return (
        <div
            className={`flex h-screen bg-gray-50 bg-gray-900 ${isSidebarOpen && 'overflow-hidden'}`}
        >
            <Sidebar/>

            <div className="flex flex-col flex-1 w-full">
                <Header/>
                <main className="h-full overflow-y-auto">
                    <div className="container grid px-6 mx-auto">
                        <Outlet />
                    </div>

                </main>
            </div>
        </div>
    );
}

export default Admin;