import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    orders: [],
    isLoading: false,
    error: null,

}

const operatorOrdersSlice = createSlice({
    name: "operatorOrders",
    initialState,
    reducers: {
        getOrdersStart(state, action) {
            state.isLoading = true
            state.error = null
        },
        getOrdersSuccess(state, action) {
            state.orders = action.payload
            state.isLoading = false;
            state.error = null
        },
        getOrdersFailure(state, action) {
            state.error = action.payload
        },
        changeStatusOrder(action, state){
            state.isLoading=true;
        },
        saveOrder(action, state){
            state.isLoading=true;
        }
    }
})


export const {
   getOrdersStart,
    getOrdersFailure,
    getOrdersSuccess,
    changeStatusOrder,
    saveOrder
} = operatorOrdersSlice.actions
export default operatorOrdersSlice.reducer