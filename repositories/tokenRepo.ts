import TokenModel from '../app/models/Token';
import BaseRepo from './baseRepo';

class tokenRepo extends BaseRepo {
    constructor() {
        super(TokenModel)
    }

    async addToken({ user_id, token, expire_time, role, permissions }) {
        const foundedUserId = await this.model.findOne({ user_id })
        if (foundedUserId) {
            return await this.model.update({ user_id }, { token, expire_time, role, permissions })
        }
        return await this.model({ user_id, token, expire_time, role, permissions }).save()
    }

    async removeToken({ user_id }) {
        await this.model.findOneAndDelete({ user_id })
    }

    async getToken({ token }) {
        return await this.model.findOne({ token })
    }
}

export { };
export default new tokenRepo();