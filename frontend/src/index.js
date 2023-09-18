import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./redux/store"
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {YMaps} from "react-yandex-maps";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <YMaps query={{apikey:"8edc3e7a-dd1a-4d9e-87d0-2d9c9865170e", lang:"en_US", coordorder:"latlong"}}>
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
    </YMaps>
);


