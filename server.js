// EXPRESS APP
const express = require("express");
const app = express();
const compression = require("compression");
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// VARIABLES
const PORT = process.env.PORT || 3000;
const database = "budget_db";

// LOGGER
const logger = require("morgan");
app.use(logger("dev"));

// DATABASE CONNECTION
const mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGODB_URI || `mongodb://localhost/${database}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

// ROUTES
app.use(require("./routes/api.js"));

// LISTEN
app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});