const client = require("./client");

const { createTrip, getAllTrips } = require("./helpers/trips");
const { createJournal } = require("./helpers/journals");
const { createItineraryitem } = require("./helpers/itineraryitems");
const { createUser } = require("./helpers/users");
// const { createGroup } = require("./helpers/groups");
const { createGroupmemb } = require("./helpers/groupmembs");
const { createLocation } = require("./helpers/locations");
// destructuring it so we can pull in each array separately

const {
  users,
  locations,
  trips,
  journals,
  itineraryitems,
  groupmembs,
  // groups,
} = require("./seedData.js");

// drop tables
const dropTables = async () => {
  try {
    console.log("tables dropping!");
    // we are calling upon client connection to make query to db
    // took out locations
    await client.query(`
  
      DROP TABLE IF EXISTS users cascade;
      DROP TABLE IF EXISTS trips cascade;
      DROP TABLE IF EXISTS journals cascade;
      DROP TABLE IF EXISTS locations cascade;
      DROP TABLE IF EXISTS itineraryitems cascade;
      DROP TABLE IF EXISTS groupmembs cascade;
      // DROP TABLE IF EXISTS groups cascade;
      DROP TYPE IF EXISTS vibes cascade;
          `);
    console.log("tables dropped!");
  } catch (error) {
    throw error;
  }
};

// drop location table
const dropLocationTables = async () => {
  try {
    console.log("tables dropping!");
    // we are calling upon client connection to make query to db
    // took out locations
    await client.query(`
      DROP TABLE IF EXISTS locations cascade;
          `);
    console.log("LOCATION tables dropped!");
  } catch (error) {
    throw error;
  }
};
// create tables

// removed trip_id from itineraryitems table

const createTables = async () => {
  try {
    console.log("tables are being created!");
    await client.query(`


      CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        email varchar(255) UNIQUE NOT NULL,
        password varchar(255) NOT NULL,
        firstname varchar(255),
        lastname varchar(255)
      );

      CREATE TYPE vibes AS ENUM ('chill', 'shop', 'local', 'party', 'outdoors');
      CREATE TABLE locations (
        location_id SERIAL PRIMARY KEY,
        coord POINT,
        place_id varchar(255),
        destination varchar(255),
        destination_place_id varchar(255),
        vibes vibes[]
    );

      CREATE TABLE itineraryitems (
        itinerary_id SERIAL PRIMARY KEY,
        location_id INTEGER REFERENCES locations(location_id),
        user_id INTEGER REFERENCES users(user_id),
        rating INTEGER 
    );

        CREATE TABLE trips (
            trip_id SERIAL PRIMARY KEY,
            itinerary_id INTEGER REFERENCES itineraryitems(itinerary_id),
            location_id INTEGER REFERENCES locations(location_id),
            tripname varchar(255) NOT NULL,
            numdays INTEGER,
            numtravelers INTEGER,
            isdecided BOOLEAN,
            vibeform vibes,
            user_id INTEGER REFERENCES users(user_id)                     
        );

      //   CREATE TABLE groups (
      //     group_id SERIAL PRIMARY KEY,
      //     user_id INTEGER REFERENCES users(user_id),
      //     trip_id INTEGER REFERENCES trips(trip_id)  
      // );

        CREATE TABLE journals (
            journal_id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(user_id),
            trip_id INTEGER REFERENCES trips(trip_id),
            location_id INTEGER REFERENCES locations(location_id),
            videocontent TEXT,
            image TEXT,
            title varchar(255),
            timestamp timestamptz NOT NULL,
            entry TEXT NOT NULL
        );

        CREATE TABLE groupmembs (
            groupmemb_id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(user_id),
            trip_id INTEGER REFERENCES trips(trip_id),
            group_id INTEGER REFERENCES groups(group_id)
        );



          `);
  } catch (error) {
    throw error;
  }
};

// create initial items

// create location table
// const createLocationTable = async () => {
//   try {
//     console.log("LOCATION tables are being created!");
//     await client.query(`
//     CREATE TABLE locations (
//       location_id SERIAL PRIMARY KEY,
//       coord POINT,
//       place_id varchar(255),
//       destination varchar(255),
//       vibes vibe[]
//   );
//   `);
//   } catch (error) {}
// };

