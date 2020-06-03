const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const TeamSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    manager: {
      type: String,
      required: true,
    },
    updaters: [{ type: Array }],
    created: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "teams",
  }
);

module.exports = Team = mongoose.model("team", TeamSchema);
