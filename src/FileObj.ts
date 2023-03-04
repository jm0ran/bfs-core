import crypto from "crypto";
import path from "path";
import fs from "fs";
import { FileInterface, FileModel } from "./schema/FileSchema";
import { Document, Model } from "mongoose";

/**
 * The file object class represents a singular file in the bfs system
 */
class FileObj{
    /**
     * Absolute Path of the file
     */
    private absolutePath:string;
    /**
     * File name with no path
     */
    private fileName: string;
    /**
     * Hash of file
     */
    private hash:string;
    /**
     * Extension of file
     */
    private extension:string;
    /**
     * Model for the file
     */
    private model:Model<FileInterface>;

    /**
     * Constructor for FileObj, should not be called by user, use int instead
     */
    private constructor(){
        this.absolutePath = null;
        this.fileName = null;
        this.hash = null;
        this.extension = null;
        this.model = FileModel;
    }

    /**
     * Forward facing FileObj creation method, 
     */
    public static init(absolutePath:string):Promise<FileObj>{
        return new Promise(async (res, rej) => {
            const newFile: FileObj = new FileObj();
            if(fs.existsSync(absolutePath)){
                newFile.absolutePath = path.resolve(absolutePath);
                newFile.fileName = path.basename(absolutePath);
                newFile.extension = path.extname(absolutePath);
                await newFile.makeHash();
                res(newFile);
            }else{
                rej(new Error(`Failed to read path: ${absolutePath}`));
            }
        })
    }

    /**
     * Hashes the file using sha256
     * @returns A promise resolving to the hash
     */
    private async makeHash():Promise<string> {
        return new Promise<string>((res, rej) => {
            let hash = crypto.createHash('sha256');
            let stream = fs.createReadStream(this.absolutePath);
            stream.on('data', (_buff:string) => { hash.update(_buff, 'utf8'); });
            stream.on('end', () => { 
                this.hash = hash.digest('hex');
                res(this.hash);
            });
            stream.on("error", (err:string) => {
                rej(err);
            })
        })
    }
    
    /**
     * Checks if the file exists in the database
     * @returns a promise resolving to a boolean representing if the file exists in the database
     */
    public async existsDB():Promise<Boolean>{
        return new Promise(async(res, rej) => {
            if(await FileModel.exists({hash: this.hash})){
                res(true)
            }else{
                res(false)
            }
        })
    }

    /**
     * Saves the current fileObject into the database
     * @returns A promise resolving depending on whether the save was successful
     */
    public async saveDB():Promise<boolean>{
        return new Promise(async (res, rej) => {
            if(!(await this.existsDB())){
                let fileDoc:Document = new FileModel({
                    absolutePath: this.absolutePath,
                    fileName: this.fileName,
                    hash: this.hash,
                    extension: this.extension
                })
                await fileDoc.save();
                res(true);
            }else{
                res(false);
            }
        })
    }

    /**
     * @returns String representation of the object
     */
    public toString():string{
        return `File: ${this.fileName} \n\t Path: ${this.absolutePath} \n\t Hash:${this.hash}`;
    }
}

export default FileObj;