import {call, put, takeLatest} from "redux-saga/effects";
import instance from "../../components/utils/config/instance";

import {
    saveOperator,
    deleteOperator,
    setError,
    addOperator,
    setOperatorData,
    getOperatorData, editOperator,// Import the setAdminData action
} from "../reducers/AdminOperatorSlice";
import {getAdminData} from "../reducers/AdminAdminSlice";

function* getOperatorDataAsync() {
    try {
        const response = yield call(() => instance("/api/v1/auth/operator", "GET"));
        yield put(setOperatorData(response.data));
    } catch (error) {
        yield put(setError(error.message));
    }
}

function* saveOperatorAsync(action) {
    try {
        const response = yield call(() => instance("/api/v1/auth/register/operator", "POST", action.payload));
        yield put(getOperatorData())

    } catch (error) {
        yield put(setError(error.message));
    }
}

function* editOperatorAsync(action) {
    try {
        const id = action.payload.id;

        const response = yield call(() => instance('/api/v1/auth/user/' + id, 'PUT', action.payload.data))
        yield put(getOperatorData())

    } catch (error) {
        yield put(setError(error.message))
    }
}

function* deleteOperatorAsync(action) {
    try {
        const OperatorId = action.payload;
        yield instance(`/api/v1/auth/user/${OperatorId}`, "DELETE");
        yield put(getOperatorData())
    } catch (error) {
        yield put(setError(error.message));
    }
}


export function* adminOperatorSaga() {
    yield takeLatest(saveOperator, saveOperatorAsync);
    yield takeLatest(deleteOperator, deleteOperatorAsync);
    yield takeLatest(addOperator, saveOperatorAsync);
    yield takeLatest(editOperator, editOperatorAsync);
    yield takeLatest(getOperatorData, getOperatorDataAsync);
}
