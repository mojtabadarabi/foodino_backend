import mongoose from 'mongoose';

const rolesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    permissions: [{
        type: String,
        required: false,
        default: []
    }],
}, { timestamps: true });

const model = mongoose.model('roles', rolesSchema);

export default model;
export { };

