import mongoose from 'mongoose';
import RestaurantModel from '../app/models/Restaurant';
import BaseRepo from './baseRepo';
const ObjectId = mongoose.Types.ObjectId;

class RestaurantRepo extends BaseRepo {
    constructor() {
        super(RestaurantModel)
    }
}

export { };
export default new RestaurantRepo();