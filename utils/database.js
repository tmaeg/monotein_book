const mongoose = require('mongoose')

const connectDB = async() => {
  try {
    await mongoose.connect('mongodb+srv://dkyukinaga:1274bunei@cluster0.azoz6pd.mongodb.net/appDataBase?retryWrites=true&w=majority')
    console.log('Success: Connect to MongoDB')
  } catch(err) {
    console.log('Failure: Connect to MongoDB')
    throw new Error()
  }
}

module.exports = connectDB