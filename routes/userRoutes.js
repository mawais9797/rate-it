import express from "express"; // Import the Express framework

import { RegisterUser, userLogin } from "../controllers/userController.js"; // Import the controller functions for user registration and login

const router = express.Router(); // Create an Express router for defining user-related routes

// Route for user registration
router.post("/registeruser", RegisterUser);

// Route for user login
router.post("/login", userLogin);

export default router; // Export the router for use in the main application
