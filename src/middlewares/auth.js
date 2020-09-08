const HttpStatus = require('http-status')
const jwt = require('jsonwebtoken')
const auth = require('../config/auth.json')

//Validação do Token
module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization

  //existência do token
  if (!authHeader)
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .send({ error: 'Token não Informado!' })

  const partsToken = authHeader.split(' ')
  //Bearer + Hash

  if (!partsToken.length === 2)
    return res.status(HttpStatus.UNAUTHORIZED).send({ error: 'Erro no Token!' })

  const [part, token] = partsToken

  //verificação Bearer com RegExr
  if (!/^Bearer$/i.test(part))
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .send({ error: 'Erro de Formação no Token' })

  //Validação do token e usuário
  jwt.verify(token, auth.keySecret, function (err, codeUser) {
    if (err)
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .send({ error: 'Token invalido!' })

    req.userId = codeUser.id

    return next()
  })
}
