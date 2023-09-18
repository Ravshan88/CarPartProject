import {combineReducers, configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import login from "./reducers/LoginSlice"
import adminAdmins from "../components/admin/adminAdmins/AdminAdmins";
const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
    login,
    adminAdmins,

});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware({serializableCheck: false}).concat(sagaMiddleware);
    }
});
sagaMiddleware.run(rootSaga);
