import express from "express"; // Import the Express framework

import {
  AddTask,
  deleteTask,
  getTasks,
} from "../controllers/TaskController.js"; // Import the controller functions for tasks

const router = express.Router(); // Create an Express router for defining task-related routes

// Route for adding a new task
router.post("/addtask", AddTask);

// Route for getting all tasks for a specific user
router.get("/getAlltasks/:userId", getTasks);

// Route for deleting a task by its ID
router.delete("/deletetask/:taskId", deleteTask);

export default router; // Export the router for use in the main application
