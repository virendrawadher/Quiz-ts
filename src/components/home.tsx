import { Link } from "react-router-dom"
import QuizData  from "../data/Quizdata"

const Home = () => {
    return (
        <div>
            {
                QuizData.quiz.map((q, i) => {
                    return <Link to = {`/quiz/${i}`}>
                        <p>{q.quizName}</p> 
                    </Link>
                })
            }
        </div>
    )
}

export default Home