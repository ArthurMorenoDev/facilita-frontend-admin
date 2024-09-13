import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

export function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');

  return token ? children : <Navigate to="/" />;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
