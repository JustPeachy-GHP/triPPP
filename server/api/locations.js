const express = require("express");
const router = express.Router();

const {
  getAllLocations,
  createLocation,
  getLocationById,
  getLocationByVibe,
  createDestRating,
  reviseDestRating, 
  getDestVotes
} = require("../db/helpers/locations");

// GET - api/locations/checkratings - get all votes that
// match location_id and trip_id
router.get("/destratings/:trip_id/:location_id", async (req, res, next) => {
  try {
    const items = await getDestVotes(req.params.trip_id, req.params.location_id);
    res.send(items);
  } catch (error) {
    next(error);
  }
});

// PUT - api/locations/revisedrating/:itinerary_id - patch changed itinerary rating
router.put("/revisedrating/:itinerary_id", async (req, res, next) => {
  try {
    const destinationObject = await reviseDestRating(
      req.body
      // {itinerary_id: req.params.itinerary_id,
      // trip_id: req.body.trip_id,
      // location_id: req.body.location_id,
      // user_id: req.body.user_id,
      // rating: req.body.rating,}
    );
    // const itineraryitem = await reviseIRating(req.params.itinerary_id, req.body);
    res.send(destinationObject);
  } catch (error) {
    next(error);
  }
});

// POST - api/locations/newrating - post new itinerary item rating
router.post("/newrating", async (req, res, next) => {
  try {
    const destinationObject = await createDestRating(req.body);
    res.send(destinationObject);
  } catch (error) {
    next(error);
  }
});

// not tested
// GET - api/location/vibe/:vibe - locations by vibe
router.get("/vibe/:vibe", async (req, res, next) => {
  try {
    const location = await getLocationByVibe(req.params.vibe);
    res.send(location);
  } catch (error) {
    next(error);
  }
});

// GET - api/location - get all location
router.get("/", async (req, res, next) => {
  try {
    const location = await getAllLocations();
    res.send(location);
  } catch (error) {
    throw error;
  }
});

// // GET - api/location/:locationId - get single location
router.get("/:location_id", async (req, res, next) => {
  try {
    const location = await getLocationById(req.params.location_id);
    res.send(location);
  } catch (error) {
    next(error);
  }
});

// // GET - api/location/:coord - get single location
router.get("/:coord", async (req, res, next) => {
  try {
    const location = await getLocationByCoord(req.params.coord);
    res.send(location);
  } catch (error) {
    next(error);
  }
});

// // GET - api/location/:place_id - get single location
router.get("/:place_id", async (req, res, next) => {
  try {
    const location = await getLocationByPlaceId(req.params.place_id);
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
