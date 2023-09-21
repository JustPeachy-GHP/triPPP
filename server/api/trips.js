const express = require("express");
const router = express.Router();

const { getAllTrips, createTrip, getTripById } = require("../db/helpers/trips");

// GET - api/trips - get all trips
router.get("/", async (req, res, next) => {
  try {
    const trips = await getAllTrips();
    res.send(trips);
  } catch (error) {
    throw error;
  }
});

// GET - api/trips/:tripId - get single trip
router.get("/:tripId", async (req, res, next) => {
  try {
    const trip = await getTripById(req.params.tripId);
    res.send(trip);
  } catch (error) {
    next(error);
  }
});

// POST - api/trips - post new trip
router.post("/", async (req, res, next) => {
  try {
    const trip = await createTrip(req.body);
    res.send(trip);
  } catch (error) {
    next(error);
  }
});
module.exports = router;