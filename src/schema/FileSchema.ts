import mongoose, { model, Schema } from "mongoose";

const FileSchema = new mongoose.Schema({
    absolutePath: String,
    hash: {
        type: String,
        unique: true
    }
    },
    {versionKey: false}
)

interface FileInterface{
    absolutePath: String;
    hash: String;
}

const FileModel = model<FileInterface>("File", FileSchema);

export {FileInterface, FileModel};