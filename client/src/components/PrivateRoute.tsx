import React, { useEffect } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface IPrivateRouteProps extends RouteProps {
    loggedIn: boolean;
}

function PrivateRoute({ loggedIn, children, ...rest }: IPrivateRouteProps) {
  useEffect(() => {
    console.log(loggedIn);
  }, [loggedIn]);

  return (
    <Route
      {...rest}
      render={({ location }) => (loggedIn
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
