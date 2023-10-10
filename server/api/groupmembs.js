const express = require("express");
const router = express.Router();

const {
  getAllGroupmembs,
  createGroupmemb,
  getGroupmembById,
  deleteMember,
  getTripGroupMembsbyId,
} = require("../db/helpers/groupmembs");
// GET - api/groupmembs/trip_id - get all groupmembs by trip id
router.get("/", async (req, res, next) => {
  try {
    const groupmembs = await getAllGroupmembs();
    res.send(groupmembs);
  } catch (error) {
    throw error;
  }
});

// GET - api/groupmembs/trip_id - get all groupmembs by trip id
router.get("/all/:trip_id", async (req, res, next) => {
  try {
    const groupmembs = await getTripGroupMembsbyId(req.params.trip_id);
    res.send(groupmembs);
  } catch (error) {
    throw error;
  }
});

// GET - api/groupmembs/:groupmembId - get single groupmemb
// server doesn't know we are looking for trip_id vs groupmemb_id, so we need to add a slash before query
router.get("/:groupmemb_id", async (req, res, next) => {
  try {
    const groupmemb = await getGroupmembById(req.params.groupmemb_id);
    res.send(groupmemb);
  } catch (error) {
    next(error);
  }
});

// POST - api/groupmembs - post new groupmemb
router.post("/", async (req, res, next) => {
  try {
    const groupmemb = await createGroupmemb(req.body);
    res.send(groupmemb);
  } catch (error) {
    next(error);
  }
});

// check if this is correct
// DELETE /api/groupmembs/:group_id/:user_id - delete single group memb
router.delete("/:trip_id/:user_id", async (req, res, next) => {
  try {
    const groupMemb = await deleteMember(
      req.params.trip_id,
      req.params.user_id
    );
    res.send(groupMemb);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
