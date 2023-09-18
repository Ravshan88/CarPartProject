import React, {useEffect, useState} from "react";

import {ToastContainer, toast} from "react-toastify";

import instance from "../utils/config/instance";

function Home() {

    return (
        <div >
            <h1>home</h1>
            <ToastContainer/>

        </div>
    );
}

export default Home;
