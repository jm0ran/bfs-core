import crypto from "crypto";
import path from "path";
import fs from "fs";
import FileInterface from "./interfaces/FileInterface";
import FileModel from "./schema/FileSchema";
import { FileDoc } from "./customTypes";
import Database from "./Databse";



/**
 * The file object class represents a singular file in the bfs system
 */
class FileObj{
    /**
     * Holds document to be used to save once if the file already exists in the database
     */
    private doc:FileDoc;

    /**
     * Constructor for FileObj
     * Need to check if the object already exists in the database
     * @param absolutePath Absolute path of the file to be constructed,
     */
    public constructor(absolutePath:string = null){
        if(absolutePath == null){
        }
        else if(fs.existsSync(absolutePath)){
            this.doc = new FileModel<FileInterface>({
                absolutePath: path.resolve(absolutePath),
                fileName: path.basename(absolutePath),
                extension: path.extname(absolutePath),
                hash: undefined,
                size: undefined
            })    
        }else{
            throw new Error("File does not exist");
        }
    }


    /**
     * Construct a new FileObject from a data object in the shape of FileInterface
     * @param data : Object in shape of file interface
     * @returns New file object
     */
    public static fromData(data:FileDoc){
        let file:FileObj = new FileObj();
        file.doc = data;
        return file;
    }

    /**
     * Hashes the file using sha256
     * @returns A promise resolving to the hash
     */
    public async makeHash():Promise<string> {
        return new Promise<string>((res, rej) => {
            let hash = crypto.createHash('sha256');
            let stream = fs.createReadStream(this.doc.absolutePath);
            stream.on('data', (_buff:string) => { hash.update(_buff, 'utf8'); });
            stream.on('end', () => { 
                this.doc.hash = hash.digest('hex');
                res(this.doc.hash);
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
            if(await FileModel.exists({absolutePath: this.doc.absolutePath})){
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
            await this.doc.save();
            res(true);
        })
    }

    /**
     * @returns String representation of the object
     */
    public toString():string{
        return `File: ${this.doc.fileName} \n\t Path: ${this.doc.absolutePath} \n\t Hash:${this.doc.hash}`;
    }
}

export default FileObj;