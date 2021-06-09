import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { useStylesLayout } from '../styles/layoutstyle';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type NavOption = {
	nav: Nav[];
};

type Nav = {
	id?: String;
	name?: String;
	active?: Boolean;
};

const Layout: React.FC = ({ children }) => {
	const classes = useStylesLayout();

	const navigate = useNavigate();

	const navOption: NavOption = {
		nav: [
			{
				id: '1',
				name: 'Home',
				active: false,
			},
			{
				id: '2',
				name: 'Result',
				active: false,
			},
		],
	};

	const [active, setActive] = useState(navOption.nav);

	const navActive = (op: Nav) => {
		setActive((active) =>
			active.map((ac) =>
				ac.id === op.id ? { ...ac, active: true } : { ...ac, active: false },
			),
		);
		const findIndexOfActive = active.findIndex((ac) => ac.id === op.id);

		if (active[findIndexOfActive].name === 'Home') {
			navigate('/');
		} else {
			navigate('/result');
		}
	};

	return (
		<div>
			{/* app bar */}
			<AppBar position='static' elevation={0} className={classes.appbar}>
				<ToolBar>
					<Avatar
						alt='Ethereal'
						src='https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fayay.co.uk%2Fbackgrounds%2Fdigital_art%2Fabstract%2Fethereal-wisps.jpg&f=1&nofb=1'
						className={classes.avatar}
					/>
					<Typography variant='h4' component='h2' className={classes.title}>
						EtheReaL
					</Typography>
					{active.map((op, i) => (
						<Button
							key={i}
							variant='outlined'
							className={`${classes.option} ${op.active && classes.active}`}
							onClick={() => navActive(op)}>
							{op.name}
						</Button>
					))}
					<Button variant='outlined' className={classes.loginButton}>
						Login
					</Button>
				</ToolBar>
			</AppBar>

			<div>{children}</div>
		</div>
	);
};

export default Layout;
