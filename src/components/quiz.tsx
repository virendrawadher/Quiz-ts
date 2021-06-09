import { Button, Grid, Typography } from '@material-ui/core';
import QuizData from '../data/Quizdata';
import KeyboardArrowLeftOutlinedIcon from '@material-ui/icons/KeyboardArrowLeftOutlined';
import KeyboardArrowRightOutlinedIcon from '@material-ui/icons/KeyboardArrowRightOutlined';
import { useQuiz } from '../reducer/quiz-reducer';
import { ClassNameMap } from '@material-ui/styles';
import answerChecker from '../utility/answerChecker';

type QuizProps = {
	id: string;
	classes: ClassNameMap;
};

const Quiz = (props: QuizProps) => {
	const { id, classes } = props;

	const { state, dispatch } = useQuiz();

	return (
		<div>
			<Typography variant='h5' className={classes.quizQuestion}>
				Q.{' '}
				{
					QuizData.quiz[parseInt(id, 10)].questions[state.currentQuestion]
						.question
				}
			</Typography>
			<div className={classes.quizProp}>
				<Typography variant='h6' className={classes.score}>
					Score:- {state.currentScore}
				</Typography>
				<Typography variant='h6'>Time left:- {state.timer} sec</Typography>
			</div>
			<Typography variant='h6'>
				{QuizData.quiz[parseInt(id, 10)].questions[state.currentQuestion]
					.code && (
					<iframe
						title='Code'
						src={
							QuizData.quiz[parseInt(id, 10)].questions[state.currentQuestion]
								.code
						}
						className={classes.carbonCode}
						sandbox='allow-scripts allow-same-origin'
					/>
				)}
				{/* </iframe> */}
			</Typography>
			<Grid container spacing={3}>
				{QuizData.quiz[parseInt(id, 10)].questions[
					state.currentQuestion
				].options.map((option, i) => {
					return (
						<Grid item xs={6} key={i}>
							<Button
								variant='outlined'
								className={`${classes.singleOption} ${answerChecker(
									option,
									state.selected,
									classes,
								)}`}
								onClick={() =>
									dispatch({
										type: 'SET_SCORE',
										payload: { option, id },
									})
								}
								disabled={state.isSelected ? true : false}>
								{option.answer}
							</Button>
						</Grid>
					);
				})}
			</Grid>
			<div className={classes.score}>
				<div className={classes.score}>
					<Button
						variant='outlined'
						onClick={() => dispatch({ type: 'SET_PREVQUES', payload: { id } })}
						startIcon={<KeyboardArrowLeftOutlinedIcon />}
						className={`${classes.wrong} ${classes.prev}`}>
						Previous
					</Button>
				</div>
				<Button
					variant='outlined'
					onClick={() => dispatch({ type: 'SET_NEXTQUES', payload: { id } })}
					endIcon={<KeyboardArrowRightOutlinedIcon />}
					className={`${classes.select}`}>
					Next
				</Button>
			</div>
		</div>
	);
};

export default Quiz;
