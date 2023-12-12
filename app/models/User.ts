const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required : false,
        default:null
    },
    username: {
        type: String,
        required: false,
        default:null
    },
    phone_number: {
        type: String,
        required: false,
        default:null
    },
    email: {
        type: String,
        required: false,
        default:null
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default:'user',
        required:false
    },
},{timestamps: true})

const model = mongoose.model('user', userSchema)
export default model;
export { }