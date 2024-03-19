import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stateOfCamera: false,
};

export const cameraStatusSlice = createSlice({
  name: "cameraStatus",
  initialState,
  reducers: {
    toggleCamera: (state) => {
      state.stateOfCamera = !state.stateOfCamera;
    },
  },
});

export const { toggleCamera } = cameraStatusSlice.actions;

export default cameraStatusSlice.reducer;