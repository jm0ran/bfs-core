/**
 * Just a test function to test code before properly implementing it
 */

import FileObj from "./FileObj";
import path from "path";
import Database from "./Databse";
import Scanner from "./Scanner";
import * as dotenv from "dotenv";
import ScanInfo from "./interfaces/ScanInfo";


const fs = require("fs");

async function main(){
    await Database.connect();
    // let obj:FileObj = await Database.searchHash("da067b00098439ef20678d2bd257cadc505367a929e1e7154f00439ba5fac479");
    let obj: FileObj = await Database.searchABP("/Users/jmoran/Projects/bfs-core/package.json");
    console.log(obj);
    await obj.makeHash();
    console.log(obj);
    console.log(await obj.saveDB())
    // console.log(await obj.existsDB());

    // let fileObj: FileObj = new FileObj(path.resolve("./tsconfig.json"));
    // await fileObj.makeHash();
    // console.log("Does File Exist:" + await fileObj.existsDB())
    // console.log("Adding File: " + await fileObj.saveDB())
    // console.log("Does File Exist:" + await fileObj.existsDB())
    
    // await fileObj.makeHash();
    // await fileObj.saveDB();


    await Database.disconnect();

    // dotenv.config();
    // let scanner:Scanner = new Scanner(process.env.ROOT);
    // // console.log(await scanner.shallowScan(process.env.ROOT));
    // let result:ScanInfo = await scanner.deepScan();
    // console.log(result);
    // console.log(result.files.size);
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
