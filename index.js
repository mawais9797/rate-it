import express from "express"; // Import the Express framework
import cors from "cors"; // Import CORS for handling cross-origin requests
import bodyParser from "body-parser"; // Import body-parser for parsing request bodies
import colors from "colors"; // Import colors for console output styling
import dotenv from "dotenv"; // Import dotenv for environment variables
import connectDB from "./config/db.js"; // Import the database connection function

import userRoutes from "./routes/userRoutes.js"; // Import user routes
import TsakRoutes from "./routes/TaskRoutes.js"; // Import task routes

dotenv.config(); // Load environment variables

const app = express(); // Create an Express application
connectDB(); // Connect to the database

app.use(bodyParser.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS for handling cross-origin requests

app.use("/task", TsakRoutes); // Define routes for Task-related APIs
app.use("/user", userRoutes); // Define routes for User-related APIs

const PORT = 5003; // Specify the port for the server to listen on
app.listen(
  PORT,
  () => console.log(`App is listening at http://localhost:${PORT}`) // Start the server and log a message to the console
);
