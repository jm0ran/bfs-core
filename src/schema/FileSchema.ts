import mongoose, { model, ObjectId, Schema } from "mongoose";
import FileInterface from "../interfaces/FileInterface";

/**
 * File shcema is in it's own file right now but may eventually be moved to FileObj
 */

/**
 * Mongoose File Schema
 * The data structure for how my file objects will be stored in the database
 */
const FileSchema = new Schema<FileInterface>({
    absolutePath: {
        type: String,
        unique: true,
    },
    fileName: String,
    hash: {
        type: String
        // unique: true,
        // sparse: true
    },
    extension: String,
    size: Number
    },
    {
        versionKey: false,
    }
)



const FileModel = model<FileInterface>("File", FileSchema);
let document = new FileModel();
export default FileModel;