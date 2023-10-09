import mongoose from "mongoose"; // Import Mongoose for database schema creation
import bcrypt from "bcryptjs"; // Import bcrypt for password hashing

// Define the schema for the "Users" collection
const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true, // The first name is a required field
  },
  lastName: {
    type: String,
    required: true, // The last name is a required field
  },
  email: {
    type: String,
    required: true, // The email is a required field
  },
  password: {
    type: String,
    required: true, // The password is a required field
  },
});

// Define a method for comparing passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Define a pre-save hook to hash the password before saving to the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next(); // If the password has not been modified, skip the hashing process
  }

  const salt = await bcrypt.genSalt(10); // Generate a salt for password hashing
  this.password = await bcrypt.hash(this.password, salt); // Hash the password with the generated salt
});

// Create the "Users" model using the defined schema
const Users = mongoose.model("Users", userSchema);

export default Users; // Export the "Users" model for use in other parts of the application
