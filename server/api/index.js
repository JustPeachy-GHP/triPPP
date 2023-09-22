const express = require("express");
const router = express.Router();

// GET /api/guitarApp
router.get("/", async (req, res, next) => {
  try {
    res.send("OK");
  } catch (error) {
    console.log(error);
  }
});

// ROUTER: api/users
router.use("/users", require("./users"));

// ROUTER: /api/trips

router.use("/trips", require("./trips"));

// ROUTER: /api/journals
router.use("/journals", require("./journals"));

// ROUTER: /api/itineraryitems
router.use("/itineraryitems", require("./itineraryitems"));

// ROUTER: /api/groups
router.use("/groups", require("./groups"));

// ROUTER: /api/groupmembs
router.use("/groupmembs", require("./groupmembs"));

// ROUTER: /api/locations
router.use("/locations", require("./locations"));

module.exports = router;
