const bcrypt = require('bcrypt');
const { SALT_ROUND } = require('../../config/globalConfig');
const jwt = require('jsonwebtoken');
const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const mobileReg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im

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
    generateToken(data: any) {
        const token = jwt.sign(data, process.env.JWT_KEY, {
            expiresIn: '8h'
        })
        let today = new Date();
        today.setHours(today.getHours() + 8);
        return {
          token,
          expire_time: today
        };
    }
    // validate token
    checkToken(token: any) {
        try {
            return {
                payload: jwt.verify(token, process.env.JWT_KEY),
                isPass: true
            }
        }
        catch (e: any) {
            return {
                payload: e.message,
                isPass: false
            }
        }
    }
    // check exp token
    checkTokenExp(date: number) {
        if (Date.now() >= date * 1000) {
            return true;
        }
        return false
    }
    checkEmail(value: string) {
        return new RegExp(emailFormat).test(value)
    }
    checkPhone(value:string){
        return new RegExp(mobileReg).test(value)
    }
}
export default new Helpers()