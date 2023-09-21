import React, {useContext} from 'react'
import {SidebarContext} from "../admin/Sidebar/SidebarContext";
import {MenuIcon,} from './Sidebar/icons'

function Header() {
    const {toggleSidebar} = useContext(SidebarContext)


    return (
        <header className="z-40 py-4  shadow-bottom bg-gray-800">
            <div
                className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 text-purple-300">
                <button
                    className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
                    onClick={toggleSidebar}
                    aria-label="Menu"
                >
                    <MenuIcon className="w-6 h-6" aria-hidden="true"/>
                </button>
            </div>
        </header>
    )
}

export default Header
