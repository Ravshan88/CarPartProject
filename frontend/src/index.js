import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import './index.css';
import 'remixicon/fonts/remixicon.css'
import {BrowserRouter} from "react-router-dom";
import {SidebarProvider} from "./components/admin/Sidebar/SidebarContext";

import {Provider} from "react-redux";
import {store} from "./redux/store"
import {NextUIProvider} from "@nextui-org/react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <NextUIProvider>
        <SidebarProvider>
            <BrowserRouter>
                <Provider store={store}>
                    <App/>
                </Provider>
            </BrowserRouter>
        </SidebarProvider>
    </NextUIProvider>
);

