import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://Theodore:09060906@cluster0.sxh9n3s.mongodb.net/Tomato').then(()=>console.log("DB connected"));
}