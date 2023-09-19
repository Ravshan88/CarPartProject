import React from 'react'
import * as Icons from './icons'
import {Link, NavLink, Route, useLocation} from "react-router-dom";
import instance from "../../utils/config/instance";
import CheckUser from "../Securyt/CheckUser";

function Icon({icon, ...props}) {
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



    ]


        try {
              instance("/api/v1/security", "GET").then(res=>{
                  // console.log(res?.data[0]?.name)
                  // if(res?.data[0].name == "ROLE_SUPER_ADMIN" ){
                  //     routes.push()
                  // }
              })

        } catch (error) {

        }

    return (
        <div className="py-4 text-gray-500 text-gray-400">
            <Link to={'/admin'} className="ml-6 text-lg font-bold text-white">
                Project Name
            </Link>
            <ul className="mt-6">
                {routes.map((route) =>
                    <li className="relative px-6 py-3" key={route.name}>
                        <NavLink

                            to={route.path}
                            className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-white"
                        >
                            {location.pathname === route.path ? <span
                                className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                                aria-hidden="true"
                            ></span> : ""}

                            <Icon className="w-5 h-5" aria-hidden="true" icon={route.icon}/>
                            <span className="ml-4">{route.name}</span>
                        </NavLink>
                    </li>
                )}
                <CheckUser>
                    <li className="relative px-6 py-3" key={"Admins"}>
                        <NavLink
                            to={'/admin/admins'}
                            className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-white"
                        >
                            {location.pathname === '/admin/admins' ? <span
                                className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                                aria-hidden="true"
                            ></span> : ""}

                            <Icon className="w-5 h-5" aria-hidden="true" icon={'PeopleIcon'}/>
                            <span className="ml-4">{'Admins'}</span>
                        </NavLink>
                    </li>
                    <li className="relative px-6 py-3" key={"Operators"}>
                        <NavLink
                            to={'/admin/operators'}
                            className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-white"
                        >
                            {location.pathname === '/admin/operators' ? <span
                                className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                                aria-hidden="true"
                            ></span> : ""}

                            <Icon className="w-5 h-5" aria-hidden="true" icon={'PeopleIcon'}/>
                            <span className="ml-4">{'Operators'}</span>
                        </NavLink>
                    </li>

                </CheckUser>

            </ul>

        </div>
    )
}

export default SidebarContent