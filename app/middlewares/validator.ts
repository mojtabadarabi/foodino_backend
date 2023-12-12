import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { deleteFilesOnError } from "../helpers/multer";
import helpers from '../helpers/helpers';

export default function (req: any, res: Response, next: NextFunction) {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    // delete uploaded files in multer 
    if (req.files) {
        deleteFilesOnError(req.files)
    }
    return helpers.sendResponse(res, null, 422, errors.array().map((error: any) => error.msg))

}