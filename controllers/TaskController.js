import Tasks from "../models/TaskModel.js"; // Import the Task model
import Users from "../models/usersModel.js"; // Import the User model

// Function to add a new task
export const AddTask = async (req, res) => {
  try {
    // Extract task data from the request body
    const { userId, title, details, category, date } = req.body;

    // Create a new task with the provided data
    const newTask = await Tasks.create({
      userId,
      title,
      details,
      category,
      date,
    });

    if (newTask) {
      // Respond with the task's details
      res.status(201).json({
        id: newTask._id,
        userId: newTask.userId,
        title: newTask.title,
        details: newTask.details,
        category: newTask.category,
        date: newTask.date,
      });
    } else {
      res.status(400);
      throw new Error("Invalid Task Data");
    }
  } catch (error) {
    console.log("Task Error: ", error);
  }
};

// Function to get all tasks
export const getAllTasks = async (req, res) => {
  try {
    // Fetch all tasks and sort them by ID in descending order
    const allTasks = await Tasks.find().sort({ _id: -1 });

    // Respond with the list of tasks
    res.status(200).json({
      message: "All Tasks retrieved successfully",
      alltasks: allTasks,
    });
  } catch (error) {
    console.log("Error fetching all tasks: ", error);
    res.status(400).json({
      message: "Something went wrong",
    });
  }
};

// Function to get tasks for a specific user
export const getTasks = async (req, res) => {
  try {
    // Extract the user ID from the request parameters
    const userId = req.params.userId;

    // Check if the user with the provided ID exists
    const userExist = await Users.findById(userId);

    if (!userExist) {
      res.status(404).json({
        message: "User not found. Please sign up first",
      });
      return [];
    } else {
      // Fetch all tasks for the user with the provided ID
      const tasks = await Tasks.find({ userId: userId });

      // Respond with the list of tasks for the user
      res.status(200).json({
        message: "All Tasks retrieved successfully",
        alltasks: tasks,
      });
    }
  } catch (error) {
    console.log("Error fetching tasks for user: ", error);
    res.status(400).json({
      message: "Something went wrong",
    });
  }
};

// Function to delete a task by ID
export const deleteTask = async (req, res) => {
  try {
    // Extract the task ID and user ID from the request parameters and body
    const taskId = req.params.taskId;
    const { userId } = req.body;

    // Find the user by their ID
    const user = await Users.findOne({ _id: userId });

    if (user) {
      // If the user exists, find and delete the task by its ID
      const deletedTask = await Tasks.findByIdAndDelete(taskId);

      if (deletedTask) {
        // Respond with a success message
        res.status(200).json({
          message: "Task deleted successfully",
        });
      }
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    console.log("Delete Error: ", error);
  }
};
