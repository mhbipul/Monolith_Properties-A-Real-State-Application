import express from "express";
import { updateUser, deleteUser, getUserListings } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/update/:id", updateUser); // Changed to POST to match your frontend
router.delete("/delete/:id", deleteUser);
router.get("/listings/:id", getUserListings);

export default router;