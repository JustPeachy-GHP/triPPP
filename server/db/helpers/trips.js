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
}) => {
  try {
    const {
      rows: [trip],
    } = await client.query(
      `
            INSERT INTO trips( tripname, numdays, numtravelers, vibeform)
            VALUES($1, $2, $3, $4)
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
      ]
    );
    return trip;
  } catch (error) {
    throw error;
  }
};

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
  
  if (update_trip_data.location_id) {
    delete existing_trip.location_id;
  }
  const trip_update = { ...update_trip_data, ...existing_trip };
  console.log("Trip_update: ", trip_update);
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
    user_id = $8,
    group_id = $9
    WHERE trip_id = ${trip_id}
    RETURNING *;
    `,
      [
        trip_update.itinerary_id,
        trip_update.location_id,
        trip_update.tripname,
        trip_update.numdays,
        trip_update.numtravelers,
        trip_update.isdecided,
        trip_update.vibeform,
        trip_update.user_id,
        trip_update.group_id
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
  getAllTrips,
  getTripById,
  updateTrip,
  deleteTrip,
  setIsDecidedTrip
};
