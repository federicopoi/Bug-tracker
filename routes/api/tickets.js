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
  const { title, description, priority, assignedDev, project, type } = req.body;

  // Simple validation
  if (!title || !description || !priority || !assignedDev || !type) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  const newTicket = new Ticket({
    title,
    description,
    priority,
    assignedDev,
    project,
    type,
  });

  newTicket.save().then((ticket) => res.json(ticket));
});

// @route POST api/tickets/addcomment
// @desc Update Project Users Role
// @access Public
router.post("/addcomment", (req, res) => {
  const { title, comment } = req.body;

  Ticket.findOne({ title }).exec((err, ticket) => {
    if (err) console.log("Update Ticket  ", err);

    const arr = ticket.comments;

    const concatArr = arr.concat(comment);
    ticket.comments = concatArr;

    ticket.save().then((ticket) => res.json(ticket));
  });
});

module.exports = router;
