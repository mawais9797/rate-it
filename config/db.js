import mongoose from "mongoose"; // Import the Mongoose library for MongoDB connectivity

const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB database using the provided MONGO_URI
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true, // Use the new Server Discovery and Monitoring engine
      useNewUrlParser: true, // Use the new URL parser
    });

    // If the connection is successful, log a message indicating the host and database name
    console.log(
      `MongoDB Connected: ${conn.connection.host}/mindmark`.cyan.underline
    );
  } catch (error) {
    // If an error occurs during the connection attempt, handle it and log an error message
    console.log("Error Captured");
    console.log(`Error: ${error.message}`.red.underline.bold);
    process.exit(1); // Exit the Node.js process with an error code (1) to indicate failure
  }
};

export default connectDB; // Export the connectDB function for use in other parts of the application
