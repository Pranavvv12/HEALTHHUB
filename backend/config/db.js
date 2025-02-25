import mongoose from "mongoose";


export const connectDB= async()=>{
    await mongoose.connect('mongodb+srv://pranavk2004915:Aezakmi123..@cluster0.d2cd5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>console.log("DB CONNECTED"));
}