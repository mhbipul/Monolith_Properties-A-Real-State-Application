import express from "express"
import { connectDB } from "./lib/db.js";
import userRoutes from "./routes/user.route.js"; // Import user routes
import authRoutes from "./routes/auth.route.js"; // Import auth routes
import dotenv from "dotenv";
dotenv.config(); 


const app = express();

app.use(express.json()); // Middleware to parse JSON bodies
const PORT = process.env.PORT || 3000;
app.use(express.json()); // Middleware to parse JSON bodies 



// Import routes
app.use("/api/users",userRoutes)
app.use("/api/auth", authRoutes); 



// error handler must come last
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message  
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    // Connect to the database when the server starts   
    connectDB();
});