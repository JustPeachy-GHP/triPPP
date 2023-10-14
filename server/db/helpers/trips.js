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
      trips.isdecided
    FROM users 
    INNER JOIN trips on users.user_id = trips.user_id 
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
async function getTripById(id) {
  try {
    const {
      rows: [trip],
    } = await client.query(`
            SELECT * FROM trips
            WHERE trip_id = ${id}
        `);
    console.log(trip);
    return trip;
  } catch (error) {
    throw error;
  }
}

// PUT - /api/trips/:id
// get this checked out
async function updateTrip(trip_id, updateTripData) {
  try {
    const {
      rows: [trip],
    } = await client.query(
      `
    UPDATE trips 
    SET 
    tripname = $1, 
    numdays = $2, 
   numtravelers = $3,
   isdecided = $4,
   vibeform = $5
    WHERE trip_id = ${trip_id}
    RETURNING *;
    `,
      [
        updateTripData.tripname,
        updateTripData.numdays,
        updateTripData.numtravelers,
        updateTripData.isdecided,
        updateTripData.vibeform,
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
