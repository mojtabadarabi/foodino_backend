import restaurantRepo from '@root/repositories/restaurantRepo';
import userRepo from '@root/repositories/userRepo';
import _ from 'lodash';
import helpers from '../../helpers/helpers';
import RestaurantModel from '../../models/Restaurant';
const { MongoClient, ObjectID } = require('mongodb');

class RestautantController {
    async getAll(req: any, res: any) {
        const isAdmin = req.user?.permissions && req.user?.permissions?.length !== 0 && req?.user?.permissions.includes('RESTAURANT_MANAGEMENT')
        let query: any = {}
        if (!isAdmin) {
            query.isApproval = true
        }
        //@ts-ignore
        const data = await restaurantRepo.find({ query })
        res.status(200).json({ message: 'success', data: { data: data, paginate: 20 } })
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
        const requestedRestaurant = _.pick(req.body, [
            'name',
            'description',
            'address',
            'score',
        ])
        const restaurant = await restaurantRepo.addRestaurant({
            ...requestedRestaurant,
            restaurantOwner: req.user._id
        })
        return helpers.sendResponse(res, _.pick(restaurant, [
            'name',
            'description',
            'address',
        ]), 200, 'رستوران با موفقیت ثبت شد لطفا منتظر تایید بمانید')
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
        const checked = await helpers.checkPassword(password, restaurant.adminPassword)
        if (!checked) return helpers.sendResponse(res, null, 403, 'username or password is invalid')
        const token = restaurant.generateAuthToken()
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
    async approval(req, res) {
        const ids = req.body.ids.map(id => new ObjectID(id));

        ids.map(async (id) => {
            const restaurant = await restaurantRepo.findOne({
                query: { _id: id }
            })
            if (restaurant && restaurant.restaurantOwner) {
                await userRepo.findByIdAndUpdate({ id: restaurant.restaurantOwner, updatedField: { role: 'RESTAURANT_OWNER' } })
            }
        })

        const filter = { _id: { $in: ids } };
        await restaurantRepo.approveRestaurant(filter, req.body.isApproval)
        return helpers.sendResponse(res, null, 200, 'وضعیت رستوران تغییر کرد')
    }
}

export default new RestautantController();