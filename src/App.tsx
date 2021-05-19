import React from 'react';
import { Route, Routes, Link } from "react-router-dom"
import './App.css';
import PlayingQuiz from "./components/playquiz"
import Home from "./components/home"


function App() {

  
  return (
    <div className="App">
      <h1>Quiz</h1>
      <nav>
        <Link to = "/quiz">Quiz</Link>
      </nav>
      <Routes>
        <Route path = "/" element = {<Home/>} />
        <Route path = "/quiz/:id" element = {<PlayingQuiz/>} />
      </Routes>
      
    </div>
  );
}

export default App;
