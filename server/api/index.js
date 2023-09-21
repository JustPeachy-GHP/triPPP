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

// ROUTER: /api/songs

router.use("/songs", require("./songs"));

// ROUTER: /api/levels
router.use("/levels", require("./levels"));

// ROUTER: /api/tabs
router.use("/tabs", require("./tabs"));

module.exports = router;
