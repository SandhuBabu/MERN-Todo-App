// todos collection
const toDoModel = require('../models/models');

// for converting id from url to ObjectId of mongoDB
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    // inserts a new todo
    insertData: async (title, desc) => {
        const data = {
            title: title,
            desc: desc,
            completed: false
        };
        const todo = new toDoModel(data)
        try {
            await todo.save();
            return ('success')
        } catch (err) {
            return ('error')
        }
    },

    // sends list of completed/not completed todos
    sendAllTodo: (isCompleted) => {
        const todos = toDoModel.find({ completed: isCompleted }, 'title id');
        if (todos.length === 0)
            return 'No todos available';
        return todos
    },

    // send a specific todo based on id
    sendTodo: async (id) => {
        try {
            const todo = await toDoModel.findById(ObjectId(id));
            if (!todo)
                return 'No records'
            return todo
        } catch (err) {
            return err.message
        }

    },

    // update fields of todo
    updateToDo: async (id, data) => {
        try {
            await toDoModel.findOneAndUpdate({ _id: id }, data);
            return { status: 'ok' }
        } catch (err) {
            return { status: 'Error occured while updating' }
        }
    },

    // delete a todo from collection
    deleteTodo: async (id) => {
        const doc = await toDoModel.findOneAndRemove({ _id: ObjectId(id) });
        if (!doc)
            return { status: 'error' }
        else
            return { status: 'ok' }
    }
}