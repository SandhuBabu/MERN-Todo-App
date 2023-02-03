const mongoose = require('mongoose');

// schema/defenition of TODO document
const todoSchema = new mongoose.Schema({
    title: String,
    desc: String,
    completed: Boolean
})

const TodoModel = mongoose.model('Todo', todoSchema);

module.exports = TodoModel;
