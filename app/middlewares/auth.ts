import TokenRepo from '../../repositories/tokenRepo'
import helpers from '../helpers/helpers'
import tokenServices from '../helpers/tokenServices'

const { restaurantManagement } = require('@root/config/permissions')

class Auth {
    async checkRefreshToken(req: any, res: any, next: any) {
        const authToken = req.headers?.['authorization']
        if (!authToken) return helpers.sendResponse(res, null, 403, 'auth token required ')
        const refreshToken = tokenServices.extractToken(authToken)
        const foundedToken = await TokenRepo.getToken({ token: refreshToken })
        if (!foundedToken) return helpers.sendResponse(res, null, 403, 'auth token not exist or expired ')
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
    getPermissionbyApprovalType(type) {
        switch (type) {
            case 'restaurants':
                return restaurantManagement
            default:
                return
        }
    }
}

export default new Auth()
export { }

