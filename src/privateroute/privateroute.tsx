import { Route, Navigate } from 'react-router-dom';

interface Private {
	path: string;
	element: any;
	isUserLogin: Boolean;
}

const PrivateRoute = ({ path, isUserLogin, ...props }: Private) => {
	return isUserLogin ? (
		<Route path={path} {...props} />
	) : (
		<Navigate state={{ from: path }} replace to='/login' />
	);
};

export default PrivateRoute;
