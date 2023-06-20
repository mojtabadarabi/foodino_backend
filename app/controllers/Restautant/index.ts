const RestaurantModel = require('../../models/Restaurant');
const _ = require('lodash');
const helpers = require('../../helpers/helpers');

class RestautantController {
    async getAll(req: any, res: any) {
        const data = await RestaurantModel.find().select('name description score address images menu adminUserName').limit(20)
        res.status(200).json({ message: 'success', data: { data: data, paginate: 10 } })
    }
    async getSingle(req: any, res: any) {
        const id = req.params.id;
        const data = await RestaurantModel.findById(id).select('-adminPassword').limit(20)
        if (!data) return helpers.sendResponse(res, null, 404, 'not found')
        return helpers.sendResponse(res, _.pick(data, [
            '_id',
            'name',
            'description',
            'address',
            'adminUserName',
        ]), 200, 'successfull')
    }
    async create(req: any, res: any) {
        const restaurant = new RestaurantModel(_.pick(req.body, [
            'name',
            'description',
            'address',
            'score',
            'adminUserName',
            'adminPassword'
        ]))
        restaurant.adminPassword = helpers.hashPassword(req.body.adminPassword)
        const savedData = await restaurant.save()
        return helpers.sendResponse(res, _.pick(savedData, [
            '_id',
            'name',
            'description',
            'address',
            'score',
            'adminUserName',
        ]), 200, 'successfull')
    }
    async update(req: any, res: any) {
        const id = req.params.id;
        const restaurant = await RestaurantModel.findByIdAndUpdate(id, {
            $set: _.pick(req.body, [
                'name',
                'description',
                'address',
                'adminUserName',
                'adminPassword'
            ])
        }, { new: true })
        return helpers.sendResponse(res, _.pick(restaurant, [
            '_id',
            'name',
            'description',
            'address',
            'adminUserName',
        ]), 200, 'successfull')
    }
    async delete(req: any, res: any) {
        const id = req.params.id;
        await RestaurantModel.findByIdAndDelete(id)
        return helpers.sendResponse(res, null, 200, 'successful')
    }
    async login(req: any, res: any) {
        const { userName, password } = req.body
        const restaurant = await RestaurantModel.findOne({ adminUserName: userName })
        if (!restaurant) return helpers.sendResponse(res, null, 404, 'restaurant with this admin not found')
        const checked = await helpers.checkPassword(password,restaurant.adminPassword)
        if (!checked) return helpers.sendResponse(res, null, 403, 'username or password is invalid')
        const token  = restaurant.generateAuthToken()
        return helpers.sendResponse(res, {
            restaurant: _.pick(restaurant, [
                '_id',
                'name',
                'description',
                'address',
                'adminUserName',
            ]),
            token
        }, 200, 'successful login')
    }
}

module.exports = new RestautantController();