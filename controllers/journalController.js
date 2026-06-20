const Journal = require("../models/Journal");

const createJournal = async (req, res) => {
  try {
    const { title, journal_text } = req.body;

    if (!title || !journal_text) {
      return res.status(400).json({
        message: "Title and journal text are required",
      });
    }

    const newJournal = await Journal.create({
      userId: req.user._id,
      title,
      journal_text,
    });

    res.status(201).json({
      message: "Journal created successfully",
      journal: newJournal,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating journal",
      error: error.message,
    });
  }
};

const getUserJournal = async (req, res) => {
  try {
    const journals = await Journal.find({
      userId: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "User journals fetched successfully",
      count: journals.length,
      journals,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching user journals",
      error: error.message,
    });
  }
};

module.exports = { createJournal, getUserJournal };
