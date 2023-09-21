const express = require("express");
const router = express.Router();

const { getAllJournals, createJournal, getJournalById } = require("../db/helpers/journals");

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
router.get("/:journalId", async (req, res, next) => {
  try {
    const journal = await getJournalById(req.params.journalId);
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
module.exports = router;