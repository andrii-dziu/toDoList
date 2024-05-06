const mongoose = require('mongoose');

const taskShema = mongoose.Schema({
  body: {type: String, required: true},
  isDone: {type: Boolean, required: true},
  id: {type: String, required: false},
  deadline: {type: String, required: false},
})

module.exports = mongoose.model('Task', taskShema);
