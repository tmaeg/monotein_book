const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
const jwt = require('jsonwebtoken')
const connectDB = require('./utils/database')
const {ItemModel, UserModel} = require('./utils/schemaModels')
const auth = require('./utils/auth')

// ITEM functions
// Create Item
app.post('/item/create', auth, async(req, res) => {
  try {
    await connectDB()
    await ItemModel.create(req.body)
    return res.status(200).json({
      message: 'Sccess: Create Item',
    })
  } catch(err) {
    console.log(err)
    return res.status(400).json({
      message: 'Failure: Create Item',
    })
  }
})
// Read All Items
app.get('/', async(req, res) => {
  try {
    await connectDB()
    const allItems = await ItemModel.find()
    res.status(200).json({
      message: 'Success: Read All Items',
      allItems: allItems,
    })
  } catch(err) {
    res.status(400).json({
      message: 'Failure: Read All Items',
    })
  }
})
// Read Single Item
app.get('/item/:id', async(req, res) => {
  try {
    await connectDB()
    const singleItem = await ItemModel.findById(req.params.id)
    res.status(200).json({
      message: 'Success: Read Single Item',
      singleItem: singleItem,
    })
  } catch(err) {
    res.status(400).json({
      message: 'Failure: Read Single Item',
    })
  }
})
// Update Item
app.put('/item/update/:id', auth, async(req, res) => {
  try {
    await connectDB()
    const singleItem = await ItemModel.findById(req.params.id)
    if(singleItem.email === req.body.email) {
      await ItemModel.updateOne({_id: req.params.id}, req.body)
      res.status(200).json({
        message: 'Success: Update Item',
      })
    } else {
      throw new Error()
    }
  } catch(err) {
    console.log(err)
    res.status(400).json({
      message: 'Failure: Update Item',
    })
  }
})
// Delete Item
app.delete('/item/delete/:id', auth, async(req, res) => {
  try {
    await connectDB()
    const singleItem = await ItemModel.findById(req.params.id)
    console.log(singleItem, req.body)
    if(singleItem.email === req.body.email) {
      await ItemModel.deleteOne({_id: req.params.id})
      res.status(200).json({
        message: 'Success: Delete Item',
      })
    } else {
      throw new Error()
    }
  } catch(err) {
    console.log(err)
    res.status(400).json({
      message: 'Failure: Delete Item',
    })
  }
})

// USER functions
// Register User
app.post('/user/register', async(req, res) => {
  try {
    await connectDB()
    await UserModel.create(req.body)
    res.status(200).json({
      message: 'Success: Register User',
    })
  } catch(err) {
    res.status(400).json({
      message: 'Failure: Register User',
    })
  }
})
// Login User
const secret_key = 'donkey hote donkey kong'
app.post('/user/login', async(req, res) => {
  try {
    await connectDB();
    const user = await UserModel.findOne({email: req.body.email})
    if(user) {
      if(user.password === req.body.password) {
        const payload = {
          email: req.body.email,
        };
        const token = jwt.sign(payload, secret_key, {expiresIn: '23h'})
        res.status(200).json({
          message: 'Success: Login User',
          token: token,
        })
      } else {
        res.status(400).json({
          message: 'パスワードが違います！',
        })
      }
    } else {
      res.status(400).json({
        message: 'メールアドレスが見つかりません！',
      })
    }
  } catch(err) {
    res.status.send({
      message: 'Failure: Login User',
    })
  }
})

const port = process.env.port || 5000
app.listen(port, () => {
  console.log('listening on port ' + port)
})