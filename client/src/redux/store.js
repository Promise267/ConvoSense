import {configureStore} from "@reduxjs/toolkit"
import credentialSlice from "./verification/credentialSlice"

export const store = configureStore({
    reducer: {
        credential: credentialSlice
    }
});