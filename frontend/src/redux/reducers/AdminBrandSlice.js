import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    brands: [],
    isLoading: false,
    error: null,
    base64: "",
    imgFileForBackend: null,
    objForBrand: {}
};

const adminBrandSlice = createSlice({
    name: "adminBrand",
    initialState,
    reducers: {
        getBrands(state) {
            state.isLoading = true
            state.error = null
        },
        getBrandsSuccess(state, action) {
            state.brands = action.payload
            state.isLoading = false;
            state.error = null
        },
        getBrandsFailure(state, action) {
            state.error = action.payload
        },
        setBase64(state, action) {
            state.base64 = action.payload
        },
        setImageFileForBackend(state, action) {
            state.imgFileForBackend = action.payload
        },
        setObjForBrand(state, action) {
        }
    },
});

export const {
    setObjForBrand,
    setImageFileForBackend,
    getBrands,
    getBrandsSuccess,
    getBrandsFailure,
    setBase64
} = adminBrandSlice.actions;

export default adminBrandSlice.reducer;
