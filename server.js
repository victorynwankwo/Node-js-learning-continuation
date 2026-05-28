const express = require("express");
const path = require("path");
// const { logger } = require("./middleware/logEvents");
const cors = require("cors");
const PORT = process.env.PORT || 3500;
const app = express();
const corsOptions = require("./config/corsOption");



// app.use(logger);

app.use(cors(corsOptions));


//
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(express.static(path.join(__dirname, "/public")));
app.use("/subdir",express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/root"));
app.use("/subdir", require("./routes/subdir"));

// API routes
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

app.listen(PORT, () => console.log(`server is running ${PORT}`));
