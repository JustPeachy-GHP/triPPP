import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user_id: null,
    email: null,
    firstname: null,
    token: null,
}

const authSlice = createSlice ({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            const payload = action.payload
            state.user_id = payload.user_id
            state.email = payload.email
            state.firstname = payload.firstname
            state.token = payload.token
        },
        logOut (state) {
            state.user_id = null
            state.email = null
            state.firstname = null
            state.token = null
        },

    },
})

export const { login, logOut } = authSlice.actions;

export default authSlice.reducer;