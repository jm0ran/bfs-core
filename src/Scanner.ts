import ScanInfo from "./interfaces/ScanInfo";
import fs from "fs";
import path from "path";

/**
 * Files to be excluded from the scan
 */
const SYSTEM_FILES = new Set<string>(["desktop.ini", ".DS_Store", ".localized"]);

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
    
    public shallowScan():Promise<ScanInfo>{
        return new Promise(async (res, rej) => {
            let result: ScanInfo = {
                files: new Set<string>
            }
            let fsResult:string[] = fs.readdirSync(this.root);
            fsResult.forEach(file => {
                let stats = fs.statSync(path.join(this.root, file));
                if(!stats.isDirectory() && !SYSTEM_FILES.has(file)){
                    result.files.add(path.join(this.root, file))
                }
            });
            res(result);
        })
    }

}

export default Scanner;