import Spinner from 'react-bootstrap/Spinner';
import React from 'react';
import { Route, Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

// const PrivateRoute = ({ children, ...rest }) => {
//     const { user, isLoading } = useAuth();
//     if (isLoading) {
//         return <Spinner animation="border" role="status">
//             <span className="visually-hidden">Loading...</span>
//         </Spinner>
//     }
//     return (
//         <Route
//             {...rest}
//             render={({ location }) =>
//                 user.email ? (
//                     children
//                 ) : (
//                     <Navigate
//                         to={{
//                             pathname: "/login",
//                             state: { from: location }
//                         }}
//                     />
//                 )
//             }
//         />
//     );
// };

// export default PrivateRoute;

export default function PrivateRoute({ children }) {
    const location = useLocation();
    const { user } = useAuth();
    console.log("children:", children, "USer: ", user.email);
    return user.email ? children : <Navigate to="/login" state={{ from: location }} />;
}