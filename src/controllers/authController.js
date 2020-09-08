const HttpStatus = require('http-status')
const bcrypt = require('bcrypt')
const express = require('express')
const jwt = require('jsonwebtoken')

const authConfig = require('../config/auth')
const User = require('../models/User')
//classe para definição de rota
const router = express.Router()

//Geração do Token
function gerarToken(params = {}) {
  return jwt.sign(params, authConfig.keySecret, {
    //expiração de 1 dia
    expiresIn: 86400,
  })
}

//Definição da rota cadastro
router.post('/cadastro', async function (req, res) {
  //cadastro do usuário
  try {
    const { email } = req.body
    const { cpf } = req.body

    if (await User.findOne({ email }))
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send({ error: 'Email já existente' })

    if (await User.findOne({ cpf }))
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send({ error: 'CPF já existente' })

    const newUser = new User({
      name: req.body.name,
      cpf: req.body.cpf,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      level: req.body.level,
    })

    await newUser.save()
    //CREATED 201

    newUser.password = undefined

    return res
      .status(HttpStatus.CREATED)
      .send({ newUser, token: gerarToken({ id: newUser.id }) })
  } catch (err) {
    //INTERNAL SERVER ERROR 500
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ error: 'Usuário não pode ser cadastrado!' })
  }
})

//Rota de Autenticação
router.post('/login', async function (req, res) {
  const { password } = req.body
  //trazendo usuário (cpf ou email)
  const { usuario: usuário } = req.body

  //verificação do usuário
  var user = await User.findOne({ email: usuário }).select('+password')
  if (!user) {
    user = await User.findOne({ cpf: usuário }).select('+password')

    if (!user) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send({ error: 'Usuário não encontrado!' })
    }
  }

  //comparação com senha criptografada
  if (!(await bcrypt.compare(password, user.password)))
    return res.status(HttpStatus.BAD_REQUEST).send({ error: 'Senha invalida!' })

  //verificar se usuário esta ativo
  if (user.level === 0) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .send({ error: 'Esse Usuário foi desativado!' })
  }

  user.password = undefined

  res.send({ user, token: gerarToken({ id: user.id }) })
})

module.exports = (app) => app.use('/auth', router)
