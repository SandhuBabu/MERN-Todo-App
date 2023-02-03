import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

// components
import Home from "./Components/Home";
import Todo from "./Components/Todo";
import ShowTodo from "./Components/ShowTodo";
import Completed from "./Components/Completed";
import Navigation from "./Components/Navigation";


function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/todo' exact element={<Todo />} />
          <Route path='/todo/:id' exact element={<ShowTodo />} />
          <Route path='/completed' exact element={<Completed />} />
        </Routes>
        <Navigation/>
      </BrowserRouter>
    </div>
  );
}

export default App;
