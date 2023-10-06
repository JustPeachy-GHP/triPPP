const client = require("../client");

const createGroupmemb = async ({ trip_id, user_id, group_id }) => {
  try {
    const {
      rows: [groupmemb],
    } = await client.query(
      `
        INSERT INTO groupmembs(trip_id, user_id, group_id)
        VALUES($1, $2, $3)
        RETURNING *;
        `,
      [trip_id, user_id, group_id]
    );
    return groupmemb;
  } catch (error) {
    throw error;
  }
};

const getAllGroupmembs = async () => {
  try {
    const { rows } = await client.query(`
    SELECT * FROM groupmembs;
    `);
    return rows;
  } catch (error) {
    throw error;
  }
};

const getGroupmembById = async (groupmemb_id) => {
  try {
    const {
      rows: [groupmembs],
    } = await client.query(`
      SELECT * 
      FROM groupmembs
      WHERE groupmemb_id = ${groupmemb_id};
    `);
    return groupmembs;
  } catch (error) {
    throw error;
  }
};

module.exports = { createGroupmemb, getAllGroupmembs, getGroupmembById };
