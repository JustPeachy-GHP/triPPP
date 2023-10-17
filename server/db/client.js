// Require Client from pg
const { Client } = require("pg");

//Establishing connect to database (like how we do with http://)
const dbName = 'trippp'

const client = new Client(`postgres://trippp_user:3h7D0Roc9T960qWcLKqcLZL9embhidAR@dpg-cknd5ih1rp3c73b51ahg-a/trippp`)


//Export for use in other files
module.exports = client;
