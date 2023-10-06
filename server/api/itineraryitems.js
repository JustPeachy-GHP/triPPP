const express = require("express");
const router = express.Router();

const {
  getAllItineraryitems,
  createItineraryitem,
  createItinRating,
  getItineraryitemById,
  getItineraryVotes,
  reviseIRating,
  getItineraryByTrip,
  getItineraryJoinInfo
} = require("../db/helpers/itineraryitems");

// GET - api/itineraryitems/itinjoin/:trip_id/
router.get("/itinjoin/:trip_id/", async (req, res, next) => {
  try {
    console.log("in api, trip_id", req.params.trip_id)
    const response = await getItineraryJoinInfo(req.params.trip_id);
    res.send(response);
  } catch (error) {
    next(error);
  }
});

// GET - api/itineraryitems/checkratings - get all votes that
// match location_id and trip_id
router.get("/checkratings/:trip_id/:location_id", async (req, res, next) => {
  try {
    const items = await getItineraryVotes(req.params.trip_id, req.params.location_id);
    res.send(items);
  } catch (error) {
    next(error);
  }
});

// PUT - api/itineraryitems/reviseirating/:itinerary_id - patch changed itinerary rating
router.put("/reviseirating/:itinerary_id", async (req, res, next) => {
  try {
    const itineraryitem = await reviseIRating(
      req.body
    );
    // const itineraryitem = await reviseIRating(req.params.itinerary_id, req.body);
    res.send(itineraryitem);
  } catch (error) {
    next(error);
  }
});

// GET - api/itineraryitems/bytrip/:trip_id - get all itinerary items associated with a trip
router.get("/bytrip/:trip_id", async (req, res, next) => {
  try {
    const response = await getItineraryByTrip(req.params.trip_id);
    res.send(response);
  } catch (error) {
    next(error);
  }
});

// GET - api/itineraryitems/:itineraryitemId - get single itineraryitem
router.get("/:itineraryitemId", async (req, res, next) => {
  try {
    const item = await getItineraryitemById(req.params.itineraryitemId);
    res.send(item);
  } catch (error) {
    next(error);
  }
});

// GET - api/itineraryitems - get all itineraryitems
router.get("/", async (req, res, next) => {
  try {
    const itineraryitems = await getAllItineraryitems();
    res.send(itineraryitems);
  } catch (error) {
    throw error;
  }
});

// POST - api/itineraryitems/newrating - post new itinerary item rating
router.post("/newrating", async (req, res, next) => {
  try {
    const itineraryitem = await createItinRating(req.body);
    res.send(itineraryitem);
  } catch (error) {
    next(error);
  }
});

// POST - api/itineraryitems - post new itineraryitem
router.post("/", async (req, res, next) => {
  try {
    const itineraryitem = await createItineraryitem(req.body);
    res.send(itineraryitem);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
