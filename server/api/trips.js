const express = require("express");
const router = express.Router();

const {
  getAllTrips,
  createTrip,
  getTripById,
  updateTrip,
  deleteTrip,
  setIsDecidedTrip
} = require("../db/helpers/trips");

// GET - api/trips - get all trips
router.get("/", async (req, res, next) => {
  try {
    const trips = await getAllTrips();
    res.send(trips);
  } catch (error) {
    throw error;
  }
});

// GET - api/trips/:trip_id - get single trip
router.get("/:trip_id", async (req, res, next) => {
  try {
    const trip = await getTripById(req.params.trip_id);
    res.send(trip);
  } catch (error) {
    next(error);
  }
});

//PATCH - api/trips/decided/:trip_id
router.patch("/decided/:trip_id", async (req, res, next) => {
  try {
    console.log("in server api", req.body)
    const trip = await setIsDecidedTrip(req.body)
    res.send(trip)
  } catch (error) {
    next(error)
  }
})

// POST - api/trips - post new trip
router.post("/", async (req, res, next) => {
  try {
    const trip = await createTrip(req.body);
    res.send(trip);
  } catch (error) {
    next(error);
  }
});

// // PUT- api/trips/:trip_id - update a single trip
router.put("/:trip_id", async (req, res, next) => {
  try {
    const trip = await updateTrip(req.params.trip_id, req.body);
    res.send(trip);
  } catch (err) {
    next(err);
  }
});

// DELETE - api/trips - delete trip
router.delete("/:trip_id", async (req, res, next) => {
  try {
    const trip = await deleteTrip(req.params.id);
    res.send(trip);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
