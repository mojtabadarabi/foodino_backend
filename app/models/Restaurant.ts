import mongoose from 'mongoose';
import Helpers from '../helpers/helpers';

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default: 0,
  },
  address: String,
  image: {
    type: String,
    required: false
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comments'
  }],
  adminUserName: {
    type: String,
    required: true
  },
  adminPassword: {
    type: String,
    required: true
  },
  isApproval: {
    type: Boolean,
    required: false,
    default: null
  }
});
schema.methods.generateAuthToken = function () {
  const data = {
    _id: this._id,
    //@ts-ignore
    userName: this.adminUserName,
    role: 'restaurant',
  };
  let today = new Date();
  today.setHours(today.getHours() + 8);
  return {
    token: Helpers.generateToken(data),
    exp: today
  };

};
const model = mongoose.model('restaurant', schema);

export default model;
export { };

