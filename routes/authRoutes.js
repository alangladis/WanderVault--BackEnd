import express from "express";
import { login, signup } from "../controllers/authController.js";
import { createUser, getAllUsers, getTotalUsers} from "../controllers/userController.js";

const router = express.Router();

// POST /login to authenticate user
router.post("/login", login);
router.post("/signup", signup);
router.post("/createUser", createUser);
router.get("/getTotalUsers", getTotalUsers);
router.get("/getAllUsers", getAllUsers);
// Route to add feedback




export default router;
