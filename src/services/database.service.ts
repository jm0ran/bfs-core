// External Dependencies
import * as dotenv from "dotenv";
import mongoose from "mongoose";

// Initialize Connection
export async function connectToDatabase():Promise<typeof mongoose> {
    dotenv.config(); //use process.env.
    return mongoose.connect(process.env.DB_CONN_STRING);
}