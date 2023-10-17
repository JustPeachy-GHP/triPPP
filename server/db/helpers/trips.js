const client = require("../client");

// left out location_id for now
const createTrip = async ({
  // trip_id,
  // itinerary_id,
  // location_id,
  // group_id,
  tripname,
  numdays,
  numtravelers,
  // isdecided,
  vibeform,
  user_id,
}) => {
  try {
    const {
      rows: [trip],
    } = await client.query(
      `
            INSERT INTO trips( tripname, numdays, numtravelers, vibeform, user_id)
            VALUES($1, $2, $3, $4, $5)
            RETURNING *;
            `,
      [
        // trip_id,
        // itinerary_id,
        // location_id,
        // group_id,
        tripname,
        numdays,
        numtravelers,
        // isdecided,
        vibeform,
        user_id
      ]
    );
    return trip;
  } catch (error) {
    throw error;
  }
};

// GET -  api/users/exttripdata/:user_id
// *** user_id is member's NOT admin's ***
// gets extended data about a trip that a user is joining

async function getTripExtData (trip_id) {
  try {
    console.log("in getTripExtData", trip_id)
    const { rows: [trip] } = await client.query(`
    SELECT 
      users.firstname as admin_name,
      users.email as admin_email,
      trips.user_id as admin_id,
      trips.tripname,
      trips.numdays,
      trips.numtravelers,
      trips.isdecided,
      trips.location_id,
      locations.place_id
    FROM users 
    INNER JOIN trips on users.user_id = trips.user_id 
    INNER JOIN locations on trips.location_id = locations.location_id
    WHERE trips.trip_id = $1;
    `, [trip_id]);
    return trip
  } catch (error) {}
}

// GET - api/trips - get all trips
async function getAllTrips() {
  try {
    const { rows } = await client.query(`
        SELECT * FROM trips;
        `);
    return rows;
  } catch (error) {
    throw error;
  }
}

// GET - /api/trips/:id
async function getTripById(trip_id) {
  console.log("in getTripByID db helper")
  try {
    const {
      rows: [trip],
    } = await client.query(`
            SELECT * FROM trips
            WHERE trip_id = ${trip_id}
        `);
    console.log("Get trip: ", trip);
    return trip;
  } catch (error) {
    throw error;
  }
}

// PUT - /api/trips/:id
// get this checked out
async function updateTrip(trip_id, update_trip_data) {
  let existing_trip;
  try {
    existing_trip = await getTripById(trip_id);
  } catch (error) {
    throw error;
  }
  
  if (update_trip_data) {
    existing_trip["location_id"] = update_trip_data.location_id;
    existing_trip["isdecided"] = update_trip_data.isdecided;
  }
  
  console.log("Updated trip: ", existing_trip);

  try {
    const {
      rows: [trip],
    } = await client.query(
      `
    UPDATE trips 
    SET 
    itinerary_id = $1,
    location_id = $2,
    tripname = $3, 
    numdays = $4, 
    numtravelers = $5,
    isdecided = $6,
    vibeform = $7,
    user_id = $8
    WHERE trip_id = ${trip_id}
    RETURNING *;
    `,
      [
        existing_trip.itinerary_id,
        existing_trip.location_id,
        existing_trip.tripname,
        existing_trip.numdays,
        existing_trip.numtravelers,
        existing_trip.isdecided,
        existing_trip.vibeform,
        existing_trip.user_id,
      ]
    );
    return trip;
  } catch (error) {
    throw error;
  }
}

// PATCH - /api/trips/decided/:trip_id
async function setIsDecidedTrip({trip_id, isdecided, location_id}) {
  try {
    console.log("in patch", isdecided, location_id)
    const {
      rows: [trip],
    } = await client.query(
      `
    UPDATE trips
    SET
    isdecided = $1,
    location_id = $2
    WHERE trip_id = $3
    RETURNING *;
    `,
    [
    isdecided,
    location_id, 
    trip_id
    ]
    );
    return trip;
  } catch (error) {
    throw error;
  }
}

// DELETE- /api/trips/:id
async function deleteTrip(trip_id) {
  try {
    const { rows } = await client.query(
      'DELETE FROM trips WHERE "trip_id"=$1 RETURNING *',
      [trip_id]
    );
    return rows[0];
  } catch (err) {
    throw err;
  }
}

module.exports = {
  createTrip,
  getTripExtData,
  getAllTrips,
  getTripById,
  updateTrip,
  deleteTrip,
  setIsDecidedTrip
};