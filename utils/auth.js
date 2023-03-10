const jwt = require('jsonwebtoken')
const secret_key = 'donkey hote donkey kong'

const auth = (req, res, next) => {
  if(req.method === 'GET') {
    return next()
  }
  const token = /*await?*/req.headers.authorization.split(' ')[1]
  if(!token) {
    return res.send(400).json({
      message: 'トークンが見つかりません！',
    })
  }
  try {
    const decoded = jwt.verify(token, secret_key)
    req.body.email = decoded.email
    return next()
  } catch(err) {
    return res.send(400).json({
      message: 'トークンが正しくありません！',
    })
  }
}

module.exports = auth