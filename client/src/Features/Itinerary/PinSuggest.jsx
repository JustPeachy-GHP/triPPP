// this will display a map for the chosen destination city

// trip_id should come from props, state, or redux
// user_id will be in redux

// - load local activities to choose between from Google Places API
// - for each item to be shown with a pin:
//       *if* place_id is already in locations return location_id,
//       else create row in locations and return location_id

// get # of travelers from database based on trip_id
// needs to be passed as a prop to each pin/infowindow
// to calculate current average vote

// props passed to pin/infowindow should be { trip_id, location_id, numtravelers }

