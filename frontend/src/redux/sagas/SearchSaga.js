import {call, put, takeLatest} from "redux-saga/effects";
import instance from "../../components/utils/config/instance";
import {
    setError,
} from "../reducers/AdminAdminSlice";
import {changeIsEdit,deleteCarBrand, getBrands, getBrandsFailure, getBrandsSuccess, setObjForBrand} from "../reducers/AdminBrandSlice";
import {getCarPart, getCarPartsFailure, getCarPartsSuccess} from "../reducers/AdminCartPartSlice";
import {toast} from "react-toastify";

function* saveAdminBrandAsync(action) {
    try {
        const {name, photo, photoId, id, isEditing} = action.payload

        const formData = new FormData()
        formData.append("photo", photo)
        formData.append("prefix", "/brandPhotos")
        formData.append("data", JSON.stringify({name, photoId, id}))
        yield call(() => instance(`/api/v1/brand`, isEditing ? "PUT" : "POST", formData, null, true).then(res => {
            if(res.error){
                toast.error(res.data)
            }
        }));
        yield put(changeIsEdit(false))
        yield call(workGetBrands)
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

function* workDeleteCarBrand(action) {
    try {
        console.log(action.payload)
        const response = yield call(() => instance('/api/v1/brand/delete/' + action.payload, 'delete'));
        yield put(getBrandsSuccess(response.data))
        yield put(getBrands())
    } catch (error) {
        yield put(getBrandsFailure(error.message));
    }
}
export function* adminBrandSaga() {
    yield takeLatest(setObjForBrand.type, saveAdminBrandAsync);
    yield takeLatest(getBrands.type, workGetBrands);
    yield takeLatest(deleteCarBrand.type, workDeleteCarBrand);
}

