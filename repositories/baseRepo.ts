const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

interface GetAllProps {
    query?: any,
    fields?: any,
    sort?: Record<any, any>,
    page?: number,
    paginate?: number,
    otherOptions?: any
}

class BaseRepo {
    model: any;
    constructor(model) {
        this.model = model;
    }

    find({
        query = {},
        fields = {},
        sort = { _id: '1' },
        page = 1,
        paginate = 10,
        otherOptions = {}
    }: GetAllProps) {
        return this.model.find(query, fields, otherOptions).skip((page - 1) * paginate)
            .limit(paginate).sort(sort)
    }

    findOne({
        query = {},
        fields = {},
        otherOptions = {}
    }: any) {
        console.log(query)
        return this.model.findOne(query,fields,otherOptions)
    }

    findByIdAndUpdate({
        id,
        updatedField
    }){
        return this.model.findByIdAndUpdate(id, {
            $set: updatedField
        }, { new: true })
    }
} 
export {}
export default BaseRepo;