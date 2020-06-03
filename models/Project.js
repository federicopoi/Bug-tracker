const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const ProjectSchema = new Schema(
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
    teams: [
      {
        type: Array,
        require: true,
      },
    ],
    submitters: [
      {
        type: Array,
        require: true,
      },
    ],
    created: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "projects",
  }
);

module.exports = Project = mongoose.model("project", ProjectSchema);
