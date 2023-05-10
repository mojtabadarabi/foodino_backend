
const fs = require('fs');

class FileHandler {
    static async removeFileByPath(path: string) {
        const basePath = global.__basedir + '/'+ path
        try {
            await fs.unlinkSync(basePath)
            return true
        }
        catch (e) {
            return false
        }
    }
}
module.exports = FileHandler;