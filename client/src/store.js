import { configureStore } from "@reduxjs/toolkit"
import testReducer from "./slices/testSlice"
import authReducer from "./slices/authSlice"

export default configureStore({
    reducer: {
        test: testReducer,
        auth: authReducer,
    }
})