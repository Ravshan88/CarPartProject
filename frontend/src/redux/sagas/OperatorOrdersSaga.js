import {call, put, takeLatest} from "redux-saga/effects";
import instance from "../../components/utils/config/instance";

import {
    saveOrder,
    getOrdersStart,
    getOrdersFailure,
    getOrdersSuccess,
    changeStatusOrder
} from "../reducers/OperatorOrdersSlice";
import {toast} from "react-toastify";
import {getCarPart} from "../reducers/AdminCartPartSlice";
import {getOperatorData, setError} from "../reducers/AdminOperatorSlice";

function* workGetOrders(action) {
    try {
        const {status, page, size} = action.payload;
        const url = `/api/v1/order?status=${status}&page=${page}&size=${size}`;
        const response = yield call(() => instance(url, "get"));
        yield put(getOrdersSuccess(response.data));
    } catch (error) {
        yield put(getOrdersFailure(error.message));
    }
}

function* workChangeStatusOrder(action) {
    try {
        const {status, orderId, page, size} = action.payload;

        const response = yield call(() => instance('/api/v1/order/' + orderId, 'put', null, {status: status}));
        yield put(getOrdersStart({status, page, size}))
    } catch (error) {
        toast.error("Serverda xatolik!");
    }
}

function* workSaveOrder(action) {
    try {
        const response = yield call(() => instance("/api/v1/order", "POST", action.payload));
        if(response.data===401){
            yield put(setError(true))
            toast.error("Bazada xatolik qaytib urinib ko'ring");
        }
        toast.success("Buyurtmangiz qabul qilindi. Operator tez orada siz bilan bog'lanadi");
    } catch (error) {
        yield put(setError(true))
        toast.error("Bazada xatolik qaytib urinib ko'ring");
    }
}

export function* operatorOrderSaga() {
    yield takeLatest(getOrdersStart.type, workGetOrders);
    yield takeLatest(changeStatusOrder.type, workChangeStatusOrder);
    yield takeLatest(saveOrder.type, workSaveOrder);
}
