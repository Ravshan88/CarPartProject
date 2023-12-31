import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    cars: [],
    isLoading: false,
    error: null,
    base64: "",
    imgFileForBackend: null,
    objForBrand: {},
    isEditing: false,
    photoIdForEdit: "",
    editingId: ""
};

const adminCarSlice = createSlice({
    name: "car",
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
        getCarStart(state) {
            state.isLoading = true
            state.error = null
        },
        getCarSuccess(state, action) {
            state.cars = action.payload
            state.isLoading = false;
            state.error = null
        },
        getCarFailure(state, action) {
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
        deleteCar(stata, action) {

        }
    },
});

export const {
    setEditingId,
    setPhotoIdForEdit,
    changeIsEdit,
    setObjForBrand,
    setImageFileForBackend,
    getCarStart,
    getCarSuccess,
    getCarFailure,
    setBase64,
    deleteCar
} = adminCarSlice.actions;

export default adminCarSlice.reducer;
