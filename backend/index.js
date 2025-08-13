import express from "express"
import { connectDB } from "./lib/db.js";
import userRoutes from "./routes/user.route.js"; // Import user routes
import dotenv from "dotenv";
dotenv.config(); 


const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json()); // Middleware to parse JSON bodies 


// Import routes
app.use("/api/users",userRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    // Connect to the database when the server starts   
    connectDB();
});