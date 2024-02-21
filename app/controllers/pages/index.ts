import commentRepo from '@root/repositories/commentRepo';
import restaurantRepo from '@root/repositories/restaurantRepo';
import _ from 'lodash';
import mongoose from 'mongoose';
import { default as foodRepo } from '../../../repositories/foodRepo';
import helpers from '../../helpers/helpers';
const ObjectId = mongoose.Types.ObjectId;

class PagesControllers {
    async mainPage(req: any, res: any) {
        const foods = await foodRepo.getAllFoods()
        //@ts-ignore
        const restaurants = await restaurantRepo.find({ query: { isApproval: true } })
        //@ts-ignore
        const comments = await commentRepo.find({ query: {} })

        helpers.sendResponse(res, { foods, restaurants, someComments: comments }, 200, 'successfully')
    }
    async restaurants(req: any, res: any) {
        const page = req.query.page
        const paginate = req.body.paginate
        //@ts-ignore
        const restaurants = await restaurantRepo.findWithPaginate({ query: { isApproval: true }, page, paginate })
        helpers.sendResponse(res, { restaurants }, 200, 'successfully')
    }
    async restaurant(req: any, res: any) {
        const page = req.query.page
        const paginate = req.body.paginate
        const restaurantId = req.params.id
        const restaurant = await restaurantRepo.findOne({ query: { _id: restaurantId, isApproval: true } })
        if (!restaurant) return helpers.sendResponse(res, null, 404, 'not found')
        const restaurantFoods = await foodRepo.findWithPaginate({ query: { restaurantId }, page, paginate })
        helpers.sendResponse(res, {
            restaurant: _.pick(restaurant, [
                '_id',
                'name',
                'description',
                'address',
                'adminUserName',
            ]),
            foods: restaurantFoods
        }, 200, 'successfully')
    }
    async adminPage(req: any, res: any) {
        const foods = await foodRepo.getAllFoods()
        //@ts-ignore
        const restaurants = await restaurantRepo.find({})

        helpers.sendResponse(res, { foods, restaurants }, 200, 'successfully')

    }
    async manageAdmins(req, res) {
        const restaurants = await restaurantRepo.findOne({ query: { restaurantOwner: req.user._id } }).populate({
            path: 'restaurantOwner',
            select: 'name email username phone_number'
        }).
            populate({
                path: 'restaurantAdmins',
                select: 'name email username phone_number'
            })
        helpers.sendResponse(res, restaurants, 200, 'successfully')
    }
}

export default new PagesControllers()
export { };

