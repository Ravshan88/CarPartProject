import React, {useEffect, useCallback} from "react";
import Login from "./components/Login/index";
import {Route, Routes, useLocation} from "react-router-dom";
import "./components/Login/index.css";
import "react-toastify/dist/ReactToastify.css";

import {useNavigate} from "react-router-dom";
import instance from "./components/utils/config/instance";
import ErrorPage from "./components/404/ErrorPage";
import Home from './components/home/Home';
import AdminHome from './components/admin/Admin'


import {useDispatch} from "react-redux";
import AdminBrand from "./components/admin/adminBrand/AdminBrand";
import AdminAdmins from "./components/admin/adminAdmins/AdminAdmins";
import AdminOperators from "./components/admin/adminOperators/AdminOperators";
import AdminCar from "./components/admin/adminCar/AdminCar";
import AdminCarPart from "./components/admin/adminCarPart/AdminCarPart";
import AdminProduct from "./components/admin/adminProduct/AdminProduct";
import Operator from "./components/admin/operator/Operator";
import OperatorOrder from "./components/admin/operator/operatorOrder/OperatorOrder";

function App() {

    const blockedPages = ["/admin"];
    const pageSecurity=[
        {
            url:"/admin/admins",
            permit:"ROLE_SUPER_ADMIN"
        },
        {
            url:"/admin/operators",
            permit:"ROLE_SUPER_ADMIN"
        },
        {
            url:"/admin/brand",
            permit:"ROLE_ADMIN"
        },
        {
            url:"/admin/car",
            permit:"ROLE_ADMIN"
        },
        {
            url:"/admin/product",
            permit:"ROLE_ADMIN"
        },
        {
            url:"/admin/operator",
            permit:"ROLE_OPERATOR"
        },
        {
            url:"/admin/operator/order",
            permit:"ROLE_OPERATOR"
        }
    ]
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch()

    const checkSecurity = useCallback(async () => {
        pageSecurity.map(async item => {
           if(location.pathname.startsWith(item.url)){
               let accessToken = localStorage.getItem("access_token");
               if (accessToken !== null) {
                   try {
                       const res = await instance("/api/v1/security", "GET");
                       if (res?.data !== 401 && !res?.error) {
                           if (res?.data[0].name !==item.permit) {
                               navigate("/404");
                           }
                       }
                   } catch (error) {
                       navigate("/404");
                   }
               } else {
                   navigate("/404");
               }
           }
        })

        if (blockedPages.some((blockedPage) => location.pathname.startsWith(blockedPage))) {
            let accessToken = localStorage.getItem("access_token");

            if (accessToken !== null) {
                try {
                    const res = await instance("/api/v1/security", "GET");
                    if (res?.data !== 401 && res?.error) {

                        if (res?.data[0].name !== "ROLE_SUPER_ADMIN" || res?.data[0].name !== "ROLE_ADMIN") {
                            navigate("/404");
                        }
                    }
                } catch (error) {
                    navigate("/404");
                }
            } else {
                navigate("/404");
            }
        }
    }, [blockedPages, location.pathname, navigate]);
    useEffect(() => {

        checkSecurity();

        const handleStorageChange = (event) => {
            if (!localStorage.getItem("access_token")) {
                navigate("/");
            } else {
                checkSecurity();
            }
        };
        window.addEventListener("storage", handleStorageChange);

        const handleBeforeUnload = () => {
            handleStorageChange();
        };
        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [checkSecurity, navigate]);

    return (
        <div className="App">
            <Routes>

                    <Route path="/login" element={<Login/>}/>
                <Route path={"/admin"} element={<AdminHome/>}>
                    <Route path={"/admin/brand"} element={<AdminBrand/>}/>
                    <Route path={"/admin/operator"} element={<Operator/>}/>
                    <Route path={"/admin/operator/order"} element={<OperatorOrder/>}/>
                    <Route path={"/admin/admins"} element={<AdminAdmins/>}/>
                    <Route path={"/admin/operators"} element={<AdminOperators/>}/>
                    <Route path={"/admin/car"} element={<AdminCar/>}/>
                    <Route path={"/admin/part"} element={<AdminCarPart/>}/>
                    <Route path={"/admin/product"} element={<AdminProduct/>}/>
                </Route>
                <Route path="/" element={<Home/>}/>
                <Route path="*" element={<ErrorPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
