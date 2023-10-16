import { createSlice } from '@reduxjs/toolkit';
// import { useSelector } from 'react-redux';

// const user_id = useSelector((state) => state.auth.user_id);


const initialState = {
    trip_id : null,
    vibeform: [],
    // user_id,

};

const tripsSlice = createSlice({
    name: 'trips',
    initialState,
    reducers: {
        setTrips: (state, action) => {
            state.trip_id = action.payload.trip_id;
            state.vibefrom = action.payload.vibeform;

        },
    },
});

export const { setTrips } = tripsSlice.actions;
export default tripsSlice.reducer;

// To update the trips data
// const updatedTrips = {};
// dispatch(setTrips(updatedTrips));