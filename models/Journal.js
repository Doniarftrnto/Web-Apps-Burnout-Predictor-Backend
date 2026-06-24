const moongoose = require("mongoose");

const journalSchema = new moongoose.Schema(
  {
    userId: {
      type: moongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    journal_text: {
      type: String,
      required: [true, "Journal text is required"],
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    sentiment: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Burnout", "At risk", "Healthy", ""],
      default: "",
    },
    burnout_precentage: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = moongoose.model("Journal", journalSchema);
