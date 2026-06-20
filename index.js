const express = require("express");
const app = express();

// CORS — izinkan frontend mengirim cookie
const cors = require("cors");
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true, // wajib agar cookie bisa dikirim lintas origin
};
app.use(cors(corsOptions));

// dotenv
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const MONGODB_URL = process.env.MONGODB_URL;

// Database connection
const mongoose = require("mongoose");
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log(`Database successfully connected with URL: ${MONGODB_URL}`);
  })
  .catch((e) => {
    console.log(e);
  });

// Data parsers
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Routes
const authRoute = require("./routes/authRoutes");
app.use("/api/auth", authRoute);

const journalRoute = require("./routes/journalRoutes");
app.use("/api/journal", journalRoute);

// App connection
app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
