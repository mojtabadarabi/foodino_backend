import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    score: { type: Number, required: false, default: 0 },
    price: { type: Number, required: true },
    images: { type: Array, required: false, default: [] },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments',
        default: []
    }],
}, { timestamps: true });

const model = mongoose.model('food', foodSchema);

export default model;
export { };

