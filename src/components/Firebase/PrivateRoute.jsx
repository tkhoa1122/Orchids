import { Navigate } from 'react-router-dom';
import {auth} from '../Firebase/config';

const PrivateRoute = ({ children }) => {
  return auth.currentUser ? children : <Navigate to="/" />;
};

export default PrivateRoute;