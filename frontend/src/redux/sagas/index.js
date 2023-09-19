import { all } from "redux-saga/effects";
import loginSaga from "./LoginSaga";
import {adminAdminSaga} from "./AdminAdminSaga";
import {adminBrandSaga} from "./AdminBrandSaga";
export default function* rootSaga() {
    yield all([
        loginSaga(),
        adminAdminSaga(),
        adminBrandSaga()
    ])
}
