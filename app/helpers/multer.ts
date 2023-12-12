const multer = require('multer');
const path = require('path');
const fileHandler = require('../helpers/fileHandler');
const helpers = require('../helpers/helpers');

const storage = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
        cb(null, './public/images/foods')
    },
    filename: function (req: any, file: any, cb: any) {
        // generate the public name, removing problematic characters
        const originalName = encodeURIComponent(path.parse(file.originalname).name).replace(/[^a-zA-Z0-9]/g, '')
        const timestamp = Date.now()
        const extension = path.extname(file.originalname).toLowerCase()
        cb(null, originalName + '_' + timestamp + extension)
    }
})

export const uploadMulter = multer({
    storage: storage,
    limits: { fileSize: 1 * 1024 * 1024 }, // 1 Mb
    fileFilter: (req: any, file: any, callback: any) => {
        const acceptableExtensions = ['png', 'jpg', 'jpeg', 'jpg']
        if (!(acceptableExtensions.some(extension =>
            path.extname(file.originalname).toLowerCase() === `.${extension}`)
        )) {
            return callback(new Error(`Extension not allowed, accepted extensions are ${acceptableExtensions.join(',')}`))
        }
        callback(null, true)
    }
})

export const extractMulterImages = (files: any[]): ImageType[] => {
    let images: any = []
    files.map((file: any) => {
        images.push({
            name: file.filename,
            src: process.env.DOMAIN + '/' + file.path.replace(/\\/g, "/"),
            size: file.size,
            type: file.mimetype,
        })
    })
    return images;
}

export interface ImageType {
    name: string,
    src: string,
    size: string,
    type: string,
}

export const deleteFilesOnError = (files: any[]): void => {
    files.map((file: any) => {
        fileHandler.removeFileByPath(file.path)
    })
}
export const seedUploads = (req: any, res: any) => {
    const images = extractMulterImages(req.files || [])
    helpers.sendResponse(res, images, 201, 'upload successful')
}
export { };
