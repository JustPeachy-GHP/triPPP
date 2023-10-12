import ( createSlice ) from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

const user_id = useSelector((state) => state.auth.user_id);
const vibeform = useSelector((state) => state.trips.vibeform);
const trip_id = useSelector((state) => state.trips.trip_id);


const initialState = {
    trip_id,
    location_id: null,
    vibeform,
    isdecided: null,
    user_id,

};

const mapsSlice = createSlice({
    name: 'maps',
    initialState,
    reducers: {
        setTrips: (state, action) => {
            state.location_id = action.payload.location_id;
            state.isdecided = action.payload.isdecided;

        },
    },
});

export const { setMaps } = mapsSlice.actions;
export default mapsSlice.reducer;

// To update the maps data
// const updatedMaps = {};
// dispatch(setMaps(updatedMaps));