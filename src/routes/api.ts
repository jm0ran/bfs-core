import express from "express"
import Database from "../Databse";
import FileObj from "../FileObj";
import Scanner from "../Scanner";

let APIRouter = express.Router();

/**
 * Post request to get file info with a given absolute path 
 */
APIRouter.post('/getFileByABP', async (req, res) => {
    let data = req.body;
    if(!data.body || !data.body.absolutePath || (typeof data.body.absolutePath) !== 'string'){
        res.status(400);
        res.json({message: "Bad request"})
    }else{
        let absolutePath:string = data.body.absolutePath;
        let fileObj = await Database.searchABP(absolutePath);
        if(fileObj === null){
            res.status(404);
            res.json({message: "Object not found"});
        }else{
            res.status(200);
            res.send((fileObj.toJSON()));
        }
    }
 })

 /**
 * Post request to process a file with a given absolute path 
 */
 APIRouter.post("/processFileByABP", async (req, res) =>{
    let data = req.body;
    if(!data.body || !data.body.absolutePath || (typeof data.body.absolutePath) !== 'string'){
        res.status(400);
        res.json({message: "Bad request"})
    }else{
        let absolutePath:string = data.body.absolutePath;
        let fileObj = await Database.searchABP(absolutePath);
        let processed = await fileObj.processFile();
        let saved = await fileObj.saveDB();
        if(!processed || !processed){
            res.status(500);
            res.json({message: "Failed to process the file"});
        }else{
            res.status(200);
            res.send((fileObj.toJSON()));
        }
    }
 })

 /**
  * Get all the files in the database
  */
 APIRouter.post("/getFiles", async (req, res) => {
    let data:FileObj[] = await Database.getFiles();
    res.status(200);
    res.send(JSON.stringify(data));
 })

 /**
  * Run a deep scan on the database
  */
 APIRouter.post("/deepScan", (async (req, res) => {
    let added = await Scanner.deepScan();
    res.status(200);
    res.send({newFiles: added});
 }))

export default APIRouter;