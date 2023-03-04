import mongoose, { model, Schema } from "mongoose";

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
    absolutePath: String;
    fileName: String;
    hash: String;
    extension: String;
}

const FileModel = model<FileInterface>("File", FileSchema);

export {FileInterface, FileModel};