import { extractMulterImages } from "../../helpers/multer";
const RestaurantModel = require('../../models/Restaurant');
const _ = require('lodash');
const helpers = require('../../helpers/helpers');
const foodsRepo = require('../../../repositories/foodRepo');

class FoodController {
    async create(req: any, res: any) {
        const creator = req.user
        const images = extractMulterImages(req.files || [])
        const restaurant = await RestaurantModel.findOne({ adminUserName: creator.userName })
        if (!restaurant) return helpers.sendResponse(res, null, 404, 'not found')
        restaurant.menu.push({ ..._.pick(req.body, ['name', 'description', 'price']), images })
        await restaurant.save()
        helpers.sendResponse(res, restaurant, 201, 'food successful created')
    }
    async getSingle(req: any, res: any) {
        const restaurant = await foodsRepo.findRestaurant({ restaurantUserName: req.user.userName })
        if (!restaurant) return helpers.sendResponse(res, null, 404, 'restaurant not found')
        restaurant.menu.map((food) => console.log(typeof food._id))
        const foundedFood = restaurant.menu.find((food) => food._id == req.params.id)
        if (!foundedFood) return helpers.sendResponse(res, null, 404, 'food not found')
        helpers.sendResponse(res, foundedFood, 200, 'successfully')
    }
    async getAll(req: any, res: any) {
        const creator = req.user
        const restaurant = await RestaurantModel.findOne({ adminUserName: creator.userName })
        if (!restaurant) return helpers.sendResponse(res, null, 404, 'not found')
        helpers.sendResponse(res, { data: restaurant.menu, paginate: 10 }, 200, 'successfully')
    }
    async delete(req: any, res: any) {
        const creator = req.user
        const foodId = req.params.id
        const restaurant = await RestaurantModel.findOne({ adminUserName: creator.userName })
        if (!restaurant) return helpers.sendResponse(res, null, 404, 'not found')
        const foundedFood = restaurant.menu.id(foodId)
        if (!foundedFood) return helpers.sendResponse(res, null, 404, 'not found')
        foundedFood.remove()
        await restaurant.save()
        helpers.sendResponse(res, restaurant, 200, 'successfully deleted')
    }
    async update(req: any, res: any) {
        const creator = req.user
        const foodId = req.params.id
        const restaurant = await RestaurantModel.findOne({ adminUserName: creator.userName, menu: { $elemMatch: { _id: foodId } } })
        if (!restaurant) return helpers.sendResponse(res, null, 404, 'restaurant not found')
        let foundedFood = restaurant.menu.id(foodId)
        if (!foundedFood) return helpers.sendResponse(res, null, 404, 'food not found')
        const restaurants = await RestaurantModel.findOneAndUpdate(
            {
                '_id': creator._id,
                'menu._id': foodId
            },
            {
                $set: {
                    "menu.$.name": req.body.name || foundedFood.name,
                    "menu.$.description": req.body.description || foundedFood.description,
                    "menu.$.price": req.body.price || foundedFood.price,
                    "menu.$.score": req.body.score || foundedFood.score,
                    "menu.$.pic": req.body.pic || foundedFood.pic,
                }
            },
            { new: true }
        )
        helpers.sendResponse(res, { restaurant: restaurants }, 201, 'successfully updated')
    }
}

module.exports = new FoodController()
export { };
