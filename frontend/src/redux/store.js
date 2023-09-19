import    {combineReducers, configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import login from "./reducers/LoginSlice"
import adminAdmins from "../redux/reducers/AdminAdminSlice";
import adminBrand from "../redux/reducers/AdminBrandSlice"

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
    login,
    adminAdmins,
    adminBrand

});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware({serializableCheck: false}).concat(sagaMiddleware);
    }
});
sagaMiddleware.run(rootSaga);
