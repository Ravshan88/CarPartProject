import {call, put, takeLatest} from "redux-saga/effects";
import instance from "../../components/utils/config/instance";
import {
    getAdvertisementFailure,
    getAdvertisementStart,
    getAdvertisementSuccess, getCarouselFailure, getCarouselStart, getCarouselSuccess, setPhotoForBackend,
    workEditAdvertisement
} from "../reducers/AdvertisementSlice";
import {useSelector} from "react-redux";

function* editAdvertisement(action) {
    const {data, news} = action.payload
    try {
        yield call(() => instance(`/api/v1/advertisement`, data.length === 0 ? "POST" : "PUT", news));
        yield call(workGetAdvertisement)
    } catch (error) {
        yield put(getAdvertisementFailure(error.message));
    }
}

function* deleteAdvertisement(action) {
    try {
        yield call(() => instance(`/api/v1/advertisement/${action.payload}`, "DELETE"));
        yield call(workGetAdvertisement)
    } catch (error) {
        yield put(getAdvertisementFailure(error.message));
    }
}

function* saveCarouselPhoto(action) {
    const formData = new FormData()
    formData.append("photo", action.payload)
    formData.append("prefix", "/carouselPhotos")
    try {
        yield call(() => instance(`/api/v1/carousel`, "POST", formData));
        yield call(workGetCarousel)
    } catch (error) {
        yield put(getCarouselFailure(error.message));
    }
}

function* workGetAdvertisement(action) {
    try {
        const response = yield call(() => instance(`/api/v1/advertisement`, "GET"));
        yield put(getAdvertisementSuccess(response.data))
    } catch (error) {
        yield put(getAdvertisementFailure(error.message));
    }
}

function* workGetCarousel(action) {
    try {
        const response = yield call(() => instance(`/api/v1/carousel`, "GET"));
        yield put(getCarouselSuccess(response.data))
    } catch (error) {
        yield put(getCarouselFailure(error.message));
    }
}

function* workDeleteCarousel(action) {
    try {
        yield call(() => instance('/api/v1/carousel', 'DELETE', null, {
            id: action.payload.id,
            attachmentName: action.payload.attachment.name
        }));
        yield call(workGetCarousel)
    } catch (error) {
        yield call(getCarouselFailure(error.message));
    }
}

export function* AdvertisementSaga() {
    yield takeLatest(getAdvertisementStart().type, workGetAdvertisement);
    yield takeLatest(workEditAdvertisement().type, editAdvertisement);
    yield takeLatest(getCarouselStart().type, workGetCarousel);
    yield takeLatest(setPhotoForBackend().type, saveCarouselPhoto);
    yield takeLatest("deleteCarouselPhoto", workDeleteCarousel);
    yield takeLatest("deleteText", deleteAdvertisement);
}

