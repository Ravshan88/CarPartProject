import {call, put, takeLatest} from "redux-saga/effects";
import instance from "../../components/utils/config/instance";
import {
    setError,
} from "../reducers/AdminAdminSlice";
import * as saveAdminAction from "@testing-library/user-event/dist/type";
import * as deleteAdminAction from "@testing-library/user-event/dist/type";

function* saveAdminAsync(action) {
    try {
        const {adminData} = action.payload;
        const response = yield instance("/api/auth/admin", "POST", adminData);
    } catch (error) {
        yield put(setError(error.message));
    }
}

function* deleteAdminAsync(action) {
    try {
        const { adminId } = action.payload;
        yield instance(`/api/auth/admin/${adminId}`, "DELETE");
        // Handle successful delete and dispatch appropriate actions
    } catch (error) {
        yield put(setError(error.message));
    }
}

export function* adminAdminSaga(){
    yield takeLatest(saveAdminAction.type, saveAdminAsync);
    yield takeLatest(deleteAdminAction.type, deleteAdminAsync);
}

