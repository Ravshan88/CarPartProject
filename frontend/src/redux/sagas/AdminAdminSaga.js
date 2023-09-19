import {call, put, takeLatest} from "redux-saga/effects";
import instance from "../../components/utils/config/instance";

import {
    saveAdmin,
    deleteAdmin,
    setError,
    addAdmin,
    setAdminData,
    getAdminData,// Import the setAdminData action
} from "../reducers/AdminAdminSlice";

function* getAdminDataAsync() {
    try {
        const response = yield call(() => instance("/api/v1/auth/admin", "GET"));

        yield put(setAdminData(response.data));
    } catch (error) {
        yield put(setError(error.message));
    }
}

function* saveAdminAsync(action) {
    try {
        const response = yield call(() =>instance("/api/v1/auth/register/admin", "POST", action.payload));
    } catch (error) {
        yield put(setError(error.message));
    }
}

function* deleteAdminAsync(action) {
    try {
        const {adminId} = action.payload;
        yield instance(`/api/auth/admin/${adminId}`, "DELETE");
    } catch (error) {
        yield put(setError(error.message));
    }
}


export function* adminAdminSaga() {
    yield takeLatest(saveAdmin, saveAdminAsync);
    yield takeLatest(deleteAdmin, deleteAdminAsync);
    yield takeLatest(addAdmin, saveAdminAsync);
    yield takeLatest(getAdminData, getAdminDataAsync);
}
