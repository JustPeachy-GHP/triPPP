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
async function getUserById(id) {
  try {
    const {
      rows: [user],
    } = await client.query(`
            SELECT * FROM users
            WHERE user_id = ${id}
        `);
    console.log(user);
    return user;
  } catch (error) {
    throw error;
  }
}
// email = username
const getUserByEmail = async (email) => {
  const {
    rows: [user],
  } = await client.query(
    `
    SELECT * FROM users
    WHERE users.email = $1
    `,
    [email]
  );
  return user;
};

module.exports = { createUser, getAllUsers, getUserById, getUserByEmail };
