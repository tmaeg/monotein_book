const jwt = require('jsonwebtoken')
const secret_key = 'donkey hote donkey kong'

const auth = (req, res, next) => {
  if(req.method === 'GET') {
    return next()
  }
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJpYXQiOjE2NzgxMDMxMjMsImV4cCI6MTY3ODE4NTkyM30.bxCFH9GWPgLEexnaQunzJm-z2n44QUXb-B7es6HauGQ'///*await?*/req.headers.authorization.split(' ')[1]
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