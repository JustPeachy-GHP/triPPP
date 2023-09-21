const express = require("express");
const router = express.Router();

const { getAllGroups, createGroup, getGroupById } = require("../db/helpers/groups");

// GET - api/groups - get all groups
router.get("/", async (req, res, next) => {
  try {
    const groups = await getAllGroups();
    res.send(groups);
  } catch (error) {
    throw error;
  }
});

// GET - api/groups/:groupId - get single group
router.get("/:groupId", async (req, res, next) => {
  try {
    const group = await getGroupById(req.params.groupId);
    res.send(group);
  } catch (error) {
    next(error);
  }
});

// POST - api/groups - post new group
router.post("/", async (req, res, next) => {
  try {
    const group = await createGroup(req.body);
    res.send(group);
  } catch (error) {
    next(error);
  }
});
module.exports = router;