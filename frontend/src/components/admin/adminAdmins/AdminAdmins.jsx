import React, {useContext, useEffect, useState} from 'react';
import PageTitle from "../PageTitle";
import {
    Table,
    TableHeader,
    TableCell,
    TableBody,
    TableRow,
    TableFooter,
    TableContainer,
    Badge,
    Avatar,
    Button,
    Pagination,
} from '@windmill/react-ui'
import { EditIcon, TrashIcon } from '../Sidebar/icons/index'

function AdminAdmins(props) {

    return (
        <div className={` h-screen  bg-gray-900 `}>
            <PageTitle>
                AdminAdmins
            </PageTitle>





        </div>
    );
}

export default AdminAdmins;