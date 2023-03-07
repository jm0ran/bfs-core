import ScanInfo from "./interfaces/ScanInfo";
import fs from "fs";
import path from "path";

/**
 * Files to be excluded from the scan
 */
const SYSTEM_FILES = new Set<string>(["desktop.ini", ".DS_Store", ".localized", "$RECYCLE.BIN"]);

/**
 * The scanner class will be responsible for collecting paths to construct file objects
 */
class Scanner{
    /**
     * Store the root path that the scanner scans from
     */
    private root:string;

    /**
     * Constructor for scanner
     * @param root Takes in root for the scanner
     */
    public constructor(root:string){
        if(fs.existsSync(root)){
            this.root = root;
        }else{
            throw new Error(`Failed to read path: ${root}`);
        }
        
    }
    
    /**
     * Shallow scan scans only the files in the specified directory searching no deeper
     * Will be the helper function for my deep scan function
     * @returns ScanInfo object with data from the scan including file and directory paths
     */
    public shallowScan(topPath: string):Promise<ScanInfo>{
        return new Promise(async (res, rej) => {
            let result: ScanInfo = {
                files: new Set<string>,
                dirs: new Set<string>
            }
            let fsResult:string[] = fs.readdirSync(topPath);
            fsResult.forEach(file => {
                if(!SYSTEM_FILES.has(file)){
                    let absolutePath = path.join(topPath, file);
                    let stats = fs.statSync(absolutePath);
                    if(stats.isDirectory()){
                        result.dirs.add(absolutePath);
                    }else{
                        result.files.add(absolutePath)
                    }
                }
            });
            res(result);
        })
    }



}

export default Scanner;