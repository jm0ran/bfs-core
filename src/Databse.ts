import * as dotenv from "dotenv";
import mongoose from "mongoose";

/**
 * Database class to control searching and connection to the server
 */
class Database{
    /**
     * Connect to the database
     * @returns A mongoose promise
     */
    public static async connect():Promise<typeof mongoose>{
        dotenv.config();
        return mongoose.connect(process.env.DB_CONN_STRING);
    }

    /**
     * Disconnect from database
     * @returns A promise resolving to void once disconnection is complete
     */
    public static async disconnect():Promise<void>{
        return mongoose.connection.close();
    }


}

export default Database;