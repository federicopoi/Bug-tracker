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
const port = process.env.PORT || 8080;

// Connect to Mongo
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// Bodyparser Middleware
app.use(express.json());

// DB Config
const db = config.get("mongoURI");

// User routes
app.use("/api/items", items);
app.use("/api/projects", projects);
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
