import { createSlice } from '@reduxjs/toolkit'

// you'll see these as initial values we set in the slice in the Test component

const initialState = {
    testVal1: 'initial value 1',
    testVal2: 'initial value 2'
}

// creates two actions, setone and settwo, which will change testVal1 and testVal2 respectively are the payload from the Test Component

const testSlice = createSlice ({
    name: 'test',
    initialState,
    reducers: {
        setone(state, action) {
            const payload = action.payload
            state.testVal1 = payload.testVal1
        },
        settwo(state, action) {
            const payload = action.payload
            state.testVal2 = payload.testVal2
        },

    },
})

export const { setone, settwo } = testSlice.actions

export default testSlice.reducer