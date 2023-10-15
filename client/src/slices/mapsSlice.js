import { createSlice } from '@reduxjs/toolkit';


// const user_id = useSelector((state) => state.auth.user_id);
// const vibeform = useSelector((state) => state.trips.vibeform);
// const trip_id = useSelector((state) => state.trips.trip_id);


const initialState = {
    location_id: null,
    isdecided: null,
    // user_id,
    // trip_id,
    // vibeform


};

const mapsSlice = createSlice({
    name: 'maps',
    initialState,
    reducers: {
        setMaps: (state, action) => {
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