import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import "dotenv/config"
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';




// app config
const app = express();
const port = process.env.PORT || 4000;

// Allow requests only from the frontend domain
const corsOptions = {
    origin: [
        'https://tomato-frontend-8gdu.onrender.com', 
        'https://tomato-admin-35hw.onrender.com'  // No trailing slash
    ],  
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // If you're using cookies or JWT
};


// Apply CORS middleware with the specified options
app.use(cors(corsOptions));

// middleware
app.use(express.json());

// db connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)



app.get("/", (req, res) => {
    res.send("API Working");
});

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`);
});
