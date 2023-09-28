import './Header.css'
import {useLocation, useNavigate} from "react-router-dom";
import autoImg from '../../images/autoImg.jpg'
import {PersonOutlineOutlined, ShoppingCartOutlined} from "@mui/icons-material";
import {Button, Input, Space} from "antd";
import {useSelector} from "react-redux";
import {SiJss} from "react-icons/si";

function Header(props) {
    const {data, isLoading} = useSelector(state => state.advertisement)
    const navigate = useNavigate();
    const location = useLocation()
    const length = JSON.parse(localStorage.getItem('basket'))?.length;
    return (
        <div className={"border"}>
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
            {
                location.pathname === "/basket" ? "" :
                    <div className={"flex w-full align-items-center justify-center gap-5 bg-orange-600 h-7 text-white"}>
                        {
                            data[0]?.title &&
                            <h2 className={"flex font-semibold"}>{data[0]?.title}</h2>
                        }

                    </div>
            }
            <div className={"min-w-[1262px] flex justify-between align-items-center w-full bg-gray-900 text-white"}>
                <div></div>
                <div className="flex justify-center items-center">
                    <img width={100} height={50} src={autoImg} alt=""/>
                </div>
                <div onClick={() => navigate("/login")} className={"pr-6 cursor-pointer"}>
                    <PersonOutlineOutlined/>Sign in
                </div>
            </div>
            <div className={"flex justify-between  px-6 align-items-center gap-6 bg-gray-900"}>
                <div></div>
                <div className={"input-group w-50 border-none p-3"}>
                    <input type="text" className={"form-control"}/>
                    <Button className={"h-[48px] bg-blue-600 border-none text-white"}>
                        Search
                    </Button>
                </div>
                <div
                    className={" border p-2 bg-white rounded-3xl relative cursor-pointer hover:scale-105 transition duration-75 flex"}
                    onClick={() => {
                        navigate('/basket')
                    }}>
                    <ShoppingCartOutlined color={"warning"} fontSize={"large"}/>
                    {
                        length > 0 && <div
                            className={'transition font-mono absolute right-[-8px] top-[-6px] ease-in-out text-gray-50 w-5 h-5 flex bg-orange-500 justify-center rounded-3xl'}> {length}</div>
                    }

                </div>
            </div>

        </div>
    );
}

export default Header;