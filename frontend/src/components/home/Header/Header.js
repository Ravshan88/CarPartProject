import './Header.css'
import {useLocation, useNavigate} from "react-router-dom";
import autoImg from '../../images/autoImg.jpg'
import {PersonOutlineOutlined, ShoppingCartOutlined} from "@mui/icons-material";
import {Button, Input, Space} from "antd";
import {useSelector} from "react-redux";
import {SiJss} from "react-icons/si";
import {hexToRgb} from "@mui/material";

function Header(props) {
    const {data, isLoading} = useSelector(state => state.advertisement)
    const navigate = useNavigate();
    const location = useLocation()
    const length = JSON.parse(localStorage.getItem('basket'))?.length;
    return (
        <div className={"border"}>

            {
                location.pathname === "/basket" ? "" :
                    <div>
                        <div className={"flex w-full justify-center gap-5 p-1.5 bg-gray-900 text-white"}>
                            <button>
                                Shop
                            </button>
                            <button>
                                Partners
                            </button>
                            <button>
                                Club
                            </button>
                        </div>
                        <div
                            className={"flex w-full align-items-center justify-center gap-5 bg-orange-600 h-7 text-white"}>
                            {
                                data[0]?.title &&
                                <h2 className={"flex font-semibold"}>{data[0]?.title}</h2>
                            }

                        </div>
                    </div>
            }
            <div className={"h-[60px] items-center relative flex justify-end w-full bg-gray-900 text-white"}>
                <div className="absolute top-0 right-1/2 translate-x-[50%]">
                    <img width={100} height={50} src={autoImg} alt=""/>
                </div>
                <div onClick={() => navigate("/login")} className={"pr-6 cursor-pointer"}>
                    <PersonOutlineOutlined/>Sign in
                </div>
            </div>


            <div className={"h-[60px] items-center relative flex justify-end bg-gray-900 text-white"}>
                <div
                    className={"input-group ml-[20px] md:ml-0 absolute top-[50%] left-0 md:left-[50%] md:translate-x-[-50%] translate-y-[-50%] max-w-[75%] md:max-w-[50%]"}>
                    <input placeholder={"Ehtiyot qism nomini kiriting"} type="text" className={"form-control "}/>
                    <Button className={"h-[48px] bg-blue-600 border-none text-white px-1 sm:px-0"}>
                        Search
                    </Button>
                </div>
                <div
                    className={"mr-6 border md:w-[40px] p-2 bg-white rounded-3xl relative cursor-pointer hover:scale-105 transition duration-75 flex"}
                    onClick={() => {
                        navigate('/basket')
                    }}>
                    <ShoppingCartOutlined color={"warning"} className={"text-7xl"}/>
                    {
                        length > 0 && <div
                            className={'transition font-mono absolute right-[-8px] top-[-6px] ease-in-out text-gray-50 w-5 h-5 flex bg-orange-500 justify-center rounded-3xl'}> {length}</div>
                    }
                </div>
            </div>


            {/*<div className={"flex justify-between px-6 align-items-center gap-6 bg-gray-900"}>*/}
            {/*    <div className={"input-group w-full md:w-1/2 border-none p-3"}>*/}
            {/*        <input type="text" className={"form-control "}/>*/}
            {/*        <Button className={"h-[48px] bg-blue-600 border-none text-white"}>*/}
            {/*            Search*/}
            {/*        </Button>*/}
            {/*    </div>*/}
            {/*    <div*/}
            {/*        className={" border p-2 bg-white rounded-3xl relative cursor-pointer hover:scale-105 transition duration-75 flex"}*/}
            {/*        onClick={() => {*/}
            {/*            navigate('/basket')*/}
            {/*        }}>*/}
            {/*        <ShoppingCartOutlined color={"warning"} fontSize={"large"}/>*/}
            {/*        {*/}
            {/*            length > 0 && <div*/}
            {/*                className={'transition font-mono absolute right-[-8px] top-[-6px] ease-in-out text-gray-50 w-5 h-5 flex bg-orange-500 justify-center rounded-3xl'}> {length}</div>*/}
            {/*        }*/}

            {/*    </div>*/}
            {/*</div>*/}

        </div>
    );
}

export default Header;