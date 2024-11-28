const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const locationsRoute = require("./routes/locations");
const reviewsRoute = require("./routes/reviews");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/locations", locationsRoute);
app.use("/api/reviews", reviewsRoute);

// Server
const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
