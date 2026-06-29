require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
// const { logger } = require("./middleware/logEvents");
const cors = require("cors");
const credentials = require("./middleware/credential");
const PORT = process.env.PORT || 3500;
const app = express();
const corsOptions = require("./config/corsOption");
const verifyJwt = require("./middleware/verifyJwt");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const { swaggerUi, swaggerSpec } = require("./config/swagger");

connectDB();

// app.use(logger);

app.use(cors(corsOptions));
app.use(credentials);

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cookieParser());

app.use(express.static(path.join(__dirname, "/public")));
app.use("/subdir", express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/root"));
app.use("/subdir", require("./routes/subdir"));

// API routes
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true }),
);
app.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

app.use(verifyJwt);
app.use("/employees", require("./routes/api/employees"));

app.all(/.*/, (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"), (err) => {
      if (err) {
        res.type("txt").send("404 Not Found");
      }
    });
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
