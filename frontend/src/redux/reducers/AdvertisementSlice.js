import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    error: null,
    data: {},
    carousel: [],
    photoForBackend: null
}
const advertisementSlice = createSlice({
    name: "advertisement",
    initialState,
    reducers: {
        setPhotoForBackend(state, action) {
            state.photoForBackend = action.payload
        },
        getAdvertisementStart(state, action) {
            state.isLoading = true;
        }, getAdvertisementSuccess(state, action) {
            state.data = action.payload
            state.isLoading = false;
        }, getAdvertisementFailure(state, action) {
            state.error = action.payload;
        },
        workEditAdvertisement(state, action) {

        },
        getCarouselStart(state, action) {
            state.isLoading = true
        },
        getCarouselSuccess(state, action) {
            state.carousel = action.payload
            state.isLoading = false
        },
        getCarouselFailure(state, action) {
            state.isLoading = false
            state.error = action.payload
        }
    }
})

export const {
    setPhotoForBackend,
    getCarouselFailure,
    getCarouselStart,
    getCarouselSuccess,
    workEditAdvertisement,
    getAdvertisementStart,
    getAdvertisementFailure,
    getAdvertisementSuccess
} = advertisementSlice.actions
export default advertisementSlice.reducer