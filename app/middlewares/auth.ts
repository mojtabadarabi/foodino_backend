const helpers = require('../helpers/helpers');
const tokenServices = require('../helpers/tokenServices');

class Auth {
    checkRefreshToken(req:any,res:any,next:any){
        console.log(req.headers)
        const authToken = req.headers?.['authorization']
        console.log(authToken)
        if(!authToken) return helpers.sendResponse(res, null, 403, 'auth token required ')
        const refreshToken = tokenServices.extractToken(authToken)
        const {payload,isPass} = helpers.checkToken(refreshToken)
        if(!isPass)return helpers.sendResponse(res, null, 403, payload)
        req.user = payload
        next()
    }
    checkRestaurantAdmin(req:any,res:any,next:any){
        if(req.user.role!=='restaurant') return helpers.sendResponse(res, null, 403, 'this user dont access ')
        next()
    }
}

module.exports = new Auth()
export {}