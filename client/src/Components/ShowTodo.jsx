import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

// icon tick
import { AiOutlineDelete } from 'react-icons/ai'

const ShowTodo = () => {
    const [completetButtonText, setCompleteButtonText] = useState('complete')
    const [completed, setCompleted] = useState(false); // task completed/not
    const { id } = useParams(); // getting todo id from url
    const [todo, setTodo] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        getTodo();
    }, [])

    // set title of tab
    document.querySelector('title').innerHTML = todo.title?todo.title:'Todo'

    // get details of a todo using id
    const getTodo = async () => {
        fetch(`http://localhost:5000/getTodo/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.err)
                    alert(data.err)
                else {
                    setCompleted(data.todo.completed);
                    setTodo(data.todo);
                    if(completed)
                        setCompleteButtonText('Completed')
                }
            })
    }    

    // updating todo as completed
    const setComplete = () => {
        setCompleteButtonText('Loading...')
        fetch(`http://localhost:5000/updateTodo/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed: true })
        })
            .then(res => res.json())
            .then(msg => {
                if (msg.status === 'ok'){
                    setTimeout(()=>{
                    setCompleted(true)
                    }, 1500)
                }
                else
                    alert(msg.status)
            })
            .catch(err => console.warn(err))
    }

    // checking if there is 
    if (Object.keys(todo).length === 0) {
        return (
            <main className='no-todo'>
                <h1>No Todos Available!</h1>
                <Link to='/' className='add-todo-link'>Add Todo</Link>
            </main>
        )
    }

    const deleteTodo = () => {
        fetch('http://localhost:5000/deleteTodo', {
            method:'DELETE',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({id})
        }).then(res=>res.json())
        .then(msg => {
            if(msg.status === 'ok')
                navigate('/todo')
        })
        .catch(err=>console.warn(err))
    }

    return (
        <div className='show-container'>
            <div className='heading-todo'>
                <h1>{todo.title}</h1>
                <p>#id {todo._id}</p>
                <span>
                    {
                        completed ?
                            'Completed'
                            :
                            <a href="#complete">{completetButtonText}</a>
                    }
                </span>
            </div>
            <p className="content">
                {todo.desc}
            </p>

            <div id='complete' className="completed-btn-sec">
                {
                    completed ?
                        <button onClick={deleteTodo} className='delete-todo'><span><AiOutlineDelete/></span> Delete</button>
                        :
                        <button onClick={setComplete}>{completetButtonText}</button>
                }
            </div>
        </div>
    )
}

export default ShowTodo
