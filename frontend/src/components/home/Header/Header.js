import './Header.css'
import {Link, useLocation, useNavigate} from "react-router-dom";
import autoImg from '../../images/autoImg.jpg'
import {
    Facebook,
    Instagram,
    PersonOutlineOutlined,
    ShoppingCartOutlined,
    Telegram,
    WhatsApp,
    CarCrash, Phone,
} from "@mui/icons-material";
import {Button, Input, Space} from "antd";
import {useDispatch, useSelector} from "react-redux";
import logoAutoDoc from './logo.svg'
import React, {useEffect, useState} from "react";
import {getBrands} from "../../../redux/reducers/AdminBrandSlice";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {getAdvertisementStart} from "../../../redux/reducers/AdvertisementSlice";
import axios from "axios";
import SearchResultsList from "../SearchResultsList";
import instance from "../../utils/config/instance";


function Header(props) {
    const {data, isLoading} = useSelector(state => state.advertisement)
    const navigate = useNavigate();
    const location = useLocation()
    const length = JSON.parse(localStorage.getItem('basket'))?.length;
    const {

        brands,
    } = useSelector(state => state.adminBrand)
    const dispatch = useDispatch();
    const [inputText, setInputText] = useState("")
    const [results, setResults] = useState([]);

    function calcTotal() {

        let s = 0;
        JSON.parse(localStorage.getItem('basket')).map(item => {
            s += item.price * item.amount;
        });
        return s;
    }

    useEffect(() => {
        dispatch(getBrands())
        dispatch(getAdvertisementStart())
    }, [])
    useEffect(() => {
        dispatch(getBrands())
        dispatch(getAdvertisementStart())

    }, [dispatch])

    async function fetchData(value) {
        try {
            // await instance("/api/v1/carPart", "GET", null, {name: value}).then(() => {})
            const response = await axios.get('http://localhost:8080/api/v1/carPart?name=' + value);
            const json = response.data;
            setResults(json);
            //
            // const results = json.filter((user) => {
            //     return (
            //         value &&
            //         user &&
            //         user.name &&
            //         user.name.toLowerCase().includes(value)
            //     );
            // });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleChangeInput = (value) => {
        setInputText(value);
        fetchData(value);
    };

    return (
        <div className={"border"}>

            {
                location.pathname === "/basket" ? "" :
                    <div>
                        <div className={"flex w-full justify-center gap-5 p-1.5 bg-gray-900 text-white"}>
                            <button>
                                <Telegram/>
                            </button>
                            <button>
                                <Instagram/>
                            </button>
                            <button>
                                <Facebook/>
                            </button>
                            <button>
                                <WhatsApp/>
                            </button>
                        </div>
                        <div
                            className={"flex w-full align-items-center justify-center gap-5 bg-orange-600 h-7 text-white"}>
                            {
                                data[0]?.title &&
                                <h2 className={"flex font-semibold"} style={{fontSize: 20}}>{data[0]?.title}</h2>
                            }

                        </div>
                    </div>
            }
            <div
                className={"h-[40px] align-items-center items-center relative flex justify-end w-full bg-gray-900 text-white"}>
                <Link to={'/'} className="absolute top-0 right-1/2 translate-x-[50%] my-2">
                    <img width={200} height={100} src={logoAutoDoc} alt=""/>
                </Link>
                {/*<Phone/>*/}
                {/*<p style={{marginRight: 5}}>+998(94) 320-20-20</p>*/}
            </div>


            <div
                className={"absolute top-0  h-[60px] items-center relative flex justify-evenly bg-gray-900 text-white"}>
                <div className={'flex justify-evenly gap-5'}>
                    {/*Ehtiyot qismlar*/}
                    <div>
                        {/*// className={"ml-6  ml-[40px]  absolute top-[0%] my-1 left-0 md:left-[0%] md:translate-x-[-0%] translate-y-[-0%] max-w-[25%] md:max-w-[25%]"}>*/}
                        <div className={'my-1 p-0 flex align-items-center '}
                             style={{width: 250, height: 40, backgroundColor: '#132530'}}>
                            <div className={'text-white m-0 flex justify-evenly mx-2 gap-1'}>
                                <CarCrash color={"warning"}/>
                                <p style={{
                                    fontSize: " 16px",
                                    fontWeight: 400,
                                    lineHeight: "24px",
                                    letterSpacing: "0em",
                                    textAlign: " left",
                                    color: "#727272",
                                }}> Mahsulotlar</p>
                            </div>

                        </div>
                    </div>
                    {/*search*/}

                    <div className={"flex flex-col"}>
                        <div className={"flex gap-1 "}>
                            <input
                                value={inputText}
                                onChange={(e) => handleChangeInput(e.target.value)}
                                placeholder={"Mahsulot  nomini kiriting"}
                                type="text"
                                className={"form-control w-[500px]"}/>
                            <Button
                                className={"h-[40px] max-w-[100px] bg-blue-600 border-none text-white px-1 sm:px-0"}>
                                Qidirish
                            </Button>
                        </div>
                        {
                            results.length !== 0 && inputText && <div
                                className={"bg-white rounded w-[500px] z-50 border max-h-[250px] overflow-y-scroll absolute top-full"}>
                                <SearchResultsList results={results}/>
                            </div>
                        }

                    </div>


                    {/*<div>*/}
                    {/*    <div className={'my-1 flex flex-col'}>*/}
                    {/*// className={"input-group ml-[20px] md:ml-0 absolute top-[50%] left-0 md:left-[50%] md:translate-x-[-50%] translate-y-[-50%] max-w-[50%] md:max-w-[50%]"}>*/}
                    {/*        <div className={"flex gap-1 "}>*/}
                    {/*            <input value={inputText}*/}
                    {/*                   onChange={(e) => handleChangeInput(e.target.value)}*/}
                    {/*                   placeholder={"Mahsulot  nomini kiriting"}*/}
                    {/*                   type="text"*/}
                    {/*                   className={"form-control w-[500px]"}/>*/}
                    {/*            <Button*/}
                    {/*                className={"h-[40px] max-w-[100px] bg-blue-600 border-none text-white px-1 sm:px-0"}>*/}
                    {/*                Qidirish*/}
                    {/*            </Button>*/}
                    {/*        </div>*/}
                    {/*        <div*/}
                    {/*            className={" bg-white rounded w-full z-50 bottom-[-135px] border max-h-[250px] overflow-y-scroll"}>*/}
                    {/*            {results && results.length > 0 && <SearchResultsList results={results}/>}*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}


                    <div className={"cursor-pointer"}
                         onClick={() => {
                             navigate('/basket')
                         }}>
                        <div className={'my-1 p-0 flex justify-between px-4 items-center'}
                             style={{width: 250, height: 40, backgroundColor: '#132530'}}>
                            <div className={'text-white w-full m-0 d-flex justify-content-between gap-10'}>
                                <div className={'flex'}>
                                    <ShoppingCartOutlined color={"warning"} className={"text-7xl"}/>

                                    {length > 0 && <div
                                        className={"bg-red-700 mx-3 flex items-center justify-center rounded-3xl w-[20px] h-[20px] absolute top-[7px] text-sm"}>
                                        {length}
                                    </div>}

                                </div>
                                <div className={'my-1 flex items-center gap-2'}>
                                    <p style={{
                                        fontSize: "22px",
                                        fontWeight: 700,
                                        lineHeight: "16px",
                                        textAlign: "left",
                                    }}>{calcTotal().toLocaleString()} </p>
                                    <p style={{
                                        fontSize: "22px",
                                        fontWeight: 700,
                                        lineHeight: "16px",
                                        textAlign: "left",
                                        color: "#f37c2e"
                                    }}> So'm</p>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>


            <div
                className={'absolute top-0 h-[40px] items-center relative flex justify-evenly bg-gray-900 text-white'}>
                {brands?.content?.map(brand =>
                    <div className={'flex gap-1 mb-2 cursor-pointer items-center'}>
                        <LazyLoadImage effect={"blur"} className={"rounded-3xl my-1 "}
                                       width={35} height={35}
                                       src={`http://localhost:8080/api/v1/file/getFile/${brand?.photo?.id}`}
                                       alt="User avatar"/>
                        <p className={"text-gray-400 font-mono text-sm"}
                        > {brand.name}</p>
                    </div>
                )}
            </div>

        </div>
    );
}

export default Header;