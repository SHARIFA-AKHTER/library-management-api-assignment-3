import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

import dotenv from 'dotenv';
let server : Server;
const PORT = process.env.PORT || 3000;

dotenv.config();
async function main() {
    try{
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5di9a.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`)
        console.log("Connected to MongoDB Using Mongoose!!")
       server = app.listen(PORT, () =>{
            console.log(`App is listening on port ${PORT} `);
        })
    }catch(error){
        console.log(error)
    }
}

main();