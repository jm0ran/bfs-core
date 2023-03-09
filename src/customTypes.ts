import mongoose from "mongoose";

export type FileDoc = mongoose.Document<unknown, {}, FileShape> & Omit<FileShape & {
    _id: mongoose.Types.ObjectId;
}, never>;

export type FileShape = {
    absolutePath: string;
    fileName?: string;
    extension?: string;
    hash?: string;
    size?: number;
}

export type ScanInfo = {
    files: Set<string>,
    dirs?: Set<string>
}