const express = require("express");
const app = express();

// CORS
// const cors = require("cors");
// const corsOptions = {
//   origin: "http://localhost:5173",
//   credentials: true,
// };
// app.use(cors(corsOptions));

// dotenv stuff
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const MONGODB_URL = process.env.MONGODB_URL;

// database conneection
const mongoose = require("mongoose");
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log(`Database successfully connected with URL: ${MONGODB_URL}`);
  })
  .catch((e) => {
    console.log(e);
  });

// data parsers
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// routes
const authRoute = require("./routes/authRoutes");
app.use("/api/auth", authRoute);

// journal routes
const journalRoute = require("./routes/journalRoutes");
app.use("/api/journal", journalRoute);

// app connection
app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
