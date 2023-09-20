import {all} from "redux-saga/effects";
import loginSaga from "./LoginSaga";
import {adminAdminSaga} from "./AdminAdminSaga";
import {adminBrandSaga} from "./AdminBrandSaga";
import {adminOperatorSaga} from "./AdminOperatorSaga";
import {adminCarPartSaga} from "./AdminCarPartSaga";

export default function* rootSaga() {
    yield all([
        loginSaga(),
        adminAdminSaga(),
        adminBrandSaga(),
        adminOperatorSaga(),
        adminCarPartSaga()
    ])
}
