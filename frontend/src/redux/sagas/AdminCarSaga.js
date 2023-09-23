import {call, put, takeLatest} from "redux-saga/effects";
import instance from "../../components/utils/config/instance";
import {
    setError,
} from "../reducers/AdminAdminSlice";
import {
    changeIsEdit,
    getCarStart,
    getCarFailure,
    getCarSuccess,
    setObjForBrand,
    deleteCar
} from "../reducers/AdminCarSlice";
import {toast} from "react-toastify";

function* saveCarPartAsync(action) {
    try {
        const {name, photo, brandId, photoId, id, isEditing} = action.payload
        const formData = new FormData()
        formData.append("photo", photo)
        formData.append("prefix", "/carPhotos")
        formData.append("data", JSON.stringify({name, brandId, photoId, id}))
        yield call(() => instance(`/api/v1/car`, isEditing ? "PUT" : "POST", formData, null, true).then(res => {
            if (res.error) {
                toast.error(res.data)
            }
        }))
        yield put(changeIsEdit(false))
        yield call(workGetCarParts)
    } catch (error) {
        yield put(setError(error.message));
    }
}

function* workGetCarParts(action) {
    try {
        const response = yield call(() => instance(`/api/v1/car`));

        yield put(getCarSuccess(response.data))
    } catch (error) {
        yield put(getCarFailure(error.message));
    }
}

function* workDeleteCar(action) {
    try {
        const response = yield call(() => instance('/api/v1/car/delete/' + action.payload, 'delete'));
        // yield put(getCarPartsSuccess(response.data))
        yield put(getCarStart())
    } catch (error) {
        yield put(getCarFailure(error.message));
    }
}

export function* adminCarSaga() {
    yield takeLatest(setObjForBrand.type, saveCarPartAsync);
    yield takeLatest(getCarStart.type, workGetCarParts);
    yield takeLatest(deleteCar.type, workDeleteCar);
}

