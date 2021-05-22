import QuizData from '../data/Quizdata';
import { useQuiz } from '../reducer/quiz-reducer';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import answerChecker from '../utility/answerChecker';
import '../App.css';

const PlayingQuiz = () => {
	const { state, dispatch } = useQuiz();

	const { id } = useParams();

	useEffect(() => {
		const interval = setInterval(() => {
			if (state.timer === 0) {
				dispatch({ type: 'TIMER', payload: { id } });
				return () => clearInterval(interval);
			}
			dispatch({ type: 'TIMER', payload: { id } });
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, [state.timer]);
	return (
		<div>
			<div>
				<h3>{QuizData.quiz[parseInt(id, 10)].quizName}</h3>
				{state.showQuiz ? (
					<div>
						<h3>Score:- {state.currentScore}</h3>
						<h3>Time left:- {state.timer} sec</h3>
						<h4>
							{
								QuizData.quiz[parseInt(id, 10)].questions[state.currentQuestion]
									.question
							}
						</h4>
						<div>
							{
								QuizData.quiz[parseInt(id, 10)].questions[state.currentQuestion]
									.code
							}
						</div>
						{QuizData.quiz[parseInt(id, 10)].questions[
							state.currentQuestion
						].options.map((option) => {
							return (
								<div>
									<button
										className={`singleOption ${
											state.selected && answerChecker(option, state.selected)
										}`}
										onClick={() =>
											dispatch({ type: 'SET_SCORE', payload: { option, id } })
										}>
										{option.answer}
									</button>
								</div>
							);
						})}
						<button
							onClick={() =>
								dispatch({ type: 'SET_NEXTQUES', payload: { id } })
							}>
							Next
						</button>
					</div>
				) : (
					<div>
						<div>Your score is {state.currentScore}, thanks for playing</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default PlayingQuiz;
