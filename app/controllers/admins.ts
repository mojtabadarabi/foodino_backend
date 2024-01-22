import restaurantRepo from '@root/repositories/restaurantRepo';
import helpers from '../helpers/helpers';
const { MongoClient, ObjectID } = require('mongodb');

class AdminsController {
    async addAdmins(req, res) {
        const ownerId = req.user._id
        const ids = [...new Set(req.body.ids)]

        const founded = await restaurantRepo.findOne({
            query: {
                restaurantOwner: ownerId
            }
        })

        const isFoundAdmin = ids.some(id => founded.restaurantAdmins.includes(id))
        if (isFoundAdmin) {
            return helpers.sendResponse(res, null, 200, 'some users already is admins')
        }
        await restaurantRepo.updateMany({
            query: { restaurantOwner: ownerId },
            update: { $push: { restaurantAdmins: ids } }
        })
        helpers.sendResponse(res, null, 200, 'seccessfull')
    }
    async removeAdmins(req, res) {
        const ownerId = req.user._id
        const ids = [...new Set(req.body.ids)]

        const founded = await restaurantRepo.findOne({
            query: {
                restaurantOwner: ownerId
            }
        })
        const isFoundAdmin = ids.some(id => founded.restaurantAdmins.includes(id))
        if (!isFoundAdmin) {
            return helpers.sendResponse(res, null, 200, 'some users is not admins')
        }
        await restaurantRepo.updateMany({
            query: { restaurantOwner: ownerId },
            update: { $pull: { restaurantAdmins: { $in: ids } } }
        })
        helpers.sendResponse(res, null, 200, 'seccessfull')
    }
    
}

export default new AdminsController()
export { };

