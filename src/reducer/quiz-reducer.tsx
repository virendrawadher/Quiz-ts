import React, { useReducer, createContext, useContext, Dispatch } from "react"
import  QuizData from "../data/Quizdata"
import { Options } from '../type-aliases/type';
import CalculateScore from "../utility/calculateScore"


type IntialState = {
    currentQuestion: number,
    currentScore: number,
    showQuiz: boolean,
  }
  
const intialState: IntialState = {
currentQuestion: 0,
currentScore: 0,
showQuiz: true,
}

type PAYLOAD = {
    option: Options,
    id: string
}

type ACTIONS = 
| {type: "ANSWER", payload: PAYLOAD}


const QuizContext = createContext<{state: IntialState, dispatch: Dispatch<ACTIONS>}>({
    state: intialState,
    dispatch: () => null
})


export const QuizProvider: React.FC = ({children}) => {

    const [state, dispatch] = useReducer(ReducerQuiz, intialState)

    return (
        <QuizContext.Provider value = {{state, dispatch}}>
            {children}
        </QuizContext.Provider>
    )

}

export const useQuiz = () => {
    return useContext(QuizContext)
}

const ReducerQuiz = (state: IntialState, actions: ACTIONS) => {

    switch(actions.type){
        case "ANSWER":
        const score = CalculateScore(state.currentScore, QuizData.quiz[parseInt(actions.payload.id, 10)].questions[state.currentQuestion], actions.payload.option)
    
        const nextQues = state.currentQuestion + 1
        if(nextQues < QuizData.quiz[parseInt(actions.payload.id, 10)].questions.length){
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
