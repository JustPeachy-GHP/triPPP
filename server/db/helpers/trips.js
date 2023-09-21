const client = require("../client");

// left out location_id for now
const createTrip = async ({
  trip_id,
  itinerary_id,
  // group_id,
  tripname,
  numdays,
  numtravelers,
  isdecided,
  vibeform,
}) => {
  try {
    const {
      rows: [trip],
    } = await client.query(
      `
            INSERT INTO trips(trip_id, itinerary_id, tripname, numdays, numtravelers, isdecided, vibeform)
            VALUES($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
            `,
      [
        trip_id,
        itinerary_id,
        // group_id,
        tripname,
        numdays,
        numtravelers,
        isdecided,
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

// get trip by name?

// get trip by

module.exports = { createTrip, getAllTrips, getTripById};
