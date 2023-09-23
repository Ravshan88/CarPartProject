import React, {useEffect, useCallback, useState} from "react";
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
import Loader from "./ui/pageLoading/loader";

function App() {

    const blockedPages = ["/admin"];
    const pageSecurity=[
        {
            urls:["/admin/admins","/admin","/admin/operators"],
            permit:"ROLE_SUPER_ADMIN"
        },
        {
            urls:["/admin/brand", "/admin/car","/admin/product"],
            permit:"ROLE_ADMIN"
        },

        {
            urls:["/admin/operator/order","/admin/operator/home"],
            permit:"ROLE_OPERATOR"
        },

    ]
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch()
const [loading, setLoading]=useState(false)


    // page security
    const checkSecurity = useCallback(async () => {
        setLoading(true)
        pageSecurity.map(async item => {
            if (item.urls.some((blockedPage) => blockedPage===(location.pathname))) {
                let accessToken = localStorage.getItem("access_token");

                if (accessToken !== null) {
                    try {
                        const res = await instance("/api/v1/security", "GET");
                        if (res?.data !== 401 && !res?.error) {
                            console.log(item)
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


        setLoading(false)
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
            {loading?<Loader/>
            :
            <>
                <Routes>

                    <Route path="/login" element={<Login/>}/>
                    <Route path={"/admin"} element={<AdminHome/>}>
                        <Route path={"/admin/brand"} element={<AdminBrand/>}/>
                        <Route path={"/admin/operator/home"} element={<Operator/>}/>
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
            </>
            }
        </div>
    );
}

export default App;
