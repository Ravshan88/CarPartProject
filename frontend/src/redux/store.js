import {combineReducers, configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import login from "./reducers/LoginSlice"
import adminAdmins from "../redux/reducers/AdminAdminSlice";
import adminOperators from "../redux/reducers/AdminOperatorSlice";
import adminBrand from "../redux/reducers/AdminBrandSlice"
import adminCarPart from "../redux/reducers/AdminCartPartSlice"
import adminCar from "../redux/reducers/AdminCarSlice"
import adminProduct from "../redux/reducers/AdminProductSlice"
import operatorOrder  from "./reducers/OperatorOrdersSlice"
const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
    login,
    adminAdmins,
    adminOperators,
    adminBrand,
    adminCarPart,
    adminCar,
    adminProduct,
    operatorOrder
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware({serializableCheck: false}).concat(sagaMiddleware);
    }
});
sagaMiddleware.run(rootSaga);
