import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import QuizData from '../data/Quizdata';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuiz } from '../reducer/quiz-reducer';
import { ClassNameMap } from '@material-ui/styles';
import {
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Card,
	Container,
	CardContent,
} from '@material-ui/core';
import ArrowRightOutlinedIcon from '@material-ui/icons/ArrowRightOutlined';
import { useStylesQuiz } from '../styles/quizstyles';
// import

// type RulesProps = {
// 	classes: ClassNameMap;
// };

const Rules = () => {
	const { id } = useParams();

	const classes = useStylesQuiz();

	const navigate = useNavigate();

	// const { classes } = props;

	const { state, dispatch } = useQuiz();

	const rules = {
		rule: [
			`This quiz contains ${
				state.quizData[parseInt(id, 10)].questions.length
			} questions`,
			`Each questions has is own points`,
			`Negative points of -5 for wrong answer`,
			`Each questions has it own time`,
		],
	};

	const startQuiz = (i: Number) => {
		navigate(`/quiz/${i}`);
		dispatch({ type: 'SET_START_QUIZ', payload: {id} });
	};

	return (
		<div>
			<Container className={classes.container}>
				<Card variant='outlined' className={classes.card}>
					<CardContent>
						<Typography variant='h4'>
							{state.quizData[parseInt(id, 10)].quizName}
						</Typography>
						<Typography variant='h6' className={classes.rulesTitle}>
							Rules
						</Typography>
						<List>
							{rules.rule.map((r, i) => (
								<ListItem key={i}>
									<ListItemIcon>
										<ArrowRightOutlinedIcon />
									</ListItemIcon>
									<ListItemText primary={r} />
								</ListItem>
							))}
						</List>
						<div style={{ display: 'flex' }}>
							<div style={{ display: 'flex', flexGrow: 1 }}></div>
							<Button
								variant='outlined'
								onClick={() => startQuiz(parseInt(id, 10))}
								className={classes.next}>
								Start Quiz
							</Button>
						</div>
					</CardContent>
				</Card>
			</Container>
		</div>
	);
};

export default Rules;
