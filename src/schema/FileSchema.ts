import mongoose, { model, ObjectId, Schema } from "mongoose";

/**
 * File shcema is in it's own file right now but may eventually be moved to FileObj
 */

/**
 * Mongoose File Schema
 * The data structure for how my file objects will be stored in the database
 */
const FileSchema = new mongoose.Schema({
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

/**
 * Interface used for typescript so I can verify the type of model I'm using
 */
interface FileInterface{
    id: ObjectId,
    absolutePath: string;
    fileName: string;
    hash: string;
    extension: string;
}

const FileModel = model<FileInterface>("File", FileSchema);

export {FileInterface, FileModel};