import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './style.css'

const Completed = () => {

    const [todos, setTodos] = useState([]);

    useEffect(() => {
        document.querySelector('title').innerHTML = 'Completed Todos';
        getAllTodo();
    }, [todos])

    // api for fetching all completed todos
    const getAllTodo = async () => {
        fetch('http://localhost:5000/getData/completed')
            .then(res => res.json())
            .then(data => setTodos(data))
            .catch(err => console.warn(err))
    }

    // checking the fetched data is empty/not
    if(todos.length === 0) {
        return(
            <main className='no-todo'>
                <h1>No Todos Completed</h1>
                <Link to='/todo' className='add-todo-link'>Complete Todo</Link>
            </main>
        )
    }

    return (
        <div className='todo-container'>
            <h1>COMPLETED TASKS</h1>
            <p>You Have Successfully Completed These Tasks!</p>

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

export default Completed
