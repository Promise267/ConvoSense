import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    chatModelId : "",
    _id : "",
    firstName : "",
    lastName : "",
    gender : "",
    email : "",
    dialCode: "",
    phoneNumber: "",
}


export const chatWindowSlice = createSlice({
    name : "chatWindow",
    initialState,
    reducers:{
        addchatWindow : (state, action) => {
            const {chatModelId, _id, firstName, lastName, gender, email, dialCode, phoneNumber} = action.payload;
            state.chatModelId = chatModelId
            state._id = _id
            state.firstName = firstName;
            state.lastName = lastName;
            state.gender = gender;
            state.email = email;
            state.dialCode = dialCode;
            state.phoneNumber = phoneNumber;
        },
        removechatWindow :(state, action) =>{
            Object.keys(initialState).forEach((fieldName) => {
                state[fieldName] = initialState[fieldName];
            });
        }
    }
})

export const {addchatWindow, removechatWindow} = chatWindowSlice.actions;
export default chatWindowSlice.reducer

