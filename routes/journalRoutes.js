const express = require("express");
const router = express.Router();

const { createJournal, getUserJournal, getHistory, getJournalById, updateJournal, deleteJournal } = require("../controllers/journalController");

const { protect } = require("../middleware/authMiddleware");

router.post("/add", protect, createJournal);
router.get("/all", protect, getUserJournal);
router.get("/history", protect, getHistory);
router.get("/:id", protect, getJournalById);
router.put("/update/:id", protect, updateJournal);
router.delete("/delete/:id", protect, deleteJournal);

module.exports = router;
