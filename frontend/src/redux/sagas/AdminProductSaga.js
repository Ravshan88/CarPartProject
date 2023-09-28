import {call, put, takeLatest} from "redux-saga/effects";
import instance from "../../components/utils/config/instance";
import {
    setError,
} from "../reducers/AdminAdminSlice";
import {toast} from "react-toastify";
import {
    changeIsEdit,
    deleteProduct,
    getProducts,
    getProductsFailure,
    getProductsSuccess,
    setObjForBrand
} from "../reducers/AdminProductSlice";

function* saveProductAsync(action) {
    try {
        console.log(action.payload)
        const {name, description, price, carPartId, carId, photo, photoId, id, isEditing} = action.payload
        const formData = new FormData()
        formData.append("photo", photo)
        formData.append("prefix", "/productPhotos")
        formData.append("data", JSON.stringify({id, name, description, price, carPartId, carId, photoId}))
        yield call(() => instance(`/api/v1/product`,
            isEditing ? "PUT" : "POST", formData, null, true)
            .then(res => {
                if (res.error) {
                    toast.error(res.data)
                }
            }))
        yield put(changeIsEdit(false))
        yield call(workGetProducts)

    } catch (error) {
        yield put(setError(error.message));
    }
}

function* workGetProducts(action) {
    try {
        const response = yield call(() => instance(`/api/v1/product`));
        yield put(getProductsSuccess(response.data))
    } catch (error) {

        yield put(getProductsFailure(error.message));
    }
}

function* workDeleteProduct(action) {
    try {
        yield call(() => instance('/api/v1/product', 'delete', null, {
            id: action.payload.id,
            attachmentName: action.payload.attachmentName
        }));
        yield put(getProducts())
    } catch (error) {
        yield put(getProductsFailure(error.message));
    }
}

export function* adminProductSaga() {
    yield takeLatest(setObjForBrand.type, saveProductAsync);
    yield takeLatest(getProducts.type, workGetProducts);
    yield takeLatest(deleteProduct.type, workDeleteProduct);
}

