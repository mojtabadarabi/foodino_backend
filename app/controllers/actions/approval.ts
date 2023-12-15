const router = require('express').Router();
const { foodManagement } = require('../../../config/permissions')
const { MongoClient, ObjectID } = require('mongodb');

export default async function approval(req, res) {
    const client = new MongoClient(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    const collectionName = req.body.type
    const isApproval = req.body.isApproval
    try {
        await client.connect();

        const db = client.db(process.env.DATABASE_NAME);
        
        const collections = await db.listCollections({ name: collectionName }).toArray();
        if (collections.length === 0) {
            return res.status(404).json({ message: 'collection not found', data: null})
        }

        const collection = db.collection(collectionName);

        const ids = req.body.ids.map(id => new ObjectID(id));
        const filter = { _id: { $in: ids } };

        try {
            await collection.updateMany(filter, { $set: { isApproval } })
            res.status(200).json({ message: 'item updated successfully', data: isApproval })
        } catch (error) {
            res.status(200).json({ message: 'item not found, data: null' })
        }

    } catch (err) {

    } finally {
        await client.close();
    }
}