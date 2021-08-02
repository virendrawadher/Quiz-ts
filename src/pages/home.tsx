import { Link, useNavigate } from 'react-router-dom';
import QuizData from '../data/Quizdata';
import { useQuiz } from '../reducer/quiz-reducer';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import { makeStyles, Theme } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles((theme: Theme) => {
	return {
		container: {
			marginTop: theme.spacing(3),
		},
		quizBtn: {
			cursor: 'pointer',
			marginRight: theme.spacing(3),
		},
		media: {
			height: 0,
			padding: '56.25%',
		},
		card: {
			maxWidth: 345,
		},
	};
});

const Home = () => {
	const { dispatch, state } = useQuiz();

	const navigate = useNavigate();

	const classes = useStyles();

	const playQuiz = (i: Number) => {
		if(state.token.length > 0){			
			navigate(`/quiz/${i}/rules`);
			dispatch({ type: 'RESET' });
		}else {
			navigate('/login')
		}
	};

	return (
		<div>
			<Container className={classes.container}>
				<Grid container spacing={1}>
					{QuizData.quiz.map((q, i) => {
						return (
							<Grid
								item
								key={i}
								xs={6}
								onClick={() => playQuiz(i)}
								className={`${classes.quizBtn} ${classes.card}`}>
								{/* <Paper> */}
								<Card className={classes.card}>
									<CardHeader title={q.quizName} />
									<CardMedia
										title={q.quizName}
										image='https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fayay.co.uk%2Fbackgrounds%2Fdigital_art%2Fabstract%2Fethereal-wisps.jpg&f=1&nofb=1'
										className={classes.media}
									/>
								</Card>
							</Grid>
						);
					})}
				</Grid>
			</Container>
		</div>
	);
};

export default Home;
