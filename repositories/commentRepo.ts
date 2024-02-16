import CommentModel from '../app/models/comment';
import BaseRepo from './baseRepo';

class FoodRepo extends BaseRepo {
    constructor() {
        super(CommentModel)
    }

}

export { };
export default new FoodRepo();