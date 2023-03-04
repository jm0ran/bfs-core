/**
 * Just a test function to test code before properly implementing it
 */

import FileObj from "./FileObj";
import path from "path";
import Database from "./Databse";


const fs = require("fs");

async function main(){
    await Database.connect();
    let fileObj: FileObj = await FileObj.init(path.resolve("./tsconfig.json"));
    console.log("Does File Exist:" + await fileObj.existsDB())
    console.log("Adding File: " + await fileObj.saveDB())
    console.log("Does File Exist:" + await fileObj.existsDB())
    await Database.disconnect();
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
