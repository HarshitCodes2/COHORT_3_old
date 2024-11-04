import React, { useContext } from 'react';
import { AuthContext } from '../context/AppContext';

const AuthSystem = (props) => {
  const context = useContext(AuthContext);

  if (!context) {
    return <div>Context not available</div>;
  }

  const { loginFormOpen, toggleAuth, loggedIn } = context;

  return (
    <>
      {toggleAuth ? (
        <>
          <h1>Hello</h1>
          {/* <AppBar />
          {loginFormOpen && <Login />}
          {loggedIn && <Home />} */}
        </>
      ) : (
        <>
          <h1>Bye</h1>
          {/* <AppBar
            name={props.name}
            setName={props.setName}
            setLoggedIn={props.setLoggedIn}
            loggedIn={props.loggedIn}
            setLoginFormOpen={props.setLoginFormOpen}
          />
          {props.loginFormOpen && (
            <Login
              setName={props.setName}
              setLoggedIn={props.setLoggedIn}
              setLoginFormOpen={props.setLoginFormOpen}
            />
          )}
          {props.loggedIn && <Home />} */}
        </>
      )}
    </>
  );
};

export default AuthSystem;