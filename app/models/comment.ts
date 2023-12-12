import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    text: { type: String, required: true },
    score: { type: Number, required: false, default: 0 },
}, { timestamps: true });

const model = mongoose.model('comment', commentSchema);

export default model;
export { };

