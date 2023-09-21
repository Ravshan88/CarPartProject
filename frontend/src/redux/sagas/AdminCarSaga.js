import {call, put, takeLatest} from "redux-saga/effects";
import instance from "../../components/utils/config/instance";
import {
    setError,
} from "../reducers/AdminAdminSlice";
import {
    changeIsEdit,
    getCarPart,
    getCarPartsFailure,
    getCarPartsSuccess,
    setObjForBrand
} from "../reducers/AdminCarSlice";

function* saveCarPartAsync(action) {
    try {
        const {name, photo,brandId, photoId, id, isEditing} = action.payload
        const formData = new FormData()
        formData.append("photo", photo)
        formData.append("prefix", "/carPhotos")
        formData.append("data", JSON.stringify({name,brandId, photoId, id}))
        yield call(() => instance(`/api/v1/car`, isEditing ? "PUT" : "POST", formData, null, true));
        yield put(changeIsEdit(false))
        yield call(workGetCarParts)
    } catch (error) {
        yield put(setError(error.message));
    }
}

function* workGetCarParts(action) {
    try {
        const response = yield call(() => instance(`/api/v1/car`));

        yield put(getCarPartsSuccess(response.data))
    } catch (error) {
        yield put(getCarPartsFailure(error.message));
    }
}

export function* adminCarSaga() {
    yield takeLatest(setObjForBrand.type, saveCarPartAsync);
    yield takeLatest(getCarPart.type, workGetCarParts);
}

