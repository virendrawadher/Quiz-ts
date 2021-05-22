import { Link } from 'react-router-dom';
import QuizData from '../data/Quizdata';
import { useQuiz } from '../reducer/quiz-reducer';

const Home = () => {
	const { dispatch } = useQuiz();

	return (
		<div>
			{QuizData.quiz.map((q, i) => {
				return (
					<Link to={`/quiz/${i}`} onClick={() => dispatch({ type: 'RESET' })}>
						<p>{q.quizName}</p>
					</Link>
				);
			})}
		</div>
	);
};

export default Home;
