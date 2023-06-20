const RestaurantModel = require('../app/models/Restaurant');
const BaseRepo = require('./baseRepo');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

class FoodRepo extends BaseRepo {
    constructor() {
        super(RestaurantModel)
    }
    async findAllFoodsClient() {
        return await this.find({
            // query:{
            //     "menu.name":"چلو کباب"
            // }
        }).select('-adminPassword -adminUserName -comment`')
    }
    async findRestaurant({ restaurantId, restaurantUserName }) {
        let query = {}
        if (restaurantId) {
            query['_id'] = ObjectId(restaurantId)
        }
        else {
            query['adminUserName'] = restaurantUserName
        }
        return await this.findOne({
            query
        })
    }
}

export { }
module.exports = new FoodRepo();