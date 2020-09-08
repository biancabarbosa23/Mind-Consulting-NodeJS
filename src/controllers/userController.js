const express = require('express')
const HttpStatus = require('http-status')
const bcrypt = require('bcrypt')

const authMiddleware = require('../middlewares/auth')
const User = require('../models/User')
const { estimatedDocumentCount } = require('../models/User')

const router = express.Router()
router.use(authMiddleware)

//Listar Usuários
router.get('/usuarios', async function (req, res) {
  try {
    //achando todos os usuários
    const admin = await User.findById(req.userId)

    //verificando nível de acesso
    if (admin.level !== 999)
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .send({ error: 'Usuário não autorizado' })

    const users = await User.find()

    return res.send({ users })
  } catch (err) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .send({ error: 'Erro ao listar usuários' })
  }
})

//Retornar dados de um usuário
router.get('/:idUser', async function (req, res) {
  try {
    //o que entrar de parâmetro na rota
    const usuario = await User.findById(req.params.idUser)

    return res.send({ usuario })
  } catch (err) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .send({ error: 'Erro ao listar usuário' })
  }
})

//Atualizar usuário
router.put('/:idUser', async function (req, res) {
  try {
    const newData = req.body

    if (newData.password)
      newData.password = await bcrypt.hashSync(req.body.password, 10)

    //atualizando e retornando usuario atualizado
    const usuario = await User.findByIdAndUpdate(req.params.idUser, newData, {
      new: true,
    })

    await usuario.save()
    return res.send({ usuario })
  } catch (err) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .send({ error: 'Erro ao atualizar usuário!' })
  }
})

//Excluir Usuário
router.delete('/:userId', async function (req, res) {
  try {
    const admin = await User.findById(req.userId)

    if (admin.level !== 999)
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .send({ error: 'Sem autorização de exclusão!' })

    await User.findByIdAndDelete(req.params.userId)
    return res.send()
  } catch (err) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .send({ error: 'Erro ao deletar usuário!' })
  }
})
module.exports = (app) => app.use('/application', router)
