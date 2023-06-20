const User = require('../app/models/User');
const BaseRepo = require('./baseRepo');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;



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
module.exports = new UserRepo();