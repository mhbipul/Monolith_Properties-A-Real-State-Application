import express from "express"
import { connectDB } from "./lib/db.js";


const app = express();


app.listen(3000, () => {
    console.log("Server is running on port 3000");
    connectDB();
});