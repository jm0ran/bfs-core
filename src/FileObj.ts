import crypto from "crypto";
import path from "path";
import fs from "fs";
import FileModel from "./schema/FileSchema";
import { FileDoc } from "./customTypes";



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
    public constructor(data: FileDoc){
        this.doc = data;
    }


    /**
     * Hashes the file using sha256
     * @returns A promise resolving to the hash
     */
    private async makeHash():Promise<string> {
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
     * Process a file and filling it's fields
     * @returns A promise that resolves to void once the process has been completed
     */
    public processFile():Promise<void> {
        return new Promise(async (res, rej) => {
            if(fs.existsSync(this.doc.absolutePath)){
                let stats = fs.statSync(this.doc.absolutePath);
                this.doc.extension = path.extname(this.doc.absolutePath);
                this.doc.fileName = path.basename(this.doc.absolutePath);
                this.doc.size = stats.size;
                await this.makeHash();
                res();
            }else{
                rej("The file could not be found");
            }
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