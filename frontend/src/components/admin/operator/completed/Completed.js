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
    TableFooter,
    TableHeader,
    TableRow
} from "@windmill/react-ui";
import Loader from "../../../../ui/loader";

function Completed(props) {
    const {orders, isLoading} = useSelector(state => state.operatorOrder)
    const dispatch = useDispatch();


    const [itemsPerPage, setItemsPerPage] = useState(5); // Default to 5 items per page
    const [currentPage, setCurrentPage] = useState(1); // Default to the first page

    useEffect(() => {
        dispatch(getOrdersStart({status: "COMPLETED", page: currentPage, size: itemsPerPage}));

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
        dispatch(changeStatusOrder({status: "COMPLETED", orderId: id, page: currentPage, size: itemsPerPage}));

    }

    return (
        <div className={` h-screen  bg-gray-900 `}>
            <PageTitle>Completed</PageTitle>


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
                        <TableContainer className="mb-0">
                            <Table>
                                <TableHeader>
                                    <tr>
                                        <TableCell style={{width: 30}}>№</TableCell>
                                        <TableCell style={{width: 200}}>Mijoz ismi</TableCell>
                                        <TableCell style={{width: 70}}>Mijoz raqami</TableCell>

                                        <TableCell>Buyurtma</TableCell>
                                        <TableCell style={{}}>Buyurtma sanasi</TableCell>
                                    </tr>
                                </TableHeader>
                                <TableBody>
                                    {orders.content?.map((order, i) => (
                                        <TableRow key={i}>

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
                                                <div>
                                                    {
                                                        order?.products.map((myProduct, index) =>
                                                            <div
                                                                className={'flex border rounded p-1 mb-1 items-center gap-2'}>
                                                                <span
                                                                    className={"text-gray-500"}>
                                                                        mahsulot:
                                                                </span>
                                                                <p className={"text-green-500 w-[80px] line-clamp-1"}>{myProduct.product.name}</p>
                                                                <p> soni:{myProduct.count}</p></div>
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


        </div>
    );

}

export default Completed;