import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    carParts: [],
    isLoading: false,
    error: null,
    base64: "",
    imgFileForBackend: null,
    objForBrand: {},
    isEditing: false,
    photoIdForEdit: "",
    editingId: ""
};

const adminCarPartSlice = createSlice({
    name: "carPart",
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
        getCarPart(state) {
            state.isLoading = true
            state.error = null
        },
        getCarPartsSuccess(state, action) {
            state.carParts = action.payload
            state.isLoading = false;
            state.error = null
        },
        getCarPartsFailure(state, action) {
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
        deleteCarPart(state, action){
        }
    },
});

export const {
    setEditingId,
    setPhotoIdForEdit,
    changeIsEdit,
    setObjForBrand,
    setImageFileForBackend,
    getCarPart,
    getCarPartsSuccess,
    getCarPartsFailure,
    setBase64,
    deleteCarPart
} = adminCarPartSlice.actions;

export default adminCarPartSlice.reducer;
