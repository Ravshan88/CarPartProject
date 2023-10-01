import './Header.css'
import {useLocation, useNavigate} from "react-router-dom";
import autoImg from '../../images/autoImg.jpg'
import {
    Facebook,
    Instagram,
    PersonOutlineOutlined,
    ShoppingCartOutlined,
    Telegram,
    WhatsApp,
     CarCrash,
} from "@mui/icons-material";
import {Button, Input, Space} from "antd";
import {useDispatch, useSelector} from "react-redux";
import logoAutoDoc from './logo.svg'
import React, {useEffect} from "react";
import {getBrands} from "../../../redux/reducers/AdminBrandSlice";
import {LazyLoadImage} from "react-lazy-load-image-component";


function Header(props) {
    const {data, isLoading} = useSelector(state => state.advertisement)
    const navigate = useNavigate();
    const location = useLocation()
    const length = JSON.parse(localStorage.getItem('basket'))?.length;
    const {

        brands,
    } = useSelector(state => state.adminBrand)
    const dispatch = useDispatch();
    function calcTotal() {

        let s = 0;
        JSON.parse(localStorage.getItem('basket')).map(item => {
            s += item.price * item.amount;
        });
        return s;
    }
    useEffect(() => {
        dispatch(getBrands())
    }, [])
    useEffect(() => {
        dispatch(getBrands())
    }, [dispatch])
    return (
        <div className={"border"}>

            {
                location.pathname === "/basket" ? "" :
                    <div>
                        <div className={"flex w-full justify-center gap-5 p-1.5 bg-gray-900 text-white"}>
                            <button>
                                <Telegram />
                            </button>
                            <button>
                                <Instagram />
                            </button>
                            <button>
                                <Facebook />
                            </button>
                            <button>
                                <WhatsApp />
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
            <div className={"h-[40px] align-items-center items-center relative flex justify-end w-full bg-gray-900 text-white"}>
                <div className="absolute top-0 right-1/2 translate-x-[50%] my-2">
                    <img width={200} height={100} src={logoAutoDoc} alt=""/>
                </div>
                <div onClick={() => navigate("/login")} className={"absolute top-0 my-2 pr-6 cursor-pointer"}>
                    <PersonOutlineOutlined/>Sign in
                </div>
            </div>


            <div className={"absolute top-0  h-[60px] items-center relative flex justify-evenly bg-gray-900 text-white"}>
               <div className={'flex justify-evenly gap-5'}>
                   {/*Ehtiyot qismlar*/}
                   <div>
                       {/*// className={"ml-6  ml-[40px]  absolute top-[0%] my-1 left-0 md:left-[0%] md:translate-x-[-0%] translate-y-[-0%] max-w-[25%] md:max-w-[25%]"}>*/}

                       <div className={'my-1 p-0 flex align-items-center '} style={{width:250, height:40, backgroundColor:'#132530'}}>
                           <div className={'text-white m-0 flex justify-evenly mx-2 gap-1'}>
                               <CarCrash color={"warning"}/>
                              <p style={{fontSize:" 16px",
                                  fontWeight: 400,
                                  lineHeight: "24px",
                                  letterSpacing: "0em",
                                  textAlign:" left",
                                  color: "#727272",}}> Ehtiyot qismlar</p>
                           </div>

                       </div>
                   </div>
                   {/*search*/}
                   <div className={'flex gap-1'}>
                       {/*// className={"input-group ml-[20px] md:ml-0 absolute top-[50%] left-0 md:left-[50%] md:translate-x-[-50%] translate-y-[-50%] max-w-[50%] md:max-w-[50%]"}>*/}
                       <input style={{width:500, height:40}} placeholder={"Ehtiyot qism nomini kiriting"} type="text" className={"form-control "}/>
                       <Button className={"h-[40px] w-[100px] bg-blue-600 border-none text-white px-1 sm:px-0"}>
                           Search
                       </Button>
                   </div>
                   {/*basket*/}
                   <div
                       onClick={() => {
                           navigate('/basket')
                       }}>
                       <div className={'my-1 p-0 flex align-items-center '} style={{width:250, height:40, backgroundColor:'#132530'}}>
                           <div className={'text-white m-0 d-flex justify-content-between mx-2 gap-2'}>
                              <div className={'flex'}>
                                  <ShoppingCartOutlined color={"warning"} className={"text-7xl"}/>

                                  <div style={{fontSize:" 14px",
                                      fontWeight: 400,
                                      lineHeight: "24px",
                                      letterSpacing: "0em",
                                      textAlign:" left",
                                      color: "#727272",}}>
                                      {length}-items
                                  </div>
                              </div>
                               <div className={'my-1'}>
                                   <p style={{ fontSize: "22px",
                                       fontWeight: 700,
                                       lineHeight: "16px",
                                       textAlign: "left",
                                       color: "#f37c2e"}} >{calcTotal()} So'm</p>
                               </div>

                           </div>

                       </div>
                   </div>
               </div>
            </div>


          <div className={'absolute top-0  h-[40px] items-center relative flex justify-evenly bg-gray-900 text-white'}>
              {brands?.content?.map(brand=>
              <div className={'flex gap-1'}>
                  <LazyLoadImage effect={"blur"} className={"rounded-3xl my-1 "}
                                 width={35} height={35}
                                 src={`http://localhost:8080/api/v1/file/getFile/${brand?.photo?.id}`}
                                 alt="User avatar"/>
                  <p
                  style={{
                      fontSize:" 18px",
                      fontWeight: 400,
                      lineHeight: "24px",
                      letterSpacing: "0em",
                      textAlign:" left",
                      color: "#727272",
                  }}
                  > {brand.name}</p>
              </div>
              )}
          </div>

        </div>
    );
}

export default Header;