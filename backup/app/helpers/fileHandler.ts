
const fs = require('fs');

class FileHandler {
    static async removeFileByPath(path: string) {
        const basePath = __dirname + path
        try {
            fs.unlinkSync(basePath)
            return true
        }
        catch (e) {
            return false
        }
    }
}
export default FileHandler;