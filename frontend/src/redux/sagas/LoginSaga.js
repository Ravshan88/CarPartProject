import { call, put, takeLatest } from "redux-saga/effects";
import {
  signUserStart,
  UserFailure,
  UserLogIn,
  UserSuccess
} from "../reducers/LoginSlice";
import axios from "axios";
function* workLoginUser(action) {
  try {
    console.log("Hello")
    yield put(signUserStart());
    const response = yield call(() =>
        axios.post(
            "http://localhost:8080/api/v1/auth/login",
            action.payload.formData
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
      action.payload.navigate("/");
    }
  } catch (error) {
    if (error.response.status === 401 || error.status.status === 403) {
      yield put(UserFailure("Login or password is wrong"));
    }
  }
}

export default function* loginSaga() {
  yield takeLatest(UserLogIn.type, workLoginUser);
}
