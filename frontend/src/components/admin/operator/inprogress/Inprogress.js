import React, {useContext, useEffect, useState} from 'react';
import PageTitle from "../../PageTitle";
import {
    changeStatusOrder,
    getOrdersStart
} from "../../../../redux/reducers/OperatorOrdersSlice";
import {useDispatch, useSelector} from "react-redux";
import Pagination from '@mui/material/Pagination';

import {

    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHeader,
    TableRow
} from "@windmill/react-ui";
import {Tooltip} from "@nextui-org/react";
import Loader from "../../../../ui/loader";
import {EditIcon} from "../../EditIcon";
import {DeleteIcon} from "../../DeleteIcon";
import {Modal} from "react-bootstrap";
import Render from "../Render/Render";
import {EyeIcon} from "../../EyeIcon";
import {LocationOnOutlined, ShareOutlined} from "@mui/icons-material";
import {
    FullscreenControl,
    GeolocationControl,
    Map, Placemark, SearchControl,
    TrafficControl,
    TypeSelector,
    YMaps,
    ZoomControl
} from "react-yandex-maps";

function Inprogress(props) {
    const {orders, isLoading} = useSelector(state => state.operatorOrder)
    const dispatch = useDispatch();


    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(getOrdersStart({status: "INPROGRESS", page: currentPage, size: itemsPerPage}));

    }, [dispatch, currentPage, itemsPerPage]);

    function formatDate(inputDate) {
        const date = new Date(inputDate);

        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        return `${hours}:${minutes}, ${day}.${month}.${year}`;
    }

    function changeTableDataPage(param) {
        setCurrentPage(param.page)

    }

    function changeStatus(id) {
        dispatch(changeStatusOrder({status: "INPROGRESS", orderId: id, page: currentPage, size: itemsPerPage}));

    }

    function changeStatusToDeclined(id) {
        dispatch(changeStatusOrder({status: "DECLINED", orderId: id, page: currentPage, size: itemsPerPage, really:"INPROGRESS"}));

    }

    const [showModal, setShowModal] = useState(false)
    const [currentProduct, setCurrentProduct] = useState({})
    const [currentOrder, setCurrentOrder] = useState({})
    const [modalIsVisible, setModalIsVisible] = useState(false);

    function showProductModal(product) {
        setShowModal(true)
        setCurrentProduct(product)
    }

    function openModal(order) {
        console.log(order)
        setCurrentOrder(order)
        setModalIsVisible(true)
    }
    function shareLocation(currentLocation) {
        console.log(currentLocation)
        const latitude = currentLocation?.latitude ;
        const longitude = currentLocation?.longitude ;
        console.log(latitude)
        const telegramLink = `https://t.me/share/url?url=https://maps.google.com/maps?q=${latitude},${longitude}`;

        // Open the link in a new window or tab
        window.open(telegramLink, '_blank');
    }


    return (
        <div className={` h-screen  bg-gray-900 `}>
            <PageTitle>Inprogress</PageTitle>

            {isLoading ? <Loader/>
                :
                <>
                    <div className="mt-4 flex justify-between items-center text-white">
                        <div className="flex items-center">
                            <span>Show:</span>
                            <select
                                value={itemsPerPage}
                                className="ml-2 p-2 border rounded text-dark"
                                onChange={(e) => {
                                    setItemsPerPage(parseInt(e.target.value))
                                    setCurrentPage(1)

                                }}
                            >
                                <option value="9999">All</option>
                                <option value="5">5</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                            </select>
                            <span className="ml-2"></span>
                        </div>


                    </div>

                    <div className={"mt-2"}>
                        <TableContainer className={"mb-0"}>
                            <Table>
                                <TableHeader>
                                    <tr>
                                        <TableCell style={{width: 30}}>№</TableCell>
                                        <TableCell>Mijoz ismi</TableCell>
                                        <TableCell>Mijoz raqami</TableCell>
                                        <TableCell>Mijoz manzili</TableCell>

                                        <TableCell>Buyurtma</TableCell>
                                        <TableCell>Buyurtma sanasi</TableCell>
                                        <TableCell>Action</TableCell>
                                    </tr>
                                </TableHeader>
                                <TableBody>
                                    {orders.content?.map((order, i) => (
                                        <TableRow className={"border"} key={i}>
                                            <TableCell>
                                                <div>
                                                    <p className="font-semibold">{i + 1}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <p className="font-semibold">{order.order.client_name}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <p className="font-semibold">{order.order.phone_number}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div >
                                                    {order.order.longitude=="" || order.order.longitude==0?"manzil mavjud emas":
                                                        <>

                                                            <button className="btn btn-outline-success" onClick={()=>openModal(order.order)}>
                                                                <LocationOnOutlined />

                                                            </button>
                                                            <button className="btn btn-outline-primary" onClick={()=>shareLocation(order.order)}>
                                                                <ShareOutlined/>

                                                            </button>
                                                        </>
                                                    }

                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    {
                                                        order?.products.map((myProduct, index) =>
                                                            <div
                                                                title={"Batafsil"}
                                                                className={'flex justify-between border rounded p-1 mb-1 hover:bg-gray-100  cursor-pointer gap-2'}
                                                                onClick={() => showProductModal(myProduct.product)}
                                                            >
                                                                <div
                                                                    className={'flex items-center gap-2'}>
                                                                    <span className={"text-gray-500"}>
                                                                        mahsulot:
                                                                    </span>
                                                                    <p className={"text-green-500 w-[80px] line-clamp-1"}>{myProduct.product.name}</p>
                                                                    soni: <p> {myProduct.count}</p>

                                                                </div>
                                                                <div className={"flex items-center"}>
                                                                    <Tooltip content="Batafsil">
                                                                          <span
                                                                              onClick={() => showProductModal(myProduct.product)}
                                                                              className="text-blue-300 text-lg cursor-pointer active:opacity-50">
                                                                            <EyeIcon/>
                                                                          </span>
                                                                    </Tooltip>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <p className="font-semibold">{formatDate(order.order.createdAt)}</p>
                                            </TableCell>
                                            <TableCell>
                                                <div className="relative flex items-center gap-2">
                                                    <Tooltip content="Bajarildiga o'tkazish">
                                                  <span onClick={() => changeStatus(order.order.id)}
                                                        className=" text-lg text-default-400 cursor-pointer active:opacity-50">
                                                    <EditIcon/>
                                                  </span>
                                                    </Tooltip>
                                                    <Tooltip color="danger" content="Rad etish">
                                                  <span onClick={() => changeStatusToDeclined(order.order.id)}
                                                        className="text-lg text-danger cursor-pointer active:opacity-50">
                                                    <DeleteIcon/>
                                                  </span>
                                                    </Tooltip>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                        </TableContainer>
                        <div className={"bg-gray-200 flex items-center justify-around w-full h-10 gap-9 mt-1 rounded"}>
                            <div>
                                {orders.totalElements !== 0 ? currentPage : 0}-{Math.min(itemsPerPage, orders.totalElements, orders?.content?.length)}/{orders.totalElements}
                            </div>
                            <div>
                                {orders.totalPages > 1 &&
                                    <Pagination onChange={(e, page) => (changeTableDataPage({page: page}))}
                                                page={currentPage}
                                                count={orders.totalPages}
                                                color={'primary'}
                                                variant={"outlined"}
                                                shape="rounded"/>}
                            </div>
                        </div>
                    </div>
                </>
            }


            <Modal
                width={900}
                show={showModal}
                onHide={() => {
                    setShowModal(false);
                    setCurrentProduct({});
                }}
            >
                <Modal.Header closeButton>

                </Modal.Header>
                <Modal.Body closeButton>
                    {showModal && <Render product={currentProduct}/>}
                </Modal.Body>
            </Modal>

            <div className={'modal'}>
                <Modal show={modalIsVisible} onHide={()=>setModalIsVisible(false)}>
                    <Modal.Header closeButton>
                        <p className={'text-warning '} style={{fontSize:22}}> {currentOrder.client_name}</p>
                        <p className={'mx-1'}> manzili</p>
                    </Modal.Header>
                    <Modal.Body>


                        <div className="right-side">
                            <YMaps query={{apikey:"8edc3e7a-dd1a-4d9e-87d0-2d9c9865170e", lang:"en_US", coordorder:"latlong"}}>
                                <Map
                                    onLoad={(e) => {
                                        console.log(e);
                                    }}
                                    width={470}
                                    height={300}
                                    state={{ center: currentOrder?.latitude!=="" ?[currentOrder?.latitude, currentOrder?.longitude]:[41.29996016407254, 69.32103652507048], zoom: 9 }}
                                    modules={['templateLayoutFactory']}
                                >
                                    <FullscreenControl options={{float: "left"}}/>
                                    <GeolocationControl options={{float: "right"}}/>
                                    <TrafficControl options={{float: "right"}}/>
                                    <ZoomControl options={{float: "left"}}/>
                                    <TypeSelector options={{float: "right"}}/>
                                    <SearchControl options={{float: "left"}}/>
                                    { currentOrder?.longitude !== "" && currentOrder?.latitude !== "" && (
                                        <Placemark
                                            geometry={[currentOrder?.latitude, currentOrder?.longitude]}
                                            modules={['geoObject.addon.balloon']}
                                        />

                                    )}
                                </Map>
                            </YMaps>

                        </div>

                        <button className="btn btn-primary my-2" onClick={()=>shareLocation(currentOrder)}>
                            <ShareOutlined/>
                            Uzatish
                        </button>


                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );

}

export default Inprogress;