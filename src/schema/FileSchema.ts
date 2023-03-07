import mongoose, { model, ObjectId, Schema } from "mongoose";
import FileInterface from "../interfaces/FileInterface";

/**
 * File shcema is in it's own file right now but may eventually be moved to FileObj
 */

/**
 * Mongoose File Schema
 * The data structure for how my file objects will be stored in the database
 */
const FileSchema = new Schema({
    absolutePath: String,
    fileName: String,
    hash: {
        type: String,
        unique: true
    },
    extension: String
    },
    {
        versionKey: false,
    },
    
)



const FileModel = model<FileInterface>("File", FileSchema);

export default FileModel;