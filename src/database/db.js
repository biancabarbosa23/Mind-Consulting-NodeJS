const mongoose = require('mongoose')

//conexão ao Banco de dados
//user: new-user senha:lekOEiWEwEXyiTvK
mongoose
  .connect(
    'mongodb+srv://new-user:lekOEiWEwEXyiTvK@cluster0.ht3vk.gcp.mongodb.net/MindConsulting?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(function () {
    console.log('Conectou!')
  })
  .catch(function (err) {
    console.log(err)
  })

mongoose.Promise = global.Promise

module.exports = mongoose
