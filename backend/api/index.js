const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("../config/db");
const apiRoutes = require("../api.routes");

require("../config/dotenv");

const app = express();

// Connect DB
connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api", apiRoutes);

// Global error handler
app.use(require("../middleware/error.middleware"));

// REMOVE app.listen()

module.exports = app;