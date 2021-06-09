import QuizData from '../data/Quizdata';
import { useQuiz } from '../reducer/quiz-reducer';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Rules from '../components/rules';
import '../App.css';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Card, CardContent } from '@material-ui/core';
import { useStylesQuiz } from '../styles/quizstyles';
import Quiz from '../components/quiz';

const PlayingQuiz = () => {
	const { state, dispatch } = useQuiz();

	const classes = useStylesQuiz();

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

	// console.log({ state });
	return (
		<Container className={classes.container}>
			<Card variant='outlined' className={classes.card}>
				<CardContent>
					<Typography variant='h4'>
						{QuizData.quiz[parseInt(id, 10)].quizName}
					</Typography>
					{state.showQuiz ? (
						<Quiz id={id} classes={classes} />
					) : (
						<div>
							<Typography variant='h5'>
								Your score is {state.currentScore}, thanks for playing
							</Typography>
						</div>
					)}
				</CardContent>
			</Card>
		</Container>
	);
};

export default PlayingQuiz;
