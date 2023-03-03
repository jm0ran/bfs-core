/**
 * Just a test function to test code before properly implementing it
 */

import FileObj from "./File";
import path from "path";

const fs = require("fs");

fs.readdir( "./", (err, files) => {
    if(err){
        console.log(err);
    }else{
        files.forEach(async (element) => {
            let absolutePath:string = path.resolve(element);
            let isDir = fs.existsSync(absolutePath) && fs.lstatSync(absolutePath).isDirectory();
            if(!isDir){
                let file: FileObj = new FileObj(absolutePath);
                await file.makeHash();
                console.log(file);
            }
        });
    }
} )
