// const client = require("../client");

// const createGroup = async ({ group_id, user_id, trip_id }) => {
//   try {
//     const {
//       rows: [group],
//     } = await client.query(
//       `
//         INSERT INTO groups(group_id, user_id, trip_id)
//         VALUES($1, $2, $3)
//         RETURNING *;
//         `,
//       [group_id, user_id, trip_id]
//     );
//     return group;
//   } catch (error) {
//     throw error;
//   }
// };

// const getAllGroups = async () => {
//   try {
//     const { rows } = await client.query(`
//     SELECT * FROM groups;
//     `);
//     return rows;
//   } catch (error) {
//     throw error;
//   }
// };

// const getGroupById = async (groupId) => {
//   try {
//     const {
//       rows: [groups],
//     } = await client.query(`
//       SELECT * 
//       FROM groups
//       WHERE group_id = ${groupId};
//     `);
//     return groups;
//   } catch (error) {
//     throw error;
//   }
// };

// module.exports = { createGroup, getAllGroups, getGroupById };