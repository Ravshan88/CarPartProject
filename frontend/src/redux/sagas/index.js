import {all} from "redux-saga/effects";
import loginSaga from "./LoginSaga";
import {adminAdminSaga} from "./AdminAdminSaga";
import {adminBrandSaga} from "./AdminBrandSaga";
import {adminOperatorSaga} from "./AdminOperatorSaga";
import {adminCarPartSaga} from "./AdminCarPartSaga";
import {adminCarSaga} from "./AdminCarSaga";
import {adminProductSaga} from "./AdminProductSaga";
import {operatorOrderSaga} from "./OperatorOrdersSaga"
import {AdvertisementSaga} from "./AdvertisementSaga";

export default function* rootSaga() {
    yield all([
        loginSaga(),
        adminAdminSaga(),
        adminBrandSaga(),
        adminOperatorSaga(),
        adminCarPartSaga(),
        adminCarSaga(),
        adminProductSaga(),
        operatorOrderSaga(),
        AdvertisementSaga()
    ])
}
