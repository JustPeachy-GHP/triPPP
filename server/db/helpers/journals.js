const client = require("../client");

const createJournal = async ({
  // journal_id,
  user_id,
  trip_id,
  videocontent,
  image,
  title,
  timestamp,
  entry,
}) => {
  console.log(user_id, trip_id, videocontent, image, title, timestamp, entry);
  try {
    const {
      rows: [journal],
    } = await client.query(
      `
        INSERT INTO journals(user_id, trip_id, videocontent, image, title, timestamp, entry)
        VALUES($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
        `,
      [
        // journal_id,
        user_id,
        trip_id,
        videocontent,
        image,
        title,
        timestamp,
        entry,
      ]
    );
    console.log(journal);
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

const getAllJournalsByTrip = async (user_id, trip_id) => {
  try {
    const { rows } = await client.query(
      `
      SELECT *
      FROM journals
      WHERE user_id = $1
      AND trip_id = $2
    `,
      [user_id, trip_id]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

const getAllJournalsByUser = async (user_id) => {
  try {
    const { rows } = await client.query(
      `
      SELECT * 
      FROM journals
      WHERE user_id = $1
    `,
      [user_id]
    );
    console.log("GETTING JOURNALS BY USER(DB)", rows);
    return rows;
  } catch (error) {
    throw ("CANT GET JOURNALS BY USER(DB)", error);
  }
};

const getAllJournalsByLocation = async (user_id, location_id) => {
  try {
    const { rows } = await client.query(
      `
      SELECT * 
      FROM journals
      WHERE user_id = $1
      AND location_id = $2
    `,
      [user_id, location_id]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

const deleteJournal = async (journal_id) => {
  try {
    console.log("deleting a song");
    const { rows } = await client.query(`
    DELETE FROM journals
    WHERE journal_id = ${journal_id}
    RETURNING *;
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

const updateJournal = async (journal_id, edits = {}) => {
  const changeString = Object.keys(edits)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(",");

  if (changeString.length === 0) {
    return;
  }
  try {
    const {
      rows: [journal],
    } = await client.query(
      `
    UPDATE journals
    SET ${changeString}
    WHERE journal_id=${journal_id}
    RETURNING * ;`,
      Object.values(edits)
    );
    return journal;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createJournal,
  getAllJournals,
  getAllJournalsByTrip,
  getJournalById,
  updateJournal,
  deleteJournal,
  getAllJournalsByLocation,
  getAllJournalsByUser,
};
