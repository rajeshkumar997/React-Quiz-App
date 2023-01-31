import axios from 'axios';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Home from './Pages/Home/Home';
import Quiz from './Pages/Quiz/Quiz';
import Result from './Pages/Result/Result';

function App() {
  const [name, setName] = useState("")
  const [questions, setQuestions] = useState();
  const [score, setScore] = useState(0);


  const fetchQuestions = async (category = '', difficulty = '') => {
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=multiple`
    )
    setQuestions(data.results)
  }

  return (
    <BrowserRouter>
      <div className="app" >
        <Header />
        <Routes>
          <Route path='/' exact element={<Home name={name} setName={setName} fetchQuestions={fetchQuestions} />} />
          <Route path='/quiz' element={<Quiz
            name={name}
            questions={questions}
            score={score}
            setScore={setScore}
            setQuestions={setQuestions} />} />
          <Route path='/result' element={<Result name={name} score={score} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
