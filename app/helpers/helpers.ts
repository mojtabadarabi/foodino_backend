const bcrypt = require('bcrypt');
const { SALT_ROUND } = require('../../config/globalConfig');
const jwt  = require('jsonwebtoken');

class Helpers {
    sendResponse(res: any, data: any, status: any, message: any, options: any = null, stack: any = null) {
        res.status(status).json({ status, data, message, stack, ...options })
    }
    // hash password
    hashPassword(password: string) {
        const salt = bcrypt.genSaltSync(SALT_ROUND);
        return bcrypt.hashSync(password, salt);
    }
    // check password
    checkPassword(password: string, userPassword: string) {
        return bcrypt.compareSync(password, userPassword)
    }
    generateToken (data: any) {
        return jwt.sign(data, process.env.JWT_KEY, {
            expiresIn: '8h'
        })
    }
    // validate token
    checkToken(token:any){
        try{
            return {
                payload:jwt.verify(token, process.env.JWT_KEY),
                isPass:true
            }
        }
        catch (e:any) {
            return {
                payload:e.message,
                isPass: false
            }
        }
    }
    // check exp token
    checkTokenExp(date:number){
        if (Date.now() >= date * 1000) {
            return true;
        }
        return false
    }
}
module.exports = new Helpers()