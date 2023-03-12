import * as dotenv from "dotenv";
import mongoose, { Document } from "mongoose";
import FileObj from "./FileObj";
import FileModel from "./schema/FileSchema";
import { FileDoc, FileShape } from "./customTypes";

/**
 * Database class to control searching and connection to the server
 */
class Database{
    /**
     * Connect to the database
     * @returns A mongoose promise
     */
    public static async connect():Promise<typeof mongoose>{
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
                res(new FileObj(fileModel));
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
                res(new FileObj(fileModel));
            }
        })
    }

    /**
     * Checks is entry exists in the Database based on it's absolute path
     * @param absolutePath Absolute path of the file
     * @returns return boolean indicating existance
     */
    public static async existsABP(absolutePath: string):Promise<boolean>{
        return new Promise(async (res, rej) => {
            if(mongoose.connection.readyState != 1){
                rej("Database is not in a connected state");
            }
            else res(await (await FileModel.find({absolutePath: absolutePath})).length > 0);
        })
    }
    
    /**
     * @returns A promise that resolve to an array of all the fileobjects in the database
     */
    public static async getFiles():Promise<FileObj[]>{
        return new Promise(async (res, rej) => {
            if(mongoose.connection.readyState != 1){
                rej("Database is not in a connected state");
            }
            const result:FileObj[] = new Array();
            (await FileModel.find({})).map(doc => {
                result.push(new FileObj(doc));
            })
            res(result);
        })
    }

    /**
     * Creates a new object in the databse
     * @param absolutePath Absolute path of the file in question
     */
    public static async createNew(absolutePath:string):Promise<void>{
        return new Promise(async (res, rej) => {
            const doc:FileDoc = new FileModel<FileShape>({
                absolutePath: absolutePath
            })
            await doc.save();   
            res();   
        })
    }


}

export default Database;