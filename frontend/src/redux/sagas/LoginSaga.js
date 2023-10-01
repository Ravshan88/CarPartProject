import {call, put, takeLatest} from "redux-saga/effects";
import {
    signUserStart,
    UserFailure,
    UserLogIn,
    UserSuccess
} from "../reducers/LoginSlice";
import axios from "axios";
import {toast} from "react-toastify";
import instance from "../../components/utils/config/instance";

function* workLoginUser(action) {
    try {
        yield put(signUserStart());
        const response = yield call(() =>
            instance(
                "api/v1/auth/login", "POST", action.payload.formData
            )
        );
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        if (response.data.refresh_token) {
            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("refresh_token", response.data.refresh_token);
        } else {
            localStorage.setItem("access_token", response.data.access_token);
        }
        yield put(UserSuccess());
        if (response.data.roles[0].name === "ROLE_SUPER_ADMIN") {
            action.payload.navigate("/admin");
        } else if (response.data.roles[0].name === "ROLE_ADMIN") {
            action.payload.navigate("/admin/product");
        } else if (response.data.roles[0].name === "ROLE_OPERATOR") {
            action.payload.navigate("/admin/operator/order");
        }
    } catch (error) {
        if (error.response.status === 401 || error.status.status === 403) {
            // toast.error("Login yoki password xato!")
            yield put(UserFailure("Login or password is wrong"));
        }
    }
}

export default function* loginSaga() {
    yield takeLatest(UserLogIn.type, workLoginUser);
}
