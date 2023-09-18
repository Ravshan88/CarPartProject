import { call, put, takeLatest } from "redux-saga/effects";
import instance from "Components/utils/config/instance";
import {
    setLoading,
    saveAdminAction,
    deleteAdminAction,
    setError,
    setAdmins,
} from "../reducers/AdminAdminSlice";

function* saveAdminAsync(action) {
    try {
        const { adminData } = action.payload;
        const response = yield instance("/api/auth/admin", "POST", adminData);
        // Handle response and dispatch appropriate actions
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

// Watcher Saga: Watches for saveAdminAction and deleteAdminAction
function* watchSaveAdmin() {
    yield takeLatest(saveAdminAction.type, saveAdminAsync);
}

function* watchDeleteAdmin() {
    yield takeLatest(deleteAdminAction.type, deleteAdminAsync);
}

export function* adminAdminSaga() {
    yield all([watchSaveAdmin(), watchDeleteAdmin()]);
}
