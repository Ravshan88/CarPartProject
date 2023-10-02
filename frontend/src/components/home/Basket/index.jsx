import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {AddShoppingCart, HdrPlus} from "@mui/icons-material";
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
        formState: {errors}
    } = useForm();

    function saveOrders() {
        if (basket.length === 0) {
            alert("Siz mahsulot tanlamagansiz");
            return;
        }
        let arr = basket.filter(item => item.id !== 0);
        const newOrderArray = arr.map(({id, amount}) => ({productId: id, amount}));

        let reqToOrders = {
            reqOrders: newOrderArray,
            client_name: formData.fullName,
            phone: formData.phone,
        };
        dispatch(saveOrder(reqToOrders))
        if (error) {
        } else {
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
                <div className={"flex px-3 justify-center gap-2"}>
                    <div className={'container'}>
                        <div className="bg-white shadow-md rounded my-6">
                            <table className="min-w-max w-full table-auto">
                                <thead>
                                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    <th className="py-3 px-6 "> Photo</th>
                                    <th className="py-3 px-6 ">Name</th>
                                    <th className="py-3 px-6 ">Count</th>
                                    <th className="py-3 px-6 ">Price</th>
                                    <th className="py-3 px-6 ">Action</th>
                                </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm font-light">
                                {
                                    basket.map(item => <tr key={item.id}
                                                           className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-3  px-6 text-left whitespace-nowrap">
                                            <LazyLoadImage effect={"blur"} width={100}
                                                           src={`http://localhost:8080/api/v1/file/getFile/${item?.photo?.id}`}
                                                           alt="d"/>
                                        </td>
                                        <td className="py-3  px-6 whitespace-nowrap">
                                            <h2 style={{width: 200}}>{item.name}</h2>
                                        </td>
                                        <td className="py-3  px-6 whitespace-nowrap">
                                            <div className='flex align-items-center gap-3 p-1 h-75'>
                                                <button
                                                    className={" shadow-2xl bg-orange-500 text-white cursor-pointer rounded-3xl flex justify-center align-items-center border w-[30px] h-[30px]"}
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
                                        </td>
                                        <td className="py-3  px-6  whitespace-nowrap">
                                            <h2 className={"text-green-500 font-semi-bold"}>{item.price.toLocaleString()} so`m</h2>
                                        </td>
                                        <td className="py-3  px-6  whitespace-nowrap">
                                            <Tooltip color="danger" content="O`chirish">
                                          <span onClick={() => deleteFromBasket(item.id)}
                                                className="text-2xl text-danger cursor-pointer active:opacity-50">
                                            <DeleteIcon/>
                                          </span>
                                            </Tooltip>
                                        </td>
                                    </tr>)
                                }
                                </tbody>
                            </table>
                        </div>

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
                                    <p>{calcTotal().toLocaleString()} so'm</p>
                                </div>
                            </div>
                            <div className={"absolute rounded shadow-2xl bottom-0 w-full"}>
                                <button className=' bg-green-600 w-full text-white rounded py-1'
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
                                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                                />
                            </div>
                            <div>
                                <label htmlFor="phone"
                                       className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                    Phone</label>
                                <Controller
                                    name='phone'
                                    control={control}
                                    defaultValue='+998'
                                    rules={{required: "Phone Number is required"}}
                                    render={({field}) => (
                                        <div>
                                            <PhoneInput
                                                id={"phone"}
                                                {...field}
                                                defaultCountry='UZ'
                                                limitMaxLength={true}
                                                placeholder='+998'
                                                value={formData.phone}
                                                onChange={(value) => setFormData({...formData, phone: value})}
                                            />
                                        </div>
                                    )}
                                />
                            </div>
                            <button className={"w-full bg-green-600 text-white rounded p-1 hover:bg-green-500"}
                                    type="submit">Saqlash
                            </button>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
}

export default Index;