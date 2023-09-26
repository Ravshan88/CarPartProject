import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    products: [],
    isLoading: false,
    error: null,
    brand:{},
    car:{},
    carPart:{}
}

const SearchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setCar(state, action){
            state.brand=action.payload
        },
        setCarPart(state, action){
            state.brand=action.payload
        },
       setBrand(state, action){
            state.brand=action.payload
       }
    }
})


export const {
    setBrand,
    setCar,
    setCarPart
} = SearchSlice.actions
export default SearchSlice.reducer