import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { AddShoppingCart, HdrPlus} from "@mui/icons-material";
import Header from "../Header/Header";
import {DeleteIcon} from "../../admin/DeleteIcon";
import {Tooltip} from "@nextui-org/react";
import {LazyLoadImage} from "react-lazy-load-image-component";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useDispatch, useSelector} from "react-redux";
import {Modal} from "react-bootstrap";
import {Controller, useForm} from "react-hook-form";
import {saveOrder} from "../../../redux/reducers/OperatorOrdersSlice";
import PhoneInput from "react-phone-number-input";

function Index(props) {
    const dispatch = useDispatch();

    const [basket, setBasket] = useState([]);
    const navigate = useNavigate();
    const {error} = useSelector(state => state.adminOperators)

    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '+998',
    });

    useEffect(() => {
        let y = localStorage.getItem("basket");
        if (y != null) {
            setBasket(JSON.parse(y));
        }
    }, []);

    function calcTotal() {
        let s = 0;
        basket.map(item => {
            s += item.price * item.amount;
        });
        return s;
    }

    function plus(id) {
        basket.map(item => {
            if (item.id === id) {
                item.amount++;
            }
        });
        setBasket([...basket]);
        savaToLocal(basket);
    }

    function minus(id) {
        basket.map(item => {
            if (item.id === id) {
                if (item.amount === 0) {

                } else {
                    item.amount--;
                }
            }
        });
        setBasket([...basket]);
        savaToLocal(basket);
    }

    function savaToLocal(b) {
        localStorage.setItem('basket', JSON.stringify(basket));
    }

    const openModal = () => {
        setModalIsVisible(true);
    };

    const closeModal = () => {
        setModalIsVisible(false);
    };


    const loginUser = async (event) => {
        await handleSubmit(() => console.log(formData))(event);
        closeModal();
        saveOrders()
    };


    const {
        handleSubmit,
        control,
        formState: { errors }
    } = useForm();

    function saveOrders() {
        if (basket.length === 0) {
            alert("Siz mahsulot tanlamagansiz");
            return;
        }
        let arr = basket.filter(item => item.id !== 0);
        const newOrderArray = arr.map(({ id, amount }) => ({ productId: id, amount }));

        let reqToOrders = {
            reqOrders: newOrderArray,

            client_name:formData.fullName,
            phone:formData.phone,


        };
        dispatch(saveOrder(reqToOrders))
        if(error){
        }else{
            setBasket([])
            localStorage.setItem('basket', JSON.stringify([]))

        }


    }

    function deleteFromBasket(id) {
        let arr = basket.filter(item => item.id !== id);
        setBasket(arr);
        localStorage.setItem("basket", JSON.stringify(arr));
    }

    function closeAskModal() {
        setModalIsVisible(false);
    }


    return (
        <div>
            <Header/>
            <div className={"container"}>
                <div className={"flex gap-3"}>
                    <ArrowBackIcon className={"cursor-pointer hover:scale-110"} color={"primary"} onClick={() => {
                        navigate(-1)
                    }}/>
                    <h1 className={"text-xl"}>Basket</h1>
                </div>

                <hr/>
                {basket.length === 0 &&
                    <div className={"text-center "}>
                        Sizda tanlangan maxsulot yo`q!
                    </div>
                }
                <div className={"flex mt-2 px-3 justify-center gap-2"}>
                    <div className={'container'}>
                        <ul className='List-group w-[100%]'>
                            {
                                basket.map(item => <li key={item.id} className=' list-group-item'>
                                        <div
                                            className='d-flex justify-content-between bg-gray-100 mb-2 align-items-center p-2 px-4'>
                                            <LazyLoadImage effect={"blur"} width={100} height={100}
                                                           src={`http://localhost:8080/api/v1/file/getFile/${item?.photo?.id}`}
                                                           alt="d"/>

                                            <div>
                                                <h2 style={{width: 200}}>{item.name}</h2>
                                            </div>
                                            <div className='flex align-items-center gap-3 p-1 h-75'>
                                                <button
                                                    className={"bg-orange-500 text-white cursor-pointer rounded-3xl flex justify-center align-items-center border w-[30px] h-[30px]"}
                                                    onClick={() => minus(item.id)}>
                                                    -
                                                </button>
                                                <h3> {item.amount}</h3>
                                                <button
                                                    className={"bg-orange-500 text-white cursor-pointer rounded-3xl flex justify-center align-items-center border w-[30px] h-[30px]"}
                                                    onClick={() => plus(item.id)}>
                                                    +
                                                </button>
                                            </div>
                                            <div>
                                                <h2 className={"text-green-500 font-semibold"}>{item.price} so`m</h2>
                                            </div>
                                            <div>
                                                <Tooltip color="danger" content="O`chirish">
                                          <span onClick={() => deleteFromBasket(item.id)}
                                                className="text-2xl text-danger cursor-pointer active:opacity-50">
                                            <DeleteIcon/>
                                          </span>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                    <div className={" w-[20%] h-[200px] rounded relative"}>
                        <div>
                            <h2 className={"font-thin text-center m-2 "}>
                                Umumiy hisob
                            </h2>
                            <hr/>
                            <div className={"flex flex-col px-4 gap-2 mt-2"}>
                                <div className={"flex justify-between"}>
                                    <p className={"text-green-500 font-semibold"}>
                                        Mahsulot soni:
                                    </p>
                                    <p>{JSON.parse(localStorage.getItem('basket'))?.length} ta</p>
                                </div>
                                <div className={"flex justify-between"}>
                                    <p className={"text-green-500 font-semibold"}>
                                        Jami:
                                    </p>
                                    <p>{calcTotal()} so'm</p>
                                </div>
                            </div>
                            <div className={"absolute bottom-0 w-full"}>
                                <button className='bg-green-600 w-full text-white rounded py-1'
                                        onClick={openModal}>sotib
                                    olish
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'modal'}>
                <Modal show={modalIsVisible} onHide={closeAskModal}>
                    <Modal.Header closeButton>
                        Malumot laringizni kiriting
                    </Modal.Header>
                    <Modal.Body>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(loginUser)}>
                            <div className="mb-3">
                                <label htmlFor="fullName" className="form-label">Ism Familya</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="fullName"
                                    placeholder="Enter your full name"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                    Phone</label>
                                <Controller
                                    name='phone'
                                    control={control}
                                    defaultValue='+998'
                                    rules={{ required: "Phone Number is required" }}
                                    render={({ field }) => (
                                        <div>
                                            <PhoneInput
                                                id={"phone"}
                                                {...field}
                                                defaultCountry='UZ'
                                                limitMaxLength={true}
                                                placeholder='+998'
                                                value={formData.phone}
                                                onChange={(value) => setFormData({ ...formData, phone: value })}
                                            />
                                        </div>
                                    )}
                                />
                            </div>
                            <button type="submit">rasmiylashtirish</button>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
}

export default Index;