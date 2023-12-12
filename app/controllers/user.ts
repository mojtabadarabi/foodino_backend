import RoleRepo from '@root/repositories/RoleRepo';
import tokenRepo from '../../repositories/tokenRepo';
import userRepo from '../../repositories/userRepo';
import helpers from '../helpers/helpers';
import UserModel from '../models/User';

class UserController {
    async sign(req, res) {
        const { email, password, phone_number } = req.body

        const existedUser = await UserModel.findOne({ email, phone_number })
        if (!existedUser) {
            await this.create({ email, phone_number, password })
            const { isError, message, data } = await this.login({ email, password, phone_number })
            if (isError) {
                return helpers.sendResponse(res, data, 422, message)
            }
            helpers.sendResponse(res, data, 200, message)
        }
        else {
            const { isError, message, data } = await this.login({ email, password, phone_number })
            if (isError) {
                return helpers.sendResponse(res, data, 422, message)
            }
            helpers.sendResponse(res, data, 200, message)
        }
    }

    async create(user) {
        const hashedPassword = helpers.hashPassword(user.password)
        await userRepo.create({ ...user, password: hashedPassword,role:'USER' })
    }
    async login({ email, phone_number, password }) {
        const foundedUser = await userRepo.findOneByKey({ email, phone_number })
        const checked = await helpers.checkPassword(password, foundedUser.password)
        if (!checked) return { isError: true, message: 'password is incorrect', data: null }
        const foundedRole = await RoleRepo.findOne({query:{name:foundedUser.role}})

        const token = await helpers.generateToken({
            _id: foundedUser._id,
            email: foundedUser.email,
            phone_number: foundedUser.phone_number,
            role:foundedUser.role,
            permissions:foundedRole.permissions
        })

        await tokenRepo.addToken({
            user_id: foundedUser._id,
            token: token.token,
            expire_time: token.expire_time,
            role:foundedUser.role,
            permissions:foundedRole.permissions
        })
        return {
            isError: false, message: 'successful', data: {
                user: foundedUser,permissions:foundedRole.permissions, token
            }
        }
    }
}

export default new UserController()
export { };

