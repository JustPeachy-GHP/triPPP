const client = require("../client");

// used by seed.js
const createItineraryitem = async ({
  itinerary_id,
  // trip_id,
  user_id,
  rating,
}) => {
  try {
    const {
      rows: [itineraryitem],
    } = await client.query(
      `
        INSERT INTO itineraryitems(itinerary_id, user_id, rating)
        VALUES($1, $2, $3)
        RETURNING *;
        `,
      [itinerary_id, user_id, rating]
    );
    return itineraryitem;
  } catch (error) {
    throw error;
  }
};

// used by addNewItinRating and changeRating 
// in client helper
const createItinRating = async ({
  trip_id,
  location_id,
  user_id,
  rating
}) => {
  try {
    const {
      rows: [itineraryitem],
    } = await client.query(
      `
        INSERT INTO itineraryitems(trip_id, location_id, user_id, rating)
        VALUES($1, $2, $3, $4)
        RETURNING *;
        `,
      [ trip_id,
        location_id,
        user_id,
        rating]
    );
    return itineraryitem;
  } catch (error) {
    throw error;
  }
};

// used by addNewItinRating and changeRating 
// in client helper
const reviseIRating = async ({
  trip_id,
  location_id,
  user_id,
  rating,
  itinerary_id
}) => {
  try {
    const {
      rows: [itineraryitem],
    } = await client.query(
      `UPDATE itineraryitems
       SET trip_id = $1, location_id = $2, user_id = $3, rating = $4
       WHERE itinerary_id = $5
       RETURNING *;
      `,
      [ trip_id,
        location_id,
        user_id,
        rating,
        itinerary_id]
    );
    return itineraryitem;
  } catch (error) {
    throw error;
  }
};

const getAllItineraryitems = async () => {
  try {
    const { rows } = await client.query(`
    SELECT * FROM itineraryitems;
    `);
    return rows;
  } catch (error) {
    throw error;
  }
};

const getItineraryitemById = async (itinerary_id) => {
  try {
    const {
      rows: [itineraryitems],
    } = await client.query(`
      SELECT * 
      FROM itineraryitems
      WHERE itinerary_id = ${itinerary_id};
    `);
    return itineraryitems;
  } catch (error) {
    throw error;
  }
};

const getItineraryByTrip = async (trip_id) => {
  try {
      const { rows } = await client.query(`
      SELECT * 
      FROM itineraryitems
      WHERE trip_id = $1;
    `, [trip_id]);
    return rows;
  } catch (error) {
    throw error;
  }
}


const getItineraryVotes = async (trip_id, location_id) => {
  try {
    const { rows } = await client.query(`
      SELECT * 
      FROM itineraryitems
      WHERE trip_id = $1 AND location_id = $2
    `,[trip_id, location_id])
    return rows;
  } catch (error) {
    throw error;
  }
};

const getItineraryJoinInfo = async ( trip_id ) => {
  try {
    const {rows} = await client.query(`
    SELECT trips.tripname, trips.numdays, trips.numtravelers, 
    trips.isdecided, itineraryitems.location_id, itineraryitems.rating 
    FROM trips 
    JOIN itineraryitems on trips.trip_id = itineraryitems.trip_id 
    WHERE trips.trip_id = $1;
    `,[trip_id])
    console.log(rows)
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  createItineraryitem,
  createItinRating,
  getAllItineraryitems,
  getItineraryitemById,
  getItineraryVotes,
  reviseIRating,
  getItineraryByTrip,
  getItineraryJoinInfo
};
