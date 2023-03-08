import * as dotenv from "dotenv";
import mongoose, { Document } from "mongoose";
import FileObj from "./FileObj";
import FileModel from "./schema/FileSchema";
import FileInterface from "./interfaces/FileInterface";
import { FileDoc } from "./customTypes";

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

    /**
     * Search database for a file by it's hash
     * @returns A promise that resolves to a FileObj if found, null if not
     */
    public static async searchHash(hash:String):Promise<FileObj>{
        return new Promise(async (res, rej) => {
            if(mongoose.connection.readyState != 1){
                rej("Database is not in a connected state");
            }
            let fileModel:FileDoc = (await FileModel.find({hash: hash}))[0];
            if(fileModel == undefined){
                res(null);
            }else{
                res(FileObj.fromData(fileModel));
            }
        })
    }

    /**
     * Search database for a file by it's absolute path
     * @returns A promise that resolves to a FileObj if found, null if not
     */
    public static async searchABP(absolutePath:String):Promise<FileObj>{
        return new Promise(async (res, rej) => {
            if(mongoose.connection.readyState != 1){
                rej("Database is not in a connected state");
            }
            let fileModel:FileDoc = (await FileModel.find({absolutePath: absolutePath}))[0];
            if(fileModel == undefined){
                res(null);
            }else{
                res(FileObj.fromData(fileModel));
            }
        })
    }


}

export default Database;