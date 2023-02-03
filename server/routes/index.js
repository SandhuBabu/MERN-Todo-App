const express = require("express");
const router = express.Router();

// database operations file 
const controller = require('../Controllers/controller')

// api for receive new todo data
router.post('/sendData', (req, res) => {
    const { title, desc } = req.body;
    controller.insertData(title, desc).then(msg => {
        res.json({ msg: msg })
    })
})

// api for sending completed/not completed todos list
router.get('/getData/:isCompleted', (req, res) => {
    let isCompleted = req.params.isCompleted === 'completed' ? true : false;
    controller.sendAllTodo(isCompleted).then(todos => {
        res.json(todos)
    })
})

// api for sending todo from ID in url
router.get('/getTodo/:id', (req, res) => {
    controller.sendTodo(req.params.id)
        .then(todo => {
            if (typeof todo === 'string')
                res.json({ err: todo })
            else
                res.json({ todo })
        }).catch(err => res.json({ err: err.message }))
})


// api for updating to using ID from url
router.post('/updateTodo/:id', (req, res) => {
    const data = req.body
    controller.updateToDo(req.params.id, data)
        .then(result => {
            res.json(result)
        })
})

// api for deleting a completed todo
router.delete('/deleteTodo', (req, res) => {
    controller.deleteTodo(req.body.id).then(status=>{
        res.json(status)
    })
})

module.exports = router