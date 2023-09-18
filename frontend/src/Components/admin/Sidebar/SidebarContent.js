import React from 'react'
import * as Icons from './icons'
import {Link, NavLink, Route, useLocation} from "react-router-dom";

function Icon({ icon, ...props }) {
    const Icon = Icons[icon]
    return <Icon {...props} />
}

function SidebarContent() {
    const location = useLocation();

    const routes = [
        {
            path: '/admin/brand', // the url
            icon: 'CardsIcon', // the component being exported from icons/index.js
            name: 'Brand', // name that appear in Sidebar
        },
        {
            path: '/admin/part',
            icon: 'OutlineCogIcon',
            name: 'Car part',
        },
        {
            path: '/admin/car',
            icon: 'ChartsIcon',
            name: 'Car',
        },
        {
            path: '/admin/product',
            icon: 'PagesIcon',
            name: 'Product',
        },
        {
            path: '/admin/admins',
            icon: 'PeopleIcon',
            name: 'Admins',
        },
        {
            path: '/admin/operator',
            icon: 'PeopleIcon',
            name: 'Operators',
        },

    ]
    return (
        <div className="py-4 text-gray-500 text-gray-400">
            <Link to={'/admin'} className="ml-6 text-lg font-bold text-white" >
                Project Name
            </Link>
            <ul className="mt-6">
                {routes.map((route) =>
                    <li className="relative px-6 py-3" key={route.name}>
                        <NavLink
                            exact
                            to={route.path}
                            className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-white"
                            activeClassName="text-gray-800 text-gray-100"
                        >
                            {location.pathname===route.path?<span
                                className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                                aria-hidden="true"
                            ></span>:""}

                            <Icon className="w-5 h-5" aria-hidden="true" icon={route.icon} />
                            <span className="ml-4">{route.name}</span>
                        </NavLink>
                    </li>
                )}

            </ul>

        </div>
    )
}

export default SidebarContent