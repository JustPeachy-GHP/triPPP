const express = require("express");
const router = express.Router();

const {
  getAllJournals,
  createJournal,
  getJournalById,
  getAllJournalsByUser,
  getAllJournalsByTrip,
  deleteJournal,
  updateJournal,
} = require("../db/helpers/journals");

// GET - api/journal - get all journal
router.get("/", async (req, res, next) => {
  try {
    const journal = await getAllJournals();
    res.send(journal);
  } catch (error) {
    throw error;
  }
});

// GET - api/journal/:journalId - get single journal
router.get("/:journal_id", async (req, res, next) => {
  try {
    const journal = await getJournalById(req.params.journal_id);
    res.send(journal);
  } catch (error) {
    next(error);
  }
});

// Get journals by USER
router.get("/user/:user_id", async (req, res, next) => {
  try {
    const journal = await getAllJournalsByUser(req.params.user_id);
    res.send(journal);
    console.log("GETTING JOURNALS BY USER(API)", journal);
  } catch (error) {
    next("CANT GET JOURNALS BY USER(API)", error);
  }
});

router.get("/trip/:user_id/:trip_id", async (req, res, next) => {
  try {
    const journal = await getAllJournalsByTrip(
      req.params.user_id,
      req.params.trip_id
    );
    res.send(journal);
    console.log("GETTING JOURNALS BY USER(API)", journal);
  } catch (error) {
    next("CANT GET JOURNALS BY USER(API)", error);
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
// DELETE - /api/journals/:journal_id - delete a journal
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

// PUT - api/journals/:journal_id - update a journal
router.put("/:journal_id", async (req, res, next) => {
  try {
    const updatedJournal = await updateJournal(req.params.journal_id, req.body);
    res.send(updatedJournal);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
