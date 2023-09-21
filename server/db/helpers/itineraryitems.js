const client = require("../client");

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

module.exports = {
  createItineraryitem,
  getAllItineraryitems,
  getItineraryitemById,
};
