const express = require("express");
const router = express.Router();

const { getAllGroupmembs, createGroupmemb, getGroupmembById } = require("../db/helpers/groupmembs");

// GET - api/groupmembs - get all groupmembs
router.get("/", async (req, res, next) => {
  try {
    const groupmembs = await getAllGroupmembs();
    res.send(groupmembs);
  } catch (error) {
    throw error;
  }
});

// GET - api/groupmembs/:groupmembId - get single groupmemb
router.get("/:groupmembId", async (req, res, next) => {
  try {
    const groupmemb = await getGroupmembById(req.params.groupmembId);
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
module.exports = router;