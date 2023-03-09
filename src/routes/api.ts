import express from "express"

let APIRouter = express.Router();

APIRouter.get('/*', (req, res) => {
    res.status(404);
    res.json({message: "Hello World "});
 })

export default APIRouter;