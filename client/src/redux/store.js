import {configureStore} from "@reduxjs/toolkit"
import credentialSlice from "./verification/credentialSlice"
import authenticationSlice from "./authentication/authenticationSlice"
import chatWindowSlice from "./chatWindow/chatWindowSlice"
import cameraStatusSlice from "./cameraStatus/cameraStatusSlice"
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit"

const persistConfig = {
    key : "root",
    version : 1,
    storage
}

const reducer = combineReducers({
    credential: credentialSlice,
    chatWindow: chatWindowSlice,
})

const persistReducedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
    reducer: {
        persistReducedReducer,
        authentication: authenticationSlice,
        cameraStatus : cameraStatusSlice,
    }
});
