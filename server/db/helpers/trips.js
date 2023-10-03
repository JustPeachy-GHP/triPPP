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
};
