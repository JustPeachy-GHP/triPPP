const client = require("../client");

const createJournal = async ({
  journal_id,
  user_id,
  trip_id,
  videocontent,
  image,
  title,
  timestamp,
  entry,
}) => {
  try {
    const {
      rows: [journal],
    } = await client.query(
      `
        INSERT INTO journals(journal_id, user_id, trip_id, videocontent, image, title, timestamp, entry)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
        `,
      [
        journal_id,
        user_id,
        trip_id,
        videocontent,
        image,
        title,
        timestamp,
        entry,
      ]
    );
    return journal;
  } catch (error) {
    throw error;
  }
};

const getAllJournals = async () => {
  try {
    const { rows } = await client.query(`
    SELECT * FROM journals;
    `);
    return rows;
  } catch (error) {
    throw error;
  }
};

const getJournalById = async (journal_id) => {
  try {
    const {
      rows: [journals],
    } = await client.query(`
      SELECT * 
      FROM journals
      WHERE journal_id = ${journal_id};
    `);
    return journals;
  } catch (error) {
    throw error;
  }
};

module.exports = { createJournal, getAllJournals, getJournalById };
