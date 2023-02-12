const express = require("express");
const app = express();
const connectDB = require("./db/connectDB");
const tasks = require("./routes/tasks");
const dotenv = require("dotenv");

// Init environmental variables
dotenv.config();

// Look for port number in env. variables
const port = process.env.PORT || 5000;

/// Application level middleware ///

// For JSON payload
app.use(express.json());

// For URLEncoded payload
app.use(express.urlencoded({ extended: true }));

// Route for the application
app.use("/api/v0/tasks", tasks);

// Start function
async function start() {
  try {
    // Connect to DB
    await connectDB(process.env.MONGO_URL);

    // Listen to request on PORT
    app.listen(port, () => {
      console.log(`Server is running on PORT: ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

start();
