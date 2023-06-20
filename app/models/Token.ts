const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
    user_id:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    token:{
        type:String,
        required:true
    },
    expire_time:{
        type:Date,
        required:true
    }
},{timestamps: true})

module.exports = mongoose.model('token',TokenSchema)
