// const client = require("../client");

// const createLocation = async ({ location_id, coord, place_id, destination }) => {
//   try {
//     const {
//       rows: [location],
//     } = await client.query(
//       `
//         INSERT INTO locations(location_id, coord, place_id, destination)
//         VALUES($1, $2, $3, $4)
//         RETURNING *;
//         `,
//       [location_id, coord, place_id, destination]
//     );
//     return location;
//   } catch (error) {
//     throw error;
//   }
// };

// const getAllLocations = async () => {
//   try {
//     const { rows } = await client.query(`
//     SELECT * FROM locations;
//     `);
//     return rows;
//   } catch (error) {
//     throw error;
//   }
// };

// const getLocationById = async (locationId) => {
//   try {
//     const {
//       rows: [locations],
//     } = await client.query(`
//       SELECT * 
//       FROM locations
//       WHERE location_id = ${locationId};
//     `);
//     return locations;
//   } catch (error) {
//     throw error;
//   }
// };

// module.exports = { createLocation, getAllLocations, getLocationById };