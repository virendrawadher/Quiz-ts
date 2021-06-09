import { makeStyles, Theme } from '@material-ui/core';

export const useStylesQuiz = makeStyles((theme: Theme) => {
	return {
		container: {
			marginTop: '5rem',
		},
		card: {
			maxWidth: '50rem',
			margin: 'auto',
		},
		quizQuestion: {
			marginTop: '1rem',
		},
		quizProp: {
			display: 'flex',
			marginTop: '1rem',
			marginBottom: '1rem',
		},
		score: {
			display: 'flex',
			flexGrow: 1,
		},
		singleOption: {
			marginBottom: '1rem',
			width: '22rem',
			fontSize: '1rem',
		},
		select: {
			backgroundColor: '#10B981',
			'&:hover': {
				backgroundColor: '#10B981',
			},
		},
		wrong: {
			backgroundColor: '#EF4444',
			'&:hover': {
				backgroundColor: '#EF4444',
			},
		},
		next: {
			backgroundColor: theme.palette.primary.main,
			'&:hover': {
				backgroundColor: theme.palette.primary.main,
			},
		},
		prev: {
			color: theme.palette.secondary.light,
		},
		rulesTitle: {
			display: 'flex',
			marginLeft: '1rem',
		},
		carbonCode: {
			width: '680px',
			height: '321px',
			border: 0,
			padding: 0,
			transform: 'scale(1)',
			overflow: 'hidden',
		},
	};
});
// "width: 680px; height: 326px; border:0; transform: scale(1); overflow:hidden;"
