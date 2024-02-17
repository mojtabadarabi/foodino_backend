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
        paginate = 20,
        otherOptions = {}
    }: GetAllProps) {
        return this.model.find(query, fields, otherOptions).skip((page - 1) * paginate)
            .limit(paginate).sort(sort)
    }

    async findWithPaginate({
        query = {},
        fields = {},
        sort = { _id: '1' },
        page = 1,
        paginate = 20,
        otherOptions = {}
    }: GetAllProps) {
        const data = await this.model.find(query, fields, otherOptions).skip((page - 1) * paginate)
            .limit(paginate).sort(sort)
        return {
            data,
            total: await this.model.countDocuments(query),
            totalPage: Math.ceil((await this.model.countDocuments(query)) / paginate),
            currentPage: page,
            currentPaginate: paginate
        }
    }

    findOne({
        query = {},
        fields = {},
        otherOptions = {}
    }: any) {
        console.log(query)
        return this.model.findOne(query, fields, otherOptions)
    }

    findByIdAndUpdate({
        id,
        updatedField
    }) {
        return this.model.findByIdAndUpdate(id, {
            $set: updatedField
        }, { new: true })
    }

    updateMany({
        query,
        update
    }) {
        return this.model.updateMany(query, update, { new: true })
    }


    updateManyById({
        ids,
        update
    }) {
        return this.model.update({ _id: { $in: ids } }, update, { multi: true })
    }

    async findByIdAndDelete(_id) {
        return this.model.findOneAndDelete({ _id })
    }
}
export { };
export default BaseRepo;