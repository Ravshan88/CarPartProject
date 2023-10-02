import React, {useEffect, useState} from 'react'
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


    const routesOperator = [
        {
            path: "/admin/operator/order", // the url
            icon: 'ChatIcon', // the component being exported from icons/index.js
            name: 'Yangi buyurtmalar', // name that appear in Sidebar
        },
        {
            path: "/admin/operator/inprogress",
            icon: 'CardsIcon',
            name: 'Jarayonda',
        },
        {
            path: '/admin/operator/completed',
            icon: 'MoneyIcon',
            name: 'Bajarilgan',
        },
        {
            path: '/admin/operator/declined',
            icon: 'ForbiddenIcon',
            name: 'Rad etilgan',
        },



    ]

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
            path: '/admin/news',
            icon: 'PagesIcon',
            name: 'Yangiliklar',
        },



    ]

    const [user, setUser]=useState({})
       function checkUser(){
           try {
               instance("/api/v1/security", "GET").then(res=>{
                   setUser(res.data[0])
               })

           } catch (error) {

           }
       }

    useEffect(()=>{
    checkUser()
},[location.pathname])
    return (
        <div className="py-4 text-gray-500 text-gray-400">
            <Link to={'/admin'} className="ml-6 text-lg font-bold text-white">
                Project Name
            </Link>
            <ul className="mt-6">
                {/*{routes.map((route) =>*/}
                {/*    <li className="relative px-6 py-3" key={route.name}>*/}
                {/*        <NavLink*/}
                {/*            // exact*/}
                {/*            to={route.path}*/}
                {/*            className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-white"*/}
                {/*            // activeClassName="text-gray-800 text-gray-100"*/}
                {/*        >*/}
                {/*            {location.pathname === route.path ? <span*/}
                {/*                className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"*/}
                {/*                aria-hidden="true"*/}
                {/*            ></span> : ""}*/}

                {/*            <Icon className="w-5 h-5" aria-hidden="true" icon={route.icon}/>*/}
                {/*            <span className="ml-4">{route.name}</span>*/}
                {/*        </NavLink>*/}
                {/*    </li>*/}
                {/*)}*/}


                {/*admin*/}
                {user?.name==="ROLE_ADMIN"?
                  <>
                      {routes.map((route) =>
                          <li className="relative px-6 py-3" key={route.name}>
                              <NavLink
                                  // exact
                                  to={route.path}
                                  className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-white"
                                  // activeClassName="text-gray-800 text-gray-100"
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
                  </>
                :""
                }
                {/*operator*/}
                {user?.name==="ROLE_OPERATOR"?
                    <>
                        {routesOperator.map((route) =>
                            <li className="relative px-6 py-3" key={route.name}>
                                <NavLink
                                    // exact
                                    to={route.path}
                                    className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-white"
                                    // activeClassName="text-gray-800 text-gray-100"
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


                    </>
                    :""
                }

                {/*super admin*/}
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


                <li className="relative px-6 py-3 " key={"logout"}>
                    <NavLink
                        to={'/'}
                        onClick={()=>{
                            localStorage.removeItem("access_token")
                            localStorage.removeItem("refresh_token")
                        }}
                        className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-white"
                    >
                        {location.pathname === '/' ? <span
                            className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                            aria-hidden="true"
                        ></span> : ""}

                        <Icon className="w-5 h-5" aria-hidden="true" icon={'OutlineLogoutIcon'}/>
                        <span className="ml-4">{'Log out'}</span>
                    </NavLink>
                </li>

            </ul>

        </div>
    )
}

export default SidebarContent