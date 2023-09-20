import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    operators: [],
    isLoading: false,
    error: null,
    operatorsData: null, // Add a new property to store the fetched admin data
};

const adminOperatorSlice = createSlice({
    name: "adminOperators",
    initialState,
    reducers: {
        setOperators: (state, action) => {
            console.log(action.payload)
            state.operators = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        saveOperator: (state, action) => {
            state.operators.push(action.payload);
        },
        addOperator: (state, action) => {
            state.operators.push(action.payload);
        },
        deleteOperator: (state, action) => {
            state.operators = state.operators.filter(
                (admin) => admin.id !== action.payload
            );
        },
        setOperatorData: (state, action) => {

            state.operators = action.payload; // Set the fetched admin data
            state.isLoading = false
        },
        getOperatorData: (state) => {
            state.isLoading = true

        },
        editOperator: (state, action) => {
            state.isLoading = false
            const editedOperator = action.payload;

        },
    },
});

export const {
    editOperator,
    setOperators,
    setLoading,
    setError,
    saveOperator,
    deleteOperator,
    addOperator,
    setOperatorData,
    getOperatorData,

} = adminOperatorSlice.actions;

export default adminOperatorSlice.reducer;