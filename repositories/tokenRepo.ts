const TokenModel = require('../app/models/Token');
const BaseRepo = require('./baseRepo');

class tokenRepo extends BaseRepo {
    constructor() {
        super(TokenModel)
    }

    async addToken(token) {
        return await this.model(token).save()
    }

}

export { };
module.exports = new tokenRepo();