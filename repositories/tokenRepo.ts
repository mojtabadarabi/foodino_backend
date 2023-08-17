const TokenModel = require('../app/models/Token');
const BaseRepo = require('./baseRepo');

class tokenRepo extends BaseRepo {
    constructor() {
        super(TokenModel)
    }

    async addToken({ user_id, token,expire_time }) {
        const foundedUserId = await this.model.findOne({user_id})
        if(foundedUserId){
            return await this.model.update({user_id},{token,expire_time})
        }
        return await this.model({ user_id, token,expire_time }).save()
    }

}

export { };
module.exports = new tokenRepo();