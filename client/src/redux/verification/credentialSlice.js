import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    firstName : "",
    lastName : "",
    gender : "",
    email : "",
    password : "",
    confirmPassword : "",
    dialCode: "",
    phoneNumber: "",
    dateofbirth: null,
    isChecked : true
}

export const credentialSlice = createSlice({
    name : "credential",
    initialState,
    reducers:{
        addCredentials : (state, action) => {
            const {firstName, lastName, gender, email, password, confirmPassword, dialCode, phoneNumber, dateofbirth, isChecked } = action.payload;
            state.firstName = firstName;
            state.lastName = lastName;
            state.gender = gender;
            state.email = email;
            state.password = password;
            state.confirmPassword = confirmPassword;
            state.dialCode = dialCode;
            state.phoneNumber = phoneNumber;
            state.dateofbirth = dateofbirth;
            state.isChecked = isChecked;
        },
        removeCredentials :(state, action) =>{
            Object.keys(initialState).forEach((fieldName) => {
                state[fieldName] = initialState[fieldName];
            });
        }
    }
})

export const {addCredentials, removeCredentials} = credentialSlice.actions;
export default credentialSlice.reducer
