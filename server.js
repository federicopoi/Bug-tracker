const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");

const items = require("./routes/api/items");
const projects = require("./routes/api/projects");
const tickets = require("./routes/api/tickets");
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");

const app = express();

// Bodyparser Middleware
app.use(express.static(path.join(__dirname, "client", "build")));

// DB Config
const db = config.get("mongoURI");

// Connect to Mongo

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// User routes
app.use("/api/items", items);
app.use("/api/projects", projects);
app.use("/api/tickets", tickets);
app.use("/api/users", users);
app.use("/api/auth", auth);

const port = process.env.PORT || 5000;
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
app.listen(port, () => console.log(`Server started on port ${port}`));
