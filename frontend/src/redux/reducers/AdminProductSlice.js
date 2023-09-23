import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    products: [],
    isLoading: false,
    error: null,
    base64: "",
    imgFileForBackend: null,
    objForBrand: {},
    isEditing: false,
    photoIdForEdit: "",
    editingId: ""
}

const adminProductSlice = createSlice({
    name: "products",
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
        getProducts(state) {
            state.isLoading = true
            state.error = null
        },
        getProductsSuccess(state, action) {
            state.products = action.payload
            state.isLoading = false;
            state.error = null
        },
        getProductsFailure(state, action) {
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
        deleteProduct(state, action) {
        }
    }
})


export const {
    setEditingId,
    setPhotoIdForEdit,
    changeIsEdit,
    setObjForBrand,
    setImageFileForBackend,
    getProducts,
    getProductsSuccess,
    getProductsFailure,
    setBase64,
    deleteProduct
} = adminProductSlice.actions
export default adminProductSlice.reducer