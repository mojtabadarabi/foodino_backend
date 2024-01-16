import mongoose from 'mongoose';
import RestaurantModel from '../app/models/Restaurant';
import BaseRepo from './baseRepo';
const ObjectId = mongoose.Types.ObjectId;

class RestaurantRepo extends BaseRepo {
    constructor() {
        super(RestaurantModel)
    }
    async addRestaurant(restaurant) {
        const requestedRestaurant = new this.model(restaurant)
        return requestedRestaurant.save()
    }
    async approveRestaurant(query,isApproval){
        return this.model.updateMany(query, { $set: { isApproval } })
    }
}

export { };
export default new RestaurantRepo();