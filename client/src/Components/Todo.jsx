import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './style.css'

const Todo = () => {

    const [todos, setTodos] = useState([]);

    useEffect(() => {
        document.querySelector('title').innerHTML='Available Todos';
        getAllTodo();
    }, [])

    // api call for fetching uncompleted todos
    const getAllTodo = async () => {
        fetch('http://localhost:5000/getData/not_completed')
            .then(res => res.json())
            .then(data => setTodos(data))
            .catch(err => console.warn(err))
    }

    // checking the fetched data is empty/not
    if (todos.length === 0) {
        return (
            <main className='no-todo'>
                <h1>No Todos Available!</h1>
                <Link to='/' className='add-todo-link'>Add Todo</Link>
            </main>
        )
    }


    return (
        <div className='todo-container'>
            <h1>TASKS TO COMPLETE</h1>
            <p>Complete The Tasks Before Time.</p>

            <main className='todo-main'>
                <ul>
                    {
                        todos.map((todo, index) => {
                            return (
                                <Link key={index} to={`/todo/${todo._id}`}>
                                    <li><span>{index + 1}</span>{todo.title}</li>
                                </Link>
                            )
                        })
                    }
                </ul>
            </main>
        </div>
    )
}

export default Todo
