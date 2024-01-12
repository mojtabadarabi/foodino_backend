import restaurantRepo from '@root/repositories/restaurantRepo';
import { default as foodRepo } from '../../../repositories/foodRepo';
import helpers from '../../helpers/helpers';

class PagesControllers {
    async mainPage(req: any, res: any) {
        const foods = await foodRepo.getAllFoods()
        //@ts-ignore
        const restaurants = await restaurantRepo.find({})

        helpers.sendResponse(res, { foods, restaurants }, 200, 'successfully')
    }
    async adminPage(req: any, res: any) {
        const foods = await foodRepo.getAllFoods()
        //@ts-ignore
        const restaurants = await restaurantRepo.find({})

        helpers.sendResponse(res, { foods, restaurants }, 200, 'successfully')

    }
}

export default new PagesControllers()
export { };

