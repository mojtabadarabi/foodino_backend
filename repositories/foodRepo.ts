import FoodModel from '../app/models/Food';
import BaseRepo from './baseRepo';
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

class FoodRepo extends BaseRepo {
    constructor() {
        super(FoodModel)
    }
    async getAllFoods() {
        //@ts-ignore
        return await this.find({})
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
export default new FoodRepo();