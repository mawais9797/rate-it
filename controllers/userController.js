import Users from "../models/usersModel.js";
import generateToken from "../utils/generateToken.js";

export const RegisterUser = async (req, res) => {
  try {
    const { name, email, phoneNo, password } = req.body;

    const userExist = await Users.findOne({ email });
    if (userExist) {
      res.status(400).json({
        message: "User Already Exist",
      });
      throw new Error("User Already Exist");
    }
    const newUser = await Users.create({
      name,
      email,
      phoneNo,
      password,
    });
    if (newUser) {
      console.log("NewUser: ", newUser);
      res.status(201).json({
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phoneNo: newUser.phoneNo,
        token: generateToken(newUser._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  } catch (error) {
    console.log("User Registeration Error: ", error);
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = Users.findOne({ email });
    console.log("user: ", user);
    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email,
        phoneNo: user.phoneNo,
        token: generateToken(user_id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    console.log("LoginError: ", error);
  }
};
