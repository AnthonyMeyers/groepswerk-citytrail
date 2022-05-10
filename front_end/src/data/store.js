import { combineReducers, configureStore } from "@reduxjs/toolkit";
import landenApi from "./landenApi";
import admin from "./admin";
const store = configureStore({
  reducer: combineReducers({
    [landenApi.reducerPath]: landenApi.reducer,
    [admin.name]: admin.reducer,
  }),
});

export default store;
