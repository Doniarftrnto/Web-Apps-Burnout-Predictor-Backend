const Journal = require("../models/Journal");

const createJournal = async (req, res) => {
  try {
    const { title, journal_text, date, time } = req.body;

    if (!title || !journal_text || !date || !time) {
      return res.status(400).json({
        message: "Title, journal text, date, and time are required",
      });
    }

    const newJournal = await Journal.create({
      userId: req.user._id,
      title,
      journal_text,
      date,
      time,
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

const getHistory = async (req, res) => {
  try {
    const { search, status } = req.query;
    
    let query = { userId: req.user._id };

    if (status && status !== 'All') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { journal_text: { $regex: search, $options: 'i' } }
      ];
    }

    const journals = await Journal.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      message: "History fetched successfully",
      count: journals.length,
      journals,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching history",
      error: error.message,
    });
  }
};

const getJournalById = async (req, res) => {
  try {
    const journalId = req.params.id;
    const journal = await Journal.findOne({ _id: journalId, userId: req.user._id });

    if (!journal) {
      return res.status(404).json({ message: "Journal not found" });
    }

    res.status(200).json({ message: "Journal fetched successfully", journal });
  } catch (error) {
    res.status(500).json({ message: "Error fetching journal", error: error.message });
  }
};

const updateJournal = async (req, res) => {
  try {
    const { title, journal_text, date, time } = req.body;
    const journalId = req.params.id;

    const journal = await Journal.findOneAndUpdate(
      { _id: journalId, userId: req.user._id },
      { title, journal_text, date, time },
      { new: true, runValidators: true }
    );

    if (!journal) {
      return res.status(404).json({ message: "Journal not found or unauthorized" });
    }

    res.status(200).json({ message: "Journal updated successfully", journal });
  } catch (error) {
    res.status(500).json({ message: "Error updating journal", error: error.message });
  }
};

const deleteJournal = async (req, res) => {
  try {
    const journalId = req.params.id;
    
    const journal = await Journal.findOneAndDelete({ 
      _id: journalId, 
      userId: req.user._id 
    });

    if (!journal) {
      return res.status(404).json({ message: "Journal not found or unauthorized" });
    }

    res.status(200).json({ message: "Journal deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting journal", error: error.message });
  }
};

module.exports = { createJournal, getUserJournal, getHistory, getJournalById, updateJournal, deleteJournal };
