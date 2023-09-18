import React, {useEffect, useState} from "react";

import {ToastContainer, toast} from "react-toastify";

import instance from "../utils/config/instance";

function AdminHome() {

    return (
        <div >
            <h1>Admin home</h1>
            <ToastContainer/>

        </div>
    );
}

export default AdminHome;
