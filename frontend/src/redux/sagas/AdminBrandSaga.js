import {call, put, takeLatest} from "redux-saga/effects";
import instance from "../../components/utils/config/instance";
import {
    setError,
} from "../reducers/AdminAdminSlice";
import {getBrands, getBrandsFailure, getBrandsSuccess, setObjForBrand} from "../reducers/AdminBrandSlice";

function* saveAdminBrandAsync(action) {
    try {
        console.log(action.payload)
        const formData = new FormData()
        formData.append("name", action.payload)
        formData.append("photo", action.payload.photo)
        formData.append("prefix", "/brandPhotos")
        yield call(() => instance(" /api/v1/brand", "POST", formData, {name: action.payload.name}, true)
        )
    } catch (error) {
        yield put(setError(error.message));
    }
}

function* workGetBrands(action) {
    try {
        const response = yield call(() => instance(`/api/v1/brand`));
        yield put(getBrandsSuccess(response.data))
    } catch (error) {
        yield put(getBrandsFailure(error.message));
    }
}

export function* adminBrandSaga() {
    yield takeLatest(setObjForBrand.type, saveAdminBrandAsync);
    yield takeLatest(getBrands.type, workGetBrands);
}

