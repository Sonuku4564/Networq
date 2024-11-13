import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from './routes/authRoute.js'
import userRoutes from './routes/userRoute.js'
import postRoutes from "./routes/postRoute.js"
import notificationRoutes from "./routes/notificationRoute.js"
import connectionRoutes from "./routes/connectionRoute.js"



import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST","PUT", "DELETE"],
}));
app.use(express.json({ limit: "5mb" }));// parse json request body
app.use(cookieParser()); // parse the cookie

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/posts", postRoutes)
app.use("/api/v1/notifications", notificationRoutes)
app.use("/api/v1/connections", connectionRoutes)



app.listen(PORT , ()=>{
    console.log(`Server running on port ${PORT}`);
    connectDB()
})