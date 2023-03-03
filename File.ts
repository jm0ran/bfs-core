import { Stats } from "fs";
import path from "path";

const crypto = require('crypto');
const fs = require("fs");

class FileObj{
    private absolutePath: string;
    private hash: String;
    private fileName: String;
    private extension: String;

    /**
     * Create a file object using it's absolute path
     * @param absolutePath
     */
    public constructor(absolutePath: string){
        if(fs.existsSync(absolutePath)){
            this.absolutePath = absolutePath;
            this.hash = null;
            this.fileName = path.basename(absolutePath);
            this.extension = path.extname(absolutePath);
        }else{
            throw new Error(`Failed to read path: ${absolutePath}`);
        }
    }

    /**
     * Hashes the file using sha256
     * @returns A promise resolving to the hash
     */
    public async makeHash():Promise<String> {
        return new Promise<String>((res, rej) => {
            let hash = crypto.createHash('sha256');
            let stream = fs.createReadStream(this.absolutePath);
            stream.on('data', _buff => { hash.update(_buff, 'utf8'); });
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
     * @returns String representation of file
     */
    public toString():String{
        return `FileName: ${this.fileName} Hash: ${this.hash}`;
    }
    
    /**
     * @returns Hash of file
     */
    public getHash():String{
        return this.hash;
    }

    /**
     * @returns Absolute path of a string
     */
    public getAbsolutePath():String{
        return this.absolutePath;
    }


}

export default FileObj;