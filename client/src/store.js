import { configureStore } from "@reduxjs/toolkit"
import testReducer from "./store/testSlice"

export default configureStore({
    reducer: {
        test: testReducer,
    }
})