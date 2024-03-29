import restaurantRepo from '@root/repositories/restaurantRepo';
import userRepo from '@root/repositories/userRepo';
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
        await userRepo.updateManyById({
            ids,
            update:{$set:{role:'RESTAURANT_ADMIN'}}
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
        await userRepo.updateManyById({
            ids,
            update:{$set:{role:'USER'}}
        })
        helpers.sendResponse(res, null, 200, 'seccessfull')
    }

}

export default new AdminsController()
export { };