// alter trip table to have group_id
const alterTripTable = async () => {
  try {
    console.log("TRIP tables are being ALTERED!");
    await client.query(`
    ALTER TABLE trips 
      ADD group_id INTEGER REFERENCES groups(group_id)

  `);
  } catch (error) {
    throw error;
  }
  console.log(trips);
};
// alter itinerary items table to have trip_id
const alterItineraryitemTable = async () => {
  try {
    console.log("ITINERARYITEMS tables are being ALTERED!");
    await client.query(`
    ALTER TABLE itineraryitems 
      ADD trip_id INTEGER REFERENCES trips(trip_id)

  `);
  } catch (error) {
    throw error;
  }
  console.log(itineraryitems);
};

// create users
const createInitialUsers = async () => {
  try {
    for (const user of users) {
      await createUser(user);
    }
    console.log("created user");
  } catch (error) {
    throw error;
  }
  console.log(users);
};

// locations
const createInitialLocations = async () => {
  try {
    for (const location of locations) {
      await createLocation(location);
    }
    console.log("created location");
  } catch (error) {
    throw error;
  }
  console.log(locations);
};

const createInitialTrips = async () => {
  try {
    for (const trip of trips) {
      await createTrip(trip);
    }
    console.log("created trip");
  } catch (error) {
    throw error;
  }
  console.log(trips);
};

const createInitialJournals = async () => {
  try {
    for (const journal of journals) {
      await createJournal(journal);
    }
    console.log("created journal");
  } catch (error) {
    throw error;
  }
  console.log(journals);
};

const createInitialItineraryitems = async () => {
  try {
    for (const itineraryitem of itineraryitems) {
      await createItineraryitem(itineraryitem);
    }
    console.log("created itineraryitem");
  } catch (error) {
    throw error;
  }
  console.log(itineraryitems);
};

// const createInitialGroups = async () => {
//   try {
//     for (const group of groups) {
//       await createGroup(group);
//     }
//     console.log("created group");
//   } catch (error) {
//     throw error;
//   }
//   console.log(groups);
// };

const createInitialGroupmembs = async () => {
  try {
    for (const groupmemb of groupmembs) {
      await createGroupmemb(groupmemb);
    }
    console.log("created Groupmembers");
  } catch (error) {
    throw error;
  }
  console.log(groupmembs);
};

// run commands to fix out of sync primary keys
const fixKeys = async () => {
  try {
    console.log("FIXING OUT OF SYNC PRIMARY KEYS");
    await client.query(`
    SELECT setval('groupmembs_groupmemb_id_seq', (select max(groupmemb_id) from groupmembs)+1);
    // SELECT setval('groups_group_id_seq', (select max(group_id) from groups)+1);
    SELECT setval('itineraryitems_itinerary_id_seq', (select max(itinerary_id) from itineraryitems)+1);
    SELECT setval('journals_journal_id_seq', (select max(journal_id) from journals)+1);
    SELECT setval('locations_location_id_seq ', (select max(location_id) from locations)+1);
    SELECT setval('trips_trip_id_seq ', (select max(trip_id) from trips)+1);
    SELECT setval('users_user_id_seq', (select max(user_id) from users)+1);
  `);
  } catch (error) {
    throw error;
  }
  console.log("FIXED KEYS");
};

// rebuild db
const rebuildDb = async () => {
  try {
    // connect to the local database! WOO
    client.connect();
    // run functions
    // await dropLocationTables();
    await dropTables();

    // await createLocationTable();
    await createTables();

    // Generate the data

    await createInitialUsers();

    await createInitialItineraryitems();
    await createInitialTrips();
    // await createInitialGroups();
    await createInitialJournals();
    await createInitialGroupmembs();
    await createInitialLocations();

    await alterTripTable();
    await alterItineraryitemTable();

    await fixKeys();

    // await dropTables();
  } catch (error) {
    console.error(error);
  } finally {
    // close connection
    client.end();
  }
};

rebuildDb();
