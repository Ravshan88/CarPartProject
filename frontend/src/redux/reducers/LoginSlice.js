import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  loggedIn: false,
  error: null,
  navigation: "",
  formData: {
    phone: "",
    password: "",
    rememberMe: ""
  }
};
export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setFormData(state, action) {
      state.formData = action.payload;
    },
    UserLogIn(state, action) {
      state.formData = action.payload.formData;
      state.navigation = action.payload.navigate;
    },
    UserSuccess(state, action) {
      state.isLoading = false;
      state.loggedIn = true;
      state.error = null;
    },
    UserFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    signUserStart: state => {
      state.isLoading = true;
      state.error = null;
    }
  }
});

export const {
  setFormData,
  UserLogIn,
  UserSuccess,
  UserFailure,
  signUserStart
} = loginSlice.actions;
export default loginSlice.reducer;
