const express = require("express");
const router = express.Router();

const {
  getAllJournals,
  getAllJournalsByTrip,
  createJournal,
  getJournalById,
  updateJournal,
  deleteJournal,
  getAllJournalsByLocation,
} = require("../db/helpers/journals");

// GET - api/journals - get all journal
router.get("/", async (req, res, next) => {
  try {
    const journal = await getAllJournals();
    res.send(journal);
  } catch (error) {
    throw error;
  }
});

// GET - api/journals/:user_id/:trip_id
router.get("/:user_id/:trip_id", async (req, res, next) => {
  try {
    const journal = await getAllJournalsByTrip(
      req.params.user_id,
      req.params.trip_id
    );
    res.send(journal);
  } catch (error) {
    throw error;
  }
});

// DELETE - /api/journals/:user_id/:trip_id - delete a journal
router.delete("/:journal_id", async (req, res, next) => {
  try {
    console.log("entering router delete");
    const journal = await deleteJournal(req.params.journal_id);
    console.log(journal);
    res.send(journal);
  } catch (error) {
    console.error(error);
  }
});

// GET - api/journals/:journalId - get single journal
router.get("/:journal_id", async (req, res, next) => {
  try {
    const journal = await getJournalById(req.params.journal_id);
    res.send(journal);
  } catch (error) {
    next(error);
  }
});

// POST - api/journal - post new journal
router.post("/", async (req, res, next) => {
  try {
    const journal = await createJournal(req.body);
    res.send(journal);
  } catch (error) {
    next(error);
  }
});

router.patch("/:journal_id/edit", async (req, res, next) => {
  try {
    const journal = await updateJournal(req.params.journal_id, req.body);
    res.send(journal);
  } catch (error) {
    throw error;
  }
});

// GET - api/journals/:location_id
router.get(
  "/journals/locations/:user_id/:location_id",
  async (req, res, next) => {
    try {
      const journal = await getAllJournalsByLocation();
      res.send(journal);
    } catch (error) {
      throw error;
    }
  }
);

module.exports = router;
