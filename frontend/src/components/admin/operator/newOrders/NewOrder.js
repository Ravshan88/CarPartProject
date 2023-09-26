import React, {useContext, useEffect, useState} from 'react';
import PageTitle from "../../PageTitle";
import {
    changeStatusOrder,
    getOrdersStart
} from "../../../../redux/reducers/OperatorOrdersSlice";
import {useDispatch, useSelector} from "react-redux";
import Pagination from '@mui/material/Pagination';
import '../Render/showProduct.css'
import {

    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHeader,
    TableRow
} from "@windmill/react-ui";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {Tooltip} from "@nextui-org/react";
import Loader from "../../../../ui/loader";
import {EyeIcon} from "../../EyeIcon";
import {EditIcon} from "../../EditIcon";
import {DeleteIcon} from "../../DeleteIcon";
import {Modal} from "react-bootstrap";
import uploadImg from "../../../images/upload.png";
import {Button} from "antd";
import {Delete} from "@mui/icons-material";
import {setBase64} from "../../../../redux/reducers/AdminCarSlice";
import Render from "../Render/Render";

function NewOrder(props) {
    const {orders, isLoading} = useSelector(state => state.operatorOrder)
    const dispatch = useDispatch();


    const [itemsPerPage, setItemsPerPage] = useState(5); // Default to 5 items per page
    const [currentPage, setCurrentPage] = useState(1); // Default to the first page

    useEffect(() => {
        dispatch(getOrdersStart({ status: "NEW", page: currentPage, size: itemsPerPage }));

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
        dispatch(changeStatusOrder({ status: "NEW",  orderId:id, page: currentPage, size: itemsPerPage}));

    }

    function changeStatusToDeclined(id) {
        dispatch(changeStatusOrder({ status: "DECLINED",  orderId:id, page: currentPage, size: itemsPerPage}));

    }
const[showModal, setShowModal]=useState(false)
    const [currentProduct, setCurrentProduct]=useState({})
    function showProductModal(product) {
        setShowModal(true)
        setCurrentProduct(product)
    }

    return (
        <div className={` h-screen  bg-gray-900 `}>
            <PageTitle>New order</PageTitle>


            {isLoading?<Loader/>
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
                    <div style={{
                        backgroundColor:"wheat",
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        width: '100%',
                        height: 40,
                        gap: "30px",
                    }}>

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
                    <TableContainer className="mb-8">
                        <Table className={'table table-bordered'}>
                            <TableHeader>
                                <tr>
                                    <TableCell style={{width:30}}>№</TableCell>
                                    <TableCell  >Mijoz ismi</TableCell>
                                    <TableCell >Mijoz raqami</TableCell>

                                    <TableCell>Buyurtma</TableCell>
                                    <TableCell style={{width:70}}>Buyurtma sanasi</TableCell>
                                    <TableCell style={{width:40}}>Action</TableCell>
                                </tr>
                            </TableHeader>
                            <TableBody>
                                {orders.content?.map((order, i) => (
                                    <TableRow key={i}>

                                        <TableCell>
                                            <div>
                                                <p className="font-semibold">{i+1}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div >
                                                <p className="font-semibold">{order.order.client_name}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                <p className="font-semibold">{order.order.phone_number}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className={''}>
                                                {
                                                    order?.products.map((myProduct, index)=>
                                                        <div className={'d-flex justify-content-between gap-2 featured_text'}
                                                             onClick={()=>showProductModal(myProduct.product)}
                                                        >
                                                           <div className={'d-flex align-items-center gap-2 featured_text'}>
                                                               mahsulot :<p style={{fontSize:20}}>{myProduct.product.name}</p>
                                                               soni: <p className="sub"> {myProduct.count}</p>
                                                           </div>
                                                            <div>
                                                                <i>batafsil..</i>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                <p className="font-semibold">
                                                    <p className="font-semibold">{formatDate(order.order.createdAt)}</p>
                                                </p>

                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="relative flex items-center gap-2">
                                                <Tooltip content="Jarayonga o'tkazish">
                                                  <span   onClick={()=>changeStatus(order.order.id)}
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
                    {showModal && <Render product={currentProduct} />}
                </Modal.Body>
            </Modal>


        </div>
    );

}

export default NewOrder;