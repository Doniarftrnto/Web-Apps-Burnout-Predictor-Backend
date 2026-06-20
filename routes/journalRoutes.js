const express = require("express");
const router = express.Router();

const { createJournal, getUserJournal } = require("../controllers/journalController");

const { protect } = require("../middleware/authMiddleware");

router.post("/add", protect, createJournal);
router.get("/all", protect, getUserJournal);

module.exports = router;
