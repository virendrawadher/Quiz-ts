import React, {useReducer} from 'react';
import './App.css';
import  QuizData from "./data/Quizdata"
import { Options } from './type-aliases/type';
import CalculateScore from "./utility/calculateScore"

type IntialState = {
  currentQuestion: number,
  currentScore: number,
  showQuiz: boolean
}

const intialState: IntialState = {
  currentQuestion: 0,
  currentScore: 0,
  showQuiz: true
}

type ACTIONS = 
  | {type: "ANSWER", payload: Options}

const reducerQuiz = (state: IntialState, actions: ACTIONS) => {
  switch(actions.type){
    case "ANSWER":
      const score = CalculateScore(state.currentScore, QuizData.questions[state.currentQuestion], actions.payload)

      const nextQues = state.currentQuestion + 1
      if(nextQues < QuizData.questions.length){
        return {
          currentQuestion: nextQues,
          currentScore:  score,
          showQuiz: true
        }
      }else{
        return {
          ...state,
          currentScore: score,
          showQuiz: false

        }
      }

    default:
      return {...state}
  }

}

function App() {

  const [{currentQuestion, currentScore, showQuiz}, disptach] = useReducer(reducerQuiz, intialState)
  return (
    <div className="App">
      <h1>Quiz</h1>
      <div>
        <h3>{QuizData.quizName}</h3>
        {
          showQuiz ? (
            <div>
              <h3>Score:- {currentScore}</h3>
              <h4>{QuizData.questions[currentQuestion].question}</h4>
              <div>{QuizData.questions[currentQuestion].code}</div>
            {
              QuizData.questions[currentQuestion].options.map((option) => {
                return (
                  <div>
                    <button onClick = {() => disptach({type: "ANSWER", payload: option})}>{option.answer}</button>
                  </div>
                )
              })
            }
            </div>
          ): <div>Your score is {currentScore}, thanks for playing</div>
        }
      </div>
    </div>
  );
}

export default App;
