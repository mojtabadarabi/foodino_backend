import mongoose from 'mongoose';
import RolesModel from '../app/models/roles';
import BaseRepo from './baseRepo';

class RoleRepo extends BaseRepo {
    constructor() {
        super(RolesModel)
    }
}

export { };
export default new RoleRepo();