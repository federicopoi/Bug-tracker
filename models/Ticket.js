const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const TicketSchema = new Schema(
  {
    summary: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Open",
    },
    priority: {
      type: String,
      required: true,
    },
    submitter: {
      type: String,
      required: true,
    },
    assignedTeam: {
      type: String,
      required: true,
    },
    assignedTo: {
      type: String,
    },
    project: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    meta_data: {},
    comments: {
      type: Array,
      commenter: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      created: {
        type: Date,
        required: true,
      },
    },
    created: {
      type: Date,
      default: Date.now,
    },
  },

  {
    collection: "tickets",
  }
);

module.exports = Ticket = mongoose.model("ticket", TicketSchema);
