/**
 * Just a test function to test code before properly implementing it
 */

import FileObj from "./FileObj";
import path from "path";
import { connectToDatabase } from "./services/database.service";
import { Model, Schema } from "mongoose";
import { FileModel, FileInterface } from "./schema/FileSchema";


const fs = require("fs");

async function main(){
    await connectToDatabase();
    let fileObj: FileObj = await FileObj.init(path.resolve("./tsconfig.json"));
    console.log(fileObj.toString());
    // console.log("Trying");
    // let test = await fileObj.makeFile()
    // console.log("Made file");
    // await test.save();
}

main();


// fs.readdir( "./", (err, files) => {
//     if(err){
//         console.log(err);
//     }else{
//         files.forEach(async (element) => {
//             let absolutePath:string = path.resolve(element);
//             let isDir = fs.existsSync(absolutePath) && fs.lstatSync(absolutePath).isDirectory();
//             if(!isDir){
//                 let file: FileObj = new FileObj(absolutePath);
//                 await file.makeHash();
//                 console.log(file);
//             }
//         });
//     }
// } )
