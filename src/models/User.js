const mongoose = require('../database/db')

//campos do usuário
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false, //não aparecer no array
  },
  level: {
    type: Number,
  },
})

const User = mongoose.model('User', UserSchema)

module.exports = User
