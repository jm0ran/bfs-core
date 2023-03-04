/**
 * Interface used for typescript so I can verify the type of model I'm using
 */
interface FileInterface{
    absolutePath: string;
    fileName: string;
    hash: string;
    extension: string;
    size: number;
}

export default FileInterface;