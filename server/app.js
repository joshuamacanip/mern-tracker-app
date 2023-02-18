const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db/connectDB");
const tasks = require("./routes/tasks");
const notFound = require("./middleware/notFoundMiddleware");
const dotenv = require("dotenv");

// Init environmental variables
dotenv.config();

// Look for port number in env. variables
const port = process.env.PORT || 5000;

/// Application level middleware ///

app.use(cors());

// For JSON payload
app.use(express.json());

// Route for the application
app.use("/api/v0/tasks", tasks);

// Not found middleware
app.use(notFound);

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
