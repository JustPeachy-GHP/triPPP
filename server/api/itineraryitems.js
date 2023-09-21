const express = require("express");
const router = express.Router();

const {
  getAllItineraryitems,
  createItineraryitem,
  getItineraryitemById,
} = require("../db/helpers/itineraryitems");

// GET - api/itineraryitems - get all itineraryitems
router.get("/", async (req, res, next) => {
  try {
    const itineraryitems = await getAllItineraryitems();
    res.send(itineraryitems);
  } catch (error) {
    throw error;
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
