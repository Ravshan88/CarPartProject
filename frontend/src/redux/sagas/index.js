import { all } from "redux-saga/effects";
import loginSaga from "./LoginSaga";

export default function* rootSaga() {
    yield all([
        loginSaga(),

    ])
}
