import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    brands: [],
    isLoading: false,
    error: null,
    base64: "",
    imgFileForBackend: null,
    objForBrand: {},
    isEditing: false,
    photoIdForEdit: "",
    editingId: ""
};

const adminBrandSlice = createSlice({
    name: "adminBrand",
    initialState,
    reducers: {
        setEditingId(state, action) {
            state.editingId = action.payload
        },
        setPhotoIdForEdit(state, action) {
            state.photoIdForEdit = action.payload
        },
        changeIsEdit(state, action) {
            state.isEditing = action.payload
        },
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
        },
        deleteCarBrand(state, action){

        }
    },
});

export const {
    setEditingId,
    setPhotoIdForEdit,
    changeIsEdit,
    setObjForBrand,
    setImageFileForBackend,
    getBrands,
    getBrandsSuccess,
    getBrandsFailure,
    setBase64,
    deleteCarBrand
} = adminBrandSlice.actions;

export default adminBrandSlice.reducer;
