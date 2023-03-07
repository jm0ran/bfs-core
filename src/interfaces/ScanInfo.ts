/**
 * ScanInfo defines the shape of objects returned from the scanner class
 * This will be exapanded on in the future, but for now it will just be a list of files scanned
 */
interface ScanInfo{
    files: Set<string>,
    dirs: Set<string>
}

export default ScanInfo;