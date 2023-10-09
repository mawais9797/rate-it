// Import necessary modules and functions
import Users from "../models/usersModel.js";
import generateToken from "../utils/generateToken.js";

// Function to register a new user
export const RegisterUser = async (req, res) => {
  try {
    // Extract user data from the request body
    const { firstName, lastName, email, password } = req.body;

    // Check if a user with the same email already exists
    const userExist = await Users.findOne({ email });
    if (userExist) {
      res.status(400).json({
        message: "User Already Exists",
      });
      throw new Error("User Already Exists");
    }

    // Create a new user with the provided data
    const newUser = await Users.create({
      firstName,
      lastName,
      email,
      password,
    });

    // Respond with the user's details and a token
    if (newUser) {
      res.status(201).json({
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        token: generateToken(newUser._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  } catch (error) {
    console.log("User Registration Error: ", error);
  }
};

// Function for user login
export const userLogin = async (req, res) => {
  console.log("here in login");
  try {
    // Extract email and password from the request body
    const { email, password } = req.body;

    // Find a user with the provided email
    const user = await Users.findOne({ email });

    // Check if the user exists and if the provided password matches
    if (user && (await user.matchPassword(password))) {
      // Respond with the user's details and a token
      res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email,
        phoneNo: user.phoneNo,
        userType: user.userType,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    console.log("Login Error: ", error);
  }
};

// Function to update user information
export const updateUser = async (req, res) => {
  try {
    // Extract user data and update information from the request body
    const { userId, name, email, phoneNo, userType } = req.body;

    // Find the user by their ID
    const userExist = await Users.findById(userId);

    if (userExist) {
      // Update the user properties if they exist in the request body
      userExist.name = name;
      userExist.email = email;
      userExist.phoneNo = phoneNo;
      userExist.userType = userType;

      // Save the updated user object
      await userExist.save();

      // Respond with a success message and the updated user
      res.status(200).json({
        message: "User updated successfully",
        updatedUser: userExist,
      });
    } else {
      // user not found return error
      res.status(404).json({
        message: "User does not exist",
      });
    }
  } catch (error) {
    console.log("Update User Error: ", error);
  }
};

// Function to delete a user by ID
export const deleteUser = async (req, res) => {
  try {
    // Extract the user ID from the request body
    const { userId } = req.body;
    console.log("backend UserID: ", userId);

    // Find the user by userId and delete it
    const deletedUser = await Users.findByIdAndDelete(userId);
    console.log("deletedUser: ", deletedUser);

    if (deletedUser) {
      // Respond with a success message and the deleted user
      res.status(200).json({
        message: "User deleted successfully",
        deletedUser,
      });
    } else {
      // When user not found
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    console.log("Delete Error: ", error);
  }
};
