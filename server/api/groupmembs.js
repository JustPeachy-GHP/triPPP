const express = require("express");
const router = express.Router();

const {
  getAllGroupmembs,
  createGroupmemb,
  getGroupmembById,
  deleteMember,
} = require("../db/helpers/groupmembs");

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

// check if this is correct
// DELETE /api/groupmembs/:group_id/:user_id - delete single group memb
router.delete("/:group_id/:user_id", async (req, res, next) => {
  try {
    const groupMemb = await deleteMember(
      req.params.group_id,
      req.params.user_id
    );
    res.send(groupMemb);
  } catch (err) {
    next(err);
  }
});


module.exports = router;


