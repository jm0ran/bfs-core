// External Dependencies
import * as dotenv from "dotenv";
import mongoose from "mongoose";

/**
 * Initialize a connection to the database
 * @returns a promise that resolves once a connection has been established
 */
export async function connectDatabase():Promise<typeof mongoose> {
    dotenv.config(); //use process.env.
    return mongoose.connect(process.env.DB_CONN_STRING);
}

/**
 * Terminate connection to the databse
 * @returns A promise that resolves once connection has terminated
 */
export async function disconnectDatabase():Promise<void>{
    return mongoose.connection.close();
}