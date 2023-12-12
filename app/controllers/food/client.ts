import { default as foodRepo, default as foodsRepo } from '../../../repositories/foodRepo';
import helpers from '../../helpers/helpers';

class FoodController {
    async getAll(req: any, res: any) {
        const limit = 5
        const page = 1
        const skip = page - 1 * limit
        const foods = await foodRepo.getAllFoods()

        helpers.sendResponse(res, { data: foods, count: foods.length }, 200, 'successfully')
    }
    async getSingle(req: any, res: any) {
        //@ts-ignore
        const food = await foodsRepo.findOne({query:{ _id:req.params.id }})
        if (!food) return helpers.sendResponse(res, null, 404, 'food not found')
        helpers.sendResponse(res, food, 200, 'successfully')
    }
}

export default new FoodController()
export { };

