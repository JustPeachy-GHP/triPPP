const client = require("../client");

const createUser = async ({ email, password, firstname, lastname }) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            INSERT INTO users(email, password, firstname, lastname)
            VALUES($1, $2, $3, $4)
            RETURNING *;
            `,
      [email, password, firstname, lastname]
    );
    return user;
  } catch (error) {
    throw error;
  }
};

// GET - api/users - get all users
async function getAllUsers() {
  try {
    const { rows } = await client.query(`
        SELECT * FROM users;
        `);
    return rows;
  } catch (error) {
    throw error;
  }
}

// GET - /api/users/:id
async function getUserById(user_id) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            SELECT * FROM users
            WHERE user_id = $1;
        `,
      [user_id]
    );
    console.log(user);
    return user;
  } catch (error) {
    throw error;
  }
}
// email = username
const getUserByEmail = async (email) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT * FROM users
    WHERE users.email = $1;
    `,
      [email]
    );
    console.log("db query:", user)
    return user;
  } catch (error) {
    throw error;
  }
};

const updateUserPass = async (email, password) => {
  try {
    const {
      rows: [user],
    } = await client.query(
  `
  UPDATE users
  SET password = $2
  WHERE e-mail = $1;`,
      [email, password]
    );
    return user;
  } catch (error) {
    throw error;
  }
};

const getGroupAdminById = async (user_id) => {
  try {
    const { rows } = await client.query(
      `
    SELECT * 
    FROM groups
    WHERE user_id=$1;
    `,
      [user_id]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

const getGroupMemberById = async (user_id) => {
  try {
    const { rows } = await client.query(
      `
    SELECT * 
    FROM groupmembs
    WHERE user_id=$1;
    `,
      [user_id]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

const getJournalById = async (user_id) => {
  try {
    const { rows } = await client.query(
      `
    SELECT * 
    FROM journals
    WHERE user_id=$1;
    `,
      [user_id]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

const getTripsAdminById = async (user_id) => {
  try {
    const { rows } = await client.query(
      `
    SELECT *
    FROM trips
    WHERE user_id = $1;
    `,
      [user_id]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

const getTripsMemberById = async (user_id) => {
  try {
    const { rows } = await client.query(
      `
    SELECT *
    FROM trips
    JOIN groupmembs on trips.trip_id = groupmembs.trip_id
    WHERE groupmembs.user_id = $1;
    `,
      [user_id]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUserPass,
  getGroupAdminById,
  getGroupMemberById,
  getJournalById,
  getTripsAdminById,
  getTripsMemberById,
};
