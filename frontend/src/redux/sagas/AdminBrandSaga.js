import {call, put, takeLatest} from "redux-saga/effects";
import instance from "../../components/utils/config/instance";
import {
    setError,
} from "../reducers/AdminAdminSlice";
import {changeIsEdit, getBrands, getBrandsFailure, getBrandsSuccess, setObjForBrand} from "../reducers/AdminBrandSlice";

function* saveAdminBrandAsync(action) {
    try {
        const {name, photo, photoId, id, isEditing} = action.payload

        const formData = new FormData()
        formData.append("photo", photo)
        formData.append("prefix", "/brandPhotos")
        formData.append("data", JSON.stringify({name, photoId, id}))
        yield call(() => instance(`/api/v1/brand`, isEditing ? "PUT" : "POST", formData, null, true));
        yield put(changeIsEdit(false))
        yield call(workGetBrands)
    } catch (error) {
        yield put(setError(error.message));
    }
}

function* workGetBrands(action) {
    try {
        const response = yield call(() => instance(`/api/v1/brand`));
        console.log(response.data)
        yield put(getBrandsSuccess(response.data))
    } catch (error) {
        yield put(getBrandsFailure(error.message));
    }
}

export function* adminBrandSaga() {
    yield takeLatest(setObjForBrand.type, saveAdminBrandAsync);
    yield takeLatest(getBrands.type, workGetBrands);
}

