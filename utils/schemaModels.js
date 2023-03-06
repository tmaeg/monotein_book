const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
  title: String,
  image: String,
  price: String,
  description: String,
  email: String,
})

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
})

exports.ItemModel = mongoose.model('Item', ItemSchema)
exports.UserModel = mongoose.model('User', UserSchema)