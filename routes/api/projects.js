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
  const { title, description, personal } = req.body;

  // Simple validation
  if (!title || !description || !personal) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  User.find({ name: personal.map((item, index) => item) }).then((...users) => {
    const newProject = new Project({
      title,
      description,
      personal: users,
      personalList: personal,
    });

    newProject.save().then((project) => res.json(project));
  });
});

// @route POST api/projects/update
// @desc Update Project Users Role
// @access Public
router.post("/update", (req, res) => {
  const { title, personal } = req.body;

  Project.findOne({ title }).exec((err, project) => {
    if (err) console.log("Update Project  ", err);
    User.find({ name: personal.map((item, index) => item) }).then(
      (...users) => {
        project.personal = users;
        project.personalList = personal;
        project.save();
        res.json(project);
      }
    );
  });
});

module.exports = router;
