import commentRepo from '@root/repositories/commentRepo';
import restaurantRepo from '@root/repositories/restaurantRepo';
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
        //@ts-ignore
        const restaurants = await restaurantRepo.find({ query: { isApproval: true } })
        helpers.sendResponse(res, { restaurants }, 200, 'successfully')
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

