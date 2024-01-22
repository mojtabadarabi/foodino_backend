import RoleRepo from '@root/repositories/RoleRepo';
import _ from 'lodash';
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
        await userRepo.create({ ...user, password: hashedPassword, role: 'USER' })
    }
    async login({ email, phone_number, password }) {
        const foundedUser = await userRepo.findOneByKey({ email, phone_number })
        const checked = await helpers.checkPassword(password, foundedUser.password)
        if (!checked) return { isError: true, message: 'password is incorrect', data: null }
        const foundedRole = await RoleRepo.findOne({ query: { name: foundedUser.role } })

        const token = await helpers.generateToken({
            _id: foundedUser._id,
            email: foundedUser.email,
            phone_number: foundedUser.phone_number,
            role: foundedUser.role,
            permissions: foundedRole?.permissions || []
        })

        await tokenRepo.addToken({
            user_id: foundedUser._id,
            token: token.token,
            expire_time: token.expire_time,
            role: foundedUser.role,
            permissions: foundedRole.permissions
        })
        return {
            isError: false, message: 'successful', data: {
                user: _.pick(foundedUser, [
                    'email', 'name', 'phone_number', 'permissions', 'role', 'username', '_id'
                ]), permissions: foundedRole.permissions, token
            }
        }
    }
    getUser(req, res) {
        helpers.sendResponse(res, _.pick(req.user, [
            'email', 'name', 'phone_number', 'permissions', 'role', 'username', '_id'
        ]), 200, 'successfull')
    }
    async logout(req, res) {
        await tokenRepo.removeToken({
            user_id: req.user._id
        })
        helpers.sendResponse(res, null, 200, 'successfull')
    }
    async changeUserRole(req, res) {
        const userId = req.params.id
        const newRole = req.body.role

        const updatedUser = await userRepo.findByIdAndUpdate({
            id: userId, updatedField: {
                role: newRole
            }
        })
        helpers.sendResponse(res, _.pick(updatedUser, [
            'role',
            '_id',
        ]), 200, 'seccessfull')
    }
    async getUsers(req, res) {
        const users = await userRepo.find({
            page: 1,
            query: { role: { $ne: "SUPER_ADMIN" } }
        }).select('-password -__v')
        helpers.sendResponse(res, {
            data: users,
            page: 1
        }, 200, 'seccessfull')
    }
    async searchUser(req, res) {
        const username = req.body.username
        const foundedUser = await userRepo.find({ query: { username: { $regex: username } } }).select('name username')
        helpers.sendResponse(res, foundedUser, 200, 'seccessfull')
    }

}

export default new UserController()
export { };

