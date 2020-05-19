const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const ProjectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    personal: [{ type: Array, require: true }],
    personalList: [{ type: String, require: true }],
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
