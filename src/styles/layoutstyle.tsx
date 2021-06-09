import { makeStyles } from '@material-ui/core';

export const useStylesLayout = makeStyles((theme) => {
	return {
		appbar: {
			backgroundColor: theme.palette.primary.light,
		},
		title: {
			fontWeight: 'bold',
			flexGrow: 1,
			display: 'flex',
		},

		avatar: {
			marginRight: theme.spacing(1),
		},

		option: {
			marginRight: theme.spacing(1),
			fontWeight: 500,
		},

		loginButton: {
			fontWeight: 500,
		},
		active: {
			backgroundColor: '#E5E7EB',
		},
	};
});
