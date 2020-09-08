//carregamento de módulos
const express = require('express')
const bodyParser = require('body-parser')

//recebendo a função express
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//referenciando authController
require('./controllers/authController')(app)
//referenciando projectController
require('./controllers/userController')(app)

//porta
app.listen(5000)
