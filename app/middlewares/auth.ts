import helpers from '../helpers/helpers'
import tokenServices from '../helpers/tokenServices'

class Auth {
    checkRefreshToken(req: any, res: any, next: any) {
        console.log(req.headers)
        const authToken = req.headers?.['authorization']
        console.log(authToken)
        if (!authToken) return helpers.sendResponse(res, null, 403, 'auth token required ')
        const refreshToken = tokenServices.extractToken(authToken)
        const { payload, isPass } = helpers.checkToken(refreshToken)
        if (!isPass) return helpers.sendResponse(res, null, 403, payload)
        req.user = payload
        next()
    }
    checkRestaurantAdmin(req: any, res: any, next: any) {
        if (req.user.role === 'admin' || req.user.role === 'super_admin') {
            return next()
        }
        return helpers.sendResponse(res, null, 403, 'this user dont access ')
    }
    checkUserPermissions(req: any, res: any, next: any, neededPermissions) {
        const userPermissions = req.user.permissions
        let isHavePermission = true
        neededPermissions.map(permission => {
            if (!userPermissions.includes(permission)) {
                isHavePermission = false
            }
        })
        if (isHavePermission) {
            return next()
        }
        return helpers.sendResponse(res, null, 403, 'this user dont access ')
    }
}

export default new Auth()
export { }

