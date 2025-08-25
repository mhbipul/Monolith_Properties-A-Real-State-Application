import express from "express";
import { updateUser, deleteUser,  } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/update/:id", updateUser); // Changed to POST to match your frontend
router.delete("/delete/:id", deleteUser);

export default router;