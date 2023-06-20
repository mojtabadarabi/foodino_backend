const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const TokenModel = require('../models/Token');
const _ = require('lodash');
const helpers = require('../helpers/helpers');
const userRepo = require('../../repositories/userRepo');
const tokenRepo = require('../../repositories/tokenRepo');
const UserModel = require('../models/User');

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
        await userRepo.create({ ...user, password: hashedPassword })
    }
    async login({ email, phone_number, password }) {
        const foundedUser = await userRepo.findOneByKey({ email, phone_number })
        const checked = await helpers.checkPassword(password, foundedUser.password)
        if (!checked) return { isError: true, message: 'password is incorrect', data: null }
        const token = await helpers.generateToken({
            _id: foundedUser._id,
            email: foundedUser.email,
            phone_number: foundedUser.phone_number,
        })
        await tokenRepo.addToken({
            user_id:foundedUser._id,
            token:token.token,
            expire_time:token.exp
        })
        return {
            isError: false, message: 'successful', data: {
                user: foundedUser, token
            }
        }
    }
}

module.exports = new UserController()
export { };

