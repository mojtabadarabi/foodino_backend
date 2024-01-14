const router = require('express').Router();
const { foodManagement } = require('../../../config/permissions')
const { MongoClient, ObjectID } = require('mongodb');
import helpers from '@/helpers/helpers'

export default async function approval(req, res) {
    const client = new MongoClient(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    const collectionName = req.body.type
    const isApproval = req.body.isApproval
    try {
        await client.connect();

        const db = client.db(process.env.DATABASE_NAME);
        
        const collections = await db.listCollections({ name: collectionName }).toArray();
        if (collections.length === 0) {
            helpers.sendResponse(res, null, 404, 'icollection not found')
        }

        const collection = db.collection(collectionName);

        const ids = req.body.ids.map(id => new ObjectID(id));
        const filter = { _id: { $in: ids } };

        try {
            await collection.updateMany(filter, { $set: { isApproval } })
            helpers.sendResponse(res, isApproval, 200, 'successfull')
        } catch (error) {
            helpers.sendResponse(res, null, 400, 'item not found, data: null')
        }

    } catch (err) {

    } finally {
        await client.close();
    }
}