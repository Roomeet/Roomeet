import React, { useContext } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { Logged } from '../context/LoggedInContext'

interface IPrivateRouteProps extends RouteProps {
}

function PrivateRoute({ children, ...rest }: IPrivateRouteProps) {
  const logged = useContext(Logged);

  return (
    <Route
      {...rest}
      render={({ location }) => (logged
        ? (
          children
        )
        : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: location },
            }}
          />
        ))}
    />
  );
}

export default PrivateRoute;
