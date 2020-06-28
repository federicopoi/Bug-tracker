const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");
const fileUpload = require("express-fileupload");
const projects = require("./routes/api/projects");
const teams = require("./routes/api/teams");
const tickets = require("./routes/api/tickets");
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");

const app = express();

// Bodyparser Middleware
app.use(express.json());

// DB Config
const db = config.get("mongoURI");
const port = process.env.PORT || 5000;

// Connect to Mongo

mongoose
  .connect(process.env.MONGODB_URI || db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// User routes
app.use("/api/projects", projects);
app.use("/api/teams", teams);
app.use("/api/tickets", tickets);
app.use("/api/users", users);
app.use("/api/auth", auth);

// Step 3
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html")); // relative path
  });
}

app.listen(port, () => console.log(`Server started on port ${port}`));
