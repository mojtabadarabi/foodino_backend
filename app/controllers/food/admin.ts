import { extractMulterImages } from '@/helpers/multer';
import restaurantRepo from '@root/repositories/restaurantRepo';
import _ from 'lodash';
import foodRepo, { default as foodsRepo } from '../../../repositories/foodRepo';
import helpers from '../../helpers/helpers';
import RestaurantModel from '../../models/Restaurant';

class FoodController {
    async create(req: any, res: any) {
        const creator = req.user
        const images = extractMulterImages(req.files || [])
        const foundedRestaurant = await restaurantRepo.findOne({ query: { restaurantAdmins: creator._id } })
        if (!foundedRestaurant) return helpers.sendResponse(res, null, 404, 'your not any restaurant admin')
        const food = {
            ...req.body,
            images,
            creatorId: creator._id,
            restaurantId: foundedRestaurant._id
        }
        const createdFood = await foodRepo.create(_.pick(food, [
            'name',
            'description',
            'address',
            'score',
            'price',
            'images',
            'creatorId',
            'restaurantId'
        ]))
        helpers.sendResponse(res, _.pick(createdFood, ['name',
            'description',
            'address',
            'score',
            'price',
            'images',]), 201, 'food successful created')
    }
    async getSingle(req: any, res: any) {
        //@ts-ignore
        const food = await foodsRepo.findOne({ _id: req.params.id })
        if (!food) return helpers.sendResponse(res, null, 404, 'food not found')
        helpers.sendResponse(res, food, 200, 'successfully')
    }
    async getAll(req: any, res: any) {
        const creator = req.user
        const foundedRestaurant = await restaurantRepo.findOne({ query: { restaurantAdmins: creator._id } })
        if (!foundedRestaurant) return helpers.sendResponse(res, null, 404, 'your not any restaurant admin')
        const foundedFoods = await foodRepo.find({ query: { restaurantId: foundedRestaurant._id } })
            .select('name description address score price images')
        helpers.sendResponse(res, { data: foundedFoods }, 200, 'successfully')
    }
    async delete(req: any, res: any) {
        const foodId = req.params.id
        await foodRepo.findByIdAndDelete(foodId)
        helpers.sendResponse(res, 'restaurant', 200, 'successfully deleted')
    }
    async update(req: any, res: any) {
        const foodId = req.params.id
        const images = extractMulterImages(req.files || [])
        console.log(images)
        const food = {
            ...req.body,
            images,
        }
        const updatedFood = await foodRepo.findByIdAndUpdate({id:foodId,updatedField:food})
        helpers.sendResponse(res, _.pick(updatedFood, ['name',
        'description',
        'address',
        'score',
        'price',
        'images',]), 201, 'food successful updated')
    }
}

export default new FoodController();
export { };

