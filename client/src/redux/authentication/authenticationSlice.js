import {createSlice} from "@reduxjs/toolkit"
const initialState = {
    token : "",
}

export const authenticationSlice = createSlice({
    name : "authentication",
    initialState,
    reducers:{
        addToken : (state, action) => {
            const{token} = action.payload;
            state.token = token
        },
        removeToken : (state, action) => {
            const {token} = action.payload;
            state.token = ""
        }
    }
})



export const {addToken, removeToken} = authenticationSlice.actions
export  default authenticationSlice.reducer