import mongoose from "mongoose";

/**
 * Interface used for typescript so I can verify the type of model I'm using
 */
interface FileInterface{
    absolutePath: string;
    fileName: string;
    extension: string;
    hash: string;
    size: number;
}

export default FileInterface;