const client = require("./client");

const {
  users,
  locations,
  trips,
  journals,
  itineraryitems,
  groupmembers,
  groups,
} = require("./seedData.js");

// drop tables
const dropTables = async () => {
  try {
    console.log("tables dropping!");
    // we are calling upon client connection to make query to db
    await client.query(`
  
      DROP TABLE IF EXISTS users cascade;
      DROP TABLE IF EXISTS locations cascade;
      DROP TABLE IF EXISTS trips cascade;
      DROP TABLE IF EXISTS journals cascade;
      DROP TABLE IF EXISTS itineraryitems cascade;
      DROP TABLE IF EXISTS groupmembers cascade;
      DROP TABLE IF EXISTS groups cascade;
          `);
    console.log("tables dropped!");
  } catch (error) {
    throw error;
  }
};
// create tables

// leaving out locations at this time
    //   CREATE TABLE locations (
    //     location_id SERIAL PRIMARY KEY,
    //     coord POINT,
    //     place_id TEXT,
    //     destination varchar(255)
    // );
// removed trip_id and location_id from itineraryitems table and location_id was removed from trip table

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
  



        CREATE TYPE vibe AS ENUM ('chill', 'shop', 'local', 'party', 'outdoors');
        CREATE TABLE trip (
            trip_id SERIAL PRIMARY KEY,
            itinerary_id INTEGER REFERENCES itineraryitems(intinerary_id),
            group_id INTEGER REFERENCES groups(group_id),
            tripname varchar(255) NOT NULL,
            numdays INTEGER,
            numtravelers INTEGER,
            isdecided BOOLEAN,
            vibeform vibe
                        
        );

        CREATE TABLE itineraryitems (
            itinerary_id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(user_id),
            rating INTEGER
        );

        CREATE TABLE journals (
            journal_id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(user_id),
            trip_id INTEGER REFERENCES trips(trip_id),
            videocontent TEXT,
            image TEXT,
            title varchar(255),
            timestamp timestamptz NOT NULL,
            entry TEXT NOT NULL
        );


        CREATE TABLE groups (
            group_id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(user_id),
            trip_id INTEGER REFERENCES trips(trip_id)
            
        );

        CREATE TABLE groupmembers (
            groupmembers_id SERIAL PRIMARY KEY,
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
// const createInitialLocations = async () => {
//   try {
//     for (const location of locations) {
//       await createLocation(location);
//     }
//     console.log("created location");
//   } catch (error) {
//     throw error;
//   }
//   console.log(locations);
// };

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

const createInitialGroups = async () => {
  try {
    for (const group of groups) {
      await createGroup(group);
    }
    console.log("created group");
  } catch (error) {
    throw error;
  }
  console.log(groups);
};

const createInitialGroupmembers = async () => {
  try {
    for (const groupmembers of groupmembers) {
      await createGroupmember(groupmembers);
    }
    console.log("created Groupmembers");
  } catch (error) {
    throw error;
  }
  console.log(groupmembers);
};

// rebuild db
const rebuildDb = async () => {
  try {
    // connect to the local database! WOO
    client.connect();
    // run functions
    await dropTables();
    await createTables();

    // Generate the data

    await createInitialUsers();
    // await createInitialLocations();
    await createInitialTrips();
    await createInitialJournals();
    await createInitialItineraryitems();
    await createInitialGroups();
    await createInitialGroupmembers();

    // come back later after we create this in helpers
    // await getAllSongs();
  } catch (error) {
    console.error(error);
  } finally {
    // close connection
    client.end();
  }
};

rebuildDb();
