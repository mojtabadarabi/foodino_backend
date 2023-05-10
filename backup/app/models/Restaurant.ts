const mongoose = require('mongoose');
const Helpers = require('../helpers/helpers');

const schemeComment = new mongoose.Schema({
  user: { type: String, required: true },
  text: { type: String, required: true },
  score: { type: Number, required: false, default: 0 },
});
const schemeFood = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  score: { type: Number, required: false, default: 0 },
  price: { type: Number, required: true },
  images: { type: Array, required: false, default: [] },
  comments: [schemeComment],
});

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
  comment: [schemeComment],
  menu: [schemeFood],
  adminUserName: {
    type: String,
    required: true
  },
  adminPassword: {
    type: String,
    required: true
  },
});
schema.methods.generateAuthToken = function () {
  const data = {
    _id: this._id,
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

module.exports = model;
export { }
