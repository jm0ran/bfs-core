import mongoose from "mongoose";
import FileInterface from "./interfaces/FileInterface";

export type FileDoc = mongoose.Document<unknown, {}, FileInterface> & Omit<FileInterface & {
    _id: mongoose.Types.ObjectId;
}, never>;