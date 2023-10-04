const express = require("express");
const router = express.Router();

const {
  getAllLocations,
  createLocation,
  getLocationById,
} = require("../db/helpers/locations");

// GET - api/location - get all location
router.get("/", async (req, res, next) => {
  try {
    const location = await getAllLocations();
    res.send(location);
  } catch (error) {
    throw error;
  }
});

// GET - api/location/:locationId - get single location
router.get("/:location_id", async (req, res, next) => {
  try {
    const location = await getLocationById(req.params.location_id);
    res.send(location);
  } catch (error) {
    next(error);
  }
});

// POST - api/location - post new location
router.post("/", async (req, res, next) => {
  try {
    const location = await createLocation(req.body);
    res.send(location);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
