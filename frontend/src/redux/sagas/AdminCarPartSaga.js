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
} from "../reducers/AdminCartPartSlice";

function* saveCarPartAsync(action) {
    try {
        const {name, photo, photoId, id, isEditing} = action.payload
        const formData = new FormData()
        formData.append("photo", photo)
        formData.append("prefix", "/carPartsPhotos")
        formData.append("data", JSON.stringify({name, photoId, id}))
        yield call(() => instance(`/api/v1/carPart`, isEditing ? "PUT" : "POST", formData, null, true));
        yield put(changeIsEdit(false))
        yield call(workGetCarParts)
    } catch (error) {
        yield put(setError(error.message));
    }
}

function* workGetCarParts(action) {
    try {
        const response = yield call(() => instance(`/api/v1/carPart`));
        yield put(getCarPartsSuccess(response.data))
    } catch (error) {
        yield put(getCarPartsFailure(error.message));
    }
}

export function* adminCarPartSaga() {
    yield takeLatest(setObjForBrand.type, saveCarPartAsync);
    yield takeLatest(getCarPart.type, workGetCarParts);
}

