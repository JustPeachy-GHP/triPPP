import { configureStore } from "@reduxjs/toolkit"
import testReducer from "./slices/testSlice"
import authReducer from "./slices/authSlice"
import tripsReducer from "./slices/tripsSlice"
import mapsReducer from "./slices/mapsSlice"

export default configureStore({
    reducer: {
        test: testReducer,
        auth: authReducer,
        trips: tripsReducer,
        maps: mapsReducer,
    }
})