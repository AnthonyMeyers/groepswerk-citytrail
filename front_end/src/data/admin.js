import { createSlice } from "@reduxjs/toolkit";

const initialState = { admin: false, key: "" };

//De admin moet steeds inloggen bij gebruik
const adminSlice = createSlice({
  name: "adminState",
  initialState,
  reducers: {
    changeState(state, {payload: {key}}) {
      if(key.length > 0 && state.admin === false){
      state.admin = true;
      state.key = key
    }else{
      state.admin = false;
      state.key = "";
    }
    },
  },
});

export default adminSlice;
export const { changeState } = adminSlice.actions;
