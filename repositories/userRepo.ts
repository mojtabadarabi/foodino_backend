import User from '../app/models/User';
import BaseRepo from './baseRepo';

class UserRepo extends BaseRepo {
    constructor() {
        super(User)
    }

    async create(user) {
        return await this.model(user).save()
    }
    async findOneByKey({email,phone_number}) {
        return await this.model.findOne({
            email,
            phone_number
        })
    }

}

export { }
export default new UserRepo();