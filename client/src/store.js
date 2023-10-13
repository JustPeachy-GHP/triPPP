import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import sessionStorage from "redux-persist/es/storage/session";
import testReducer from "./slices/testSlice";
import authReducer from "./slices/authSlice";
// import tripsReducer from "./slices/tripsSlice"
// import mapsReducer from "./slices/mapsSlice"


const rootReducer = combineReducers({
  test: testReducer,
  auth: authReducer,
//   maps: mapsReducer,
//   trips: tripsReducer,
});

const persistConfig = {
  key: "root",
  storage: sessionStorage,
  // blacklist: ['test', 'auth']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);
