const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Team Model
const Team = require("../../models/Team");

// @route GET api/teams/
// @desc Get All Teams
// @access Public
router.get("/", (req, res) => {
  Team.find()
    .sort({ created: -1 })
    .then((teams) => res.json(teams))
    .catch((err) => res.status(400).json("Error: " + err));
});

// @route POST api/teams/
// @desc Create A Team
// @access Public
router.post("/", (req, res) => {
  const { name, manager, updaters } = req.body;

  // Simple validation
  if (!name || !manager || !updaters) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  const newTeam = new Team({
    name,
    manager,
    updaters,
  });

  newTeam.save().then((team) => res.json(team));
});

// @route POST api/teams/update
// @desc Update Team Users Role
// @access Public
router.post("/update", (req, res) => {
  const { name, updaters } = req.body;

  Team.findOne({ name }).exec((err, team) => {
    if (err) console.log("Update Team  ", err);
    team.updaters = updaters;
    team.save();
    res.json(team);
  });
});

module.exports = router;
