const helpers = require('../../helpers/helpers');
const foodsRepo = require('../../../repositories/foodRepo');

class FoodController {
    async getAll(req: any, res: any) {
        const restaurant = await foodsRepo.findAllFoodsClient()
        helpers.sendResponse(res, restaurant, 200, 'successfully')
    }
    async getSingle(req: any, res: any) {
        const restaurant = await foodsRepo.findRestaurant({ restaurantId: req.params.id })
        if (!restaurant) return helpers.sendResponse(res, null, 404, 'restaurant not found')
        const foundedFood = restaurant.menu.find((food) => food._id == req.body.foodId)
        if (!foundedFood) return helpers.sendResponse(res, null, 404, 'food not found')
        helpers.sendResponse(res, foundedFood, 200, 'successfully')
    }
}

export default new FoodController()
export { };

