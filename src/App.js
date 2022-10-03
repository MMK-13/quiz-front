import React from 'react';
import './App.css';
import Home from './Pages/Home';
import Connexion from './Pages/Connexion';
import NotFound from './Pages/NotFound';
import Quiz from './Pages/Quiz';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import QuizPlay from './Pages/QuizPlay';
import QuizResult from './Pages/QuizResult';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/account/:page' exact element={<Connexion />} />
          <Route path='/quiz/:page' element={<Quiz />} />
          <Route path='/quiz/:page/:id' element={<Quiz />} />
          <Route path='/play/:id' element={<QuizPlay />} />
          <Route path='/quiz-result/:id' element={ <QuizResult /> } />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
