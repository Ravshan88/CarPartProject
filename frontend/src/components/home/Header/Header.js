import './Header.css'
import {useNavigate} from "react-router-dom";
import autoImg from '../../images/autoImg.jpg'
import {PersonOutlineOutlined, ShoppingCartOutlined} from "@mui/icons-material";
import {Button, Input, Space} from "antd";
import {useSelector} from "react-redux";

function Header(props) {
    const {data, isLoading} = useSelector(state => state.advertisement)
    const navigate = useNavigate();
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
            <div className={"flex w-full align-items-center justify-center gap-5 bg-orange-600 h-7 text-white"}>
                {
                    data[0]?.title &&
                    <h2 className={"flex font-semibold"}>{data[0]?.title}</h2>
                }

            </div>
            <div className={"min-w-[1262px] flex justify-between w-full bg-gray-900 text-white"}>
                <div></div>
                <div className="flex justify-center items-center">
                    <img width={100} height={50} src={autoImg} alt=""/>
                </div>
                <div onClick={() => navigate("/login")} className={"pr-6 cursor-pointer"}>
                    <PersonOutlineOutlined/>Sign in
                </div>
            </div>
            <div className={"flex justify-between gap-6 bg-gray-900"}>
                <div></div>
                <div className={"input-group w-25 border-none p-3"}>
                    <input type="text" className={"form-control"}/>
                    <Button className={"h-full bg-blue-600 border-none text-white"}>
                        Search
                    </Button>
                </div>
                <div className={"px-6"}>
                    <ShoppingCartOutlined color={"primary"} fontSize={"large"}/>
                </div>
            </div>

        </div>
    );
}

export default Header;