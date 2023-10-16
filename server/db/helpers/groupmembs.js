const client = require("../client");

const createGroupmemb = async ({ trip_id, user_id }) => {
  try {
    const {
      rows: [groupmemb],
    } = await client.query(
      `
        INSERT INTO groupmembs(trip_id, user_id)
        VALUES($1, $2)
        RETURNING *;
        `,
      [trip_id, user_id]
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

const deleteMember = async (trip_id, user_id) => {
  try {
    const { rows } = await client.query(
      `
    DELETE FROM groupmembs WHERE "trip_id"=$1 AND "user_id"=$2 RETURNING *

    `,
      [trip_id, user_id]
    );
    return rows[0];
  } catch (err) {
    throw err;
  }
};

const getTripGroupMembsbyId = async (trip_id) => {
  try {
    console.log("gettripmembs XXXXX", trip_id);
    const { rows } = await client.query(
      `SELECT groupmembs.trip_id, groupmembs.user_id, users.email, users.firstname, users.lastname
      FROM groupmembs 
      JOIN users on users.user_id = groupmembs.user_id 
      WHERE groupmembs.trip_id = $1;`,
      [trip_id]
    );
    console.log("in db helper", rows);
    return rows;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createGroupmemb,
  getAllGroupmembs,
  getGroupmembById,
  deleteMember,
  getTripGroupMembsbyId,
};
