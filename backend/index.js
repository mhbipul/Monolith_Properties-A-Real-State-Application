import express from "express"
import { connectDB } from "./lib/db.js";
import userRoutes from "./routes/user.route.js"; // Import user routes
import authRoutes from "./routes/auth.route.js"; // Import auth routes
import uploadRoutes from "./routes/upload.route.js"; // Import upload routes
import listingRoutes from "./routes/listing.route.js"; // Import listing routes
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config(); 


const app = express();

app.use(express.json()); // Middleware to parse JSON bodies
const PORT = process.env.PORT || 3000;
app.use(express.json()); // Middleware to parse JSON bodies 
app.use(cookieParser()); // Middleware to parse cookies
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));



// Import routes
app.use("/api/users",userRoutes)
app.use("/api/auth", authRoutes); 
app.use("/api/upload", uploadRoutes);
app.use("/api/listing",listingRoutes);



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