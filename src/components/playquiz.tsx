import  QuizData from "../data/Quizdata"
import { useQuiz} from "../reducer/quiz-reducer"
import { useParams } from "react-router-dom"

const PlayingQuiz = () => {

    const {state, dispatch} = useQuiz()

    const { id } = useParams()
    console.log({id})

    return (
        <div>
            <div>
            <h3>{QuizData.quiz[parseInt(id, 10)].quizName}</h3>
            {
            state.showQuiz ? (
                <div>
                <h3>Score:- {state.currentScore}</h3>
                <h4>{QuizData.quiz[parseInt(id, 10)].questions[state.currentQuestion].question}</h4>
                <div>{QuizData.quiz[parseInt(id, 10)].questions[state.currentQuestion].code}</div>
                {
                QuizData.quiz[parseInt(id, 10)].questions[state.currentQuestion].options.map((option) => {
                    return (
                    <div>
                        <button onClick = {() => dispatch({type: "ANSWER", payload: {option, id}})}>{option.answer}</button>
                    </div>
                    )
                })
                }
                </div>
            ): <div>Your score is {state.currentScore}, thanks for playing</div>
            }
            </div>
        </div>
    )
}

export default PlayingQuiz