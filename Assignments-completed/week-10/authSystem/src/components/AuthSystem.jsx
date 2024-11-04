import React, { useContext } from 'react'
import { Home, HomeContext } from './Home';
import Login from './Login';
import AppBar from './AppBar';
import { AuthContext } from "../context/AppContext"


const AuthSystem = (props) => {

  const context = useContext(AuthContext);

  // Default values if context is not available
  let toggleAuth = false;
  let loggedIn = props.loggedIn;
  let loginFormOpen = props.loginFormOpen;
  let setLoggedIn = props.setLoggedIn;
  let setName = props.setName;
  let setLoginFormOpen = props.setLoginFormOpen;

  if (context) {
    // Destructure values from context if available
    ({ toggleAuth, loggedIn, loginFormOpen, setLoggedIn, setName, setLoginFormOpen } = context);
  }
  
  return( 
    <>
    {toggleAuth ? (
      <>
        <AppBar />
        {loginFormOpen && <Login />}
        {loggedIn && <HomeContext />}
      </>
    ) : (
      <>
        <AppBar
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
        {props.loggedIn && <Home />}
      </>
    )}
  </>

  )
}

export default AuthSystem