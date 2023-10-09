import mongoose from "mongoose"; // Import Mongoose for database schema creation

// Define the schema for the "Tasks" collection
const taskSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true, // The userId is a required field
  },
  title: {
    type: String,
    required: true, // The title is a required field
  },
  details: {
    type: String,
    required: true, // The details are a required field
  },
  category: {
    type: String,
    required: true, // The category is a required field
  },
  date: {
    type: String,
    required: false, // The date is optional and not required
  },
});

// Create the "Tasks" model using the defined schema
const Tasks = mongoose.model("Tasks", taskSchema);

export default Tasks; // Export the "Tasks" model for use in other parts of the application
