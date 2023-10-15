const client = require("../client");

const getAllLocations = async () => {
  try {
    const { rows } = await client.query(`
    SELECT * FROM locations
    WHERE vibes
    IS NOT NULL;
    `);
    return rows;
  } catch (error) {
    throw error;
  }
};

const getItineraryLocations = async (destination) => {
  try {
    const { rows } = await client.query(`
    SELECT * 
    FROM locations
    WHERE destination_place_id = '${destination}';
  `);
    return rows;
  } catch (error) {
    throw error;
  }
};

const createLocation = async ({
  location_id,
  coord,
  place_id,
  destination_place_id,
  destination,
  vibes,
}) => {
  try {
    const {
      rows: [location],
    } = await client.query(
      `
        INSERT INTO locations(location_id, coord, place_id, destination_place_id, destination, vibes)
        VALUES($1, $2, $3, $4, $5, $6)
        RETURNING *;
        `,
      [location_id, coord, place_id, destination_place_id, destination, vibes]
    );
    return location;
  } catch (error) {
    throw error;
  }
};

// used by addNewItinRating and changeRating
// in client helper
const createDestRating = async ({ trip_id, location_id, user_id, rating }) => {
  try {
    const {
      rows: [destinationObject],
    } = await client.query(
      `
        INSERT INTO itineraryitems(trip_id, location_id, user_id, rating)
        VALUES($1, $2, $3, $4)
        RETURNING *;
        `,
      [trip_id, location_id, user_id, rating]
    );
    return destinationObject;
  } catch (error) {
    throw error;
  }
};

const reviseDestRating = async ({
  trip_id,
  location_id,
  user_id,
  rating,
  itinerary_id,
}) => {
  try {
    const {
      rows: [destinationObject],
    } = await client.query(
      `UPDATE itineraryitems
       SET trip_id = $1, location_id = $2, user_id = $3, rating = $4
       WHERE itinerary_id = $5
       RETURNING *;
      `,
      [trip_id, location_id, user_id, rating, itinerary_id]
    );
    return destinationObject;
  } catch (error) {
    throw error;
  }
};

const getLocationById = async (location_id) => {
  try {
    const {
      rows: [locations],
    } = await client.query(`
      SELECT * 
      FROM locations
      WHERE location_id = ${location_id};
    `);
    return locations;
  } catch (error) {
    throw error;
  }
};

const getLocationIdByPlaceId = async (place_id) => {
  console.log("Place ID: ", place_id);
  console.log(typeof place_id);
  try {
    const { 
      rows: [locations] 
    } = await client.query(`
      SELECT location_id 
      FROM locations
      WHERE place_id = $1;
    `, [place_id]);
    return locations;
  } catch (error) {
    throw error;
  }
};

// not tested
const getLocationByVibe = async (vibe) => {
  try {
    const {
      rows: [locations],
    } = await client.query(`
      SELECT * 
      FROM locations
      WHERE ${vibe} = ANY (vibe);
    `);
    return locations;
  } catch (error) {
    throw error;
  }
};

// untested -- currently not allowing votes on destination
const getDestVotes = async (trip_id, location_id) => {
  try {
    const { rows } = await client.query(
      `
      SELECT * 
      FROM itineraryitems
      WHERE trip_id = $1 AND location_id = $2;
    `,
      [trip_id, location_id]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

const getLocationNameById = async (location_id) => {
  try {
    const { rows } = await client.query(
      `
      SELECT destination
      FROM locations
      WHERE location_id = $1;
      `,
      [location_id]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};



module.exports = { createLocation, getAllLocations, getLocationById, getLocationByVibe, createDestRating,reviseDestRating, getDestVotes, getLocationNameById, getItineraryLocations, getLocationIdByPlaceId };


