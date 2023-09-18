import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    admins: [],
    isLoading: false,
    error: null,
};

const adminAdminSlice = createSlice({
    name: "adminAdmins",
    initialState,
    reducers: {
        setAdmins: (state, action) => {
            state.admins = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        addAdmin: (state, action) => {
            state.admins.push(action.payload);
        },
        deleteAdmin: (state, action) => {
            state.admins = state.admins.filter(
                (admin) => admin.id !== action.payload
            );
        },
    },
});

export const {
    setAdmins,
    setLoading,
    setError,
    addAdmin,
    deleteAdmin,
} = adminAdminSlice.actions;

export default adminAdminSlice.reducer;
