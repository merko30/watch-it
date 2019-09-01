const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect(process.env.DB, {
    useNewUrlParser: true
  }).then(() => {
    console.log('Connected to database')
  }).catch(error => console.log(error))
}