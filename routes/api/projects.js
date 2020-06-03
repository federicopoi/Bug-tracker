const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Project Model
const Project = require("../../models/Project");
// User Model
const User = require("../../models/User");

// @route GET api/projects/
// @desc Get All Projects
// @access Public
router.get("/", (req, res) => {
  Project.find()
    .sort({ date: -1 })
    .then((projects) => res.json(projects))
    .catch((err) => res.status(400).json("Error: " + err));
});

// @route POST api/projects/
// @desc Create A Project
// @access Public
router.post("/", (req, res) => {
  const { name, manager, teams, submitters } = req.body;

  // Simple validation
  if (!name || !manager || !teams || !submitters) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  const newProject = new Project({
    name,
    manager,
    teams,
    submitters,
  });

  newProject.save().then((project) => res.json(project));
});

// @route POST api/projects/update
// @desc Update Project Users Role
// @access Public
router.post("/update", (req, res) => {
  const { name, teams, submitters } = req.body;

  Project.findOne({ name }).exec((err, project) => {
    if (err) console.log("Update Project  ", err);
    project.teams = teams;
    project.submitters = submitters;
    project.save();
    res.json(project);
  });
});

module.exports = router;
