import express from "express";
import { RegisterUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/registration", RegisterUser);
router.post("/login", userLogin);
// router.get("/allusers", allUsers);
// router.post("/changePassword", changePassword);
// router.put("/admin/:userId", makeUserAdmin);
// router.delete("/delete/:userId", deleteuser);

export default router;
