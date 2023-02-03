import React, { useState, useEffect } from 'react'
import './style.css'

const Home = () => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    useEffect(() => {
        document.querySelector('title').innerHTML = 'Todo App';
    }, [])

    // api for adding todo to database
    const sendData = async (e) => {
        e.preventDefault();

        // form validation
        if (title.length === 0 || desc.length === 0)
            return

        let data = { title: title, desc: desc }

        fetch('http://localhost:5000/sendData', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.msg === 'success') {
                    setTitle('');
                    setDesc('');
                } else {
                    alert('Error occured while saving.')
                }
            })
            .catch(err => console.warn(err))
    }

    return (
        <section>
            <div className="home-container">
                <div className="top-texts">
                    <h1>TODO APP</h1>
                    <p>Let's save your works to do!</p>
                </div>
                <main className='main-form-todo'>
                    <form>
                        <div className="input-sec">
                            <label className='title' htmlFor="title">
                                Title
                            </label>
                            <br />
                            <input onChange={(e) => setTitle(e.target.value)} type="text" value={title} />
                        </div>

                        <div className="input-sec">
                            <label htmlFor="desc">What To Do ?</label>
                            <textarea onChange={(e) => setDesc(e.target.value)} cols="30" rows="10" value={desc}></textarea>
                        </div>

                        <div className="btn-sec">
                            <button id='submit-btn' onClick={sendData}>Save</button>
                        </div>
                    </form>
                </main>
            </div>
        </section>
    )
}

export default Home
