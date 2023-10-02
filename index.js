import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { RegisterUser, userLogin } from "./controllers/userController.js";
// import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = 5002;

app.use(cors());
app.use(bodyParser.json());
dotenv.config();
connectDB();

app.get("/", (req, res) => {
  res.send("server is working");
});

app.post("/register", RegisterUser);
app.post("/login", userLogin);
// app.post("/user/registration", RegisterUser);

app.listen(PORT, () =>
  console.log(`App is listening at http://localhost:${PORT}`)
);
