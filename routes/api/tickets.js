const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Ticket Model
const Ticket = require("../../models/Ticket");

// @route GET api/tickets/
// @desc Get All Tickets
// @access Public
router.get("/", (req, res) => {
  Ticket.find()
    .then((tickets) => res.json(tickets))
    .catch((err) => res.status(400).json("Error: " + err));
});

// @route POST api/tickets/
// @desc Create A Item
// @access Public
router.post("/", (req, res) => {
  const {
    summary,
    description,
    priority,
    submitter,
    assignedTeam,
    project,
    type,
  } = req.body;

  // Simple validation
  if (
    !summary ||
    !description ||
    !submitter ||
    !priority ||
    !assignedTeam ||
    !type ||
    !project
  ) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  const newTicket = new Ticket({
    summary,
    description,
    priority,
    submitter,
    assignedTeam,
    project,
    type,
    history: {
      property: "Created ticket",
      oldValue: "",
      newValue: "",
      date: Date.now(),
    },
  });

  newTicket.save().then((ticket) => res.json(ticket));
});

// @route POST api/tickets/assign
// @desc Update Project Users Role
// @access Public
router.post("/assign", (req, res) => {
  const { summary, assignedTo } = req.body;

  Ticket.findOne({ summary }).exec((err, ticket) => {
    if (err) console.log("Assigned Ticket  ", err);
    ticket.assignedTo = assignedTo;
    ticket.status = "Assigned";
    const arr = ticket.history;
    const history = {
      property: "Updated status",
      oldValue: "Open",
      newValue: "Assigned",
      date: Date.now(),
    };
    const concatArr = arr.concat(history);
    ticket.history = concatArr;
    ticket.save();
    res.json(ticket);
  });
});

// @route POST api/tickets/derive
// @desc Update ticket assigned team
// @access Public
router.post("/derive", (req, res) => {
  const { summary, assignedTeam, oldTeam } = req.body;

  Ticket.findOne({ summary }).exec((err, ticket) => {
    if (err) console.log("Assigned Team Ticket  ", err);
    ticket.assignedTeam = assignedTeam;

    const arr = ticket.history;
    const history = {
      property: "Updated Team",
      oldValue: oldTeam,
      newValue: assignedTeam,
      date: Date.now(),
    };
    const concatArr = arr.concat(history);
    ticket.history = concatArr;
    ticket.save();
    res.json(ticket);
  });
});

// @route POST api/tickets/addcomment
// @desc Update Project Users Role
// @access Public
router.post("/addcomment", (req, res) => {
  const { summary, comment } = req.body;

  Ticket.findOne({ summary }).exec((err, ticket) => {
    if (err) console.log("Update Ticket  ", err);

    const arr = ticket.comments;

    const concatArr = arr.concat(comment);
    ticket.comments = concatArr;

    ticket.save().then((ticket) => res.json(ticket));
  });
});

// @route POST api/tickets/update
// @desc Update Ticket
// @access Public
router.post("/update", (req, res) => {
  const { summary, status } = req.body;

  Ticket.findOne({ summary }).exec((err, ticket) => {
    if (err) console.log("Update Ticket  ", err);

    const arr = ticket.history;
    const history = {
      property: "Updated status",
      oldValue: ticket.status,
      newValue: status,
      date: Date.now(),
    };
    const concatArr = arr.concat(history);
    if (ticket.status !== status) {
      ticket.history = concatArr;
    }
    ticket.summary = summary;
    ticket.status = status;
    ticket.save();
    res.json(ticket);
  });
});

module.exports = router;
