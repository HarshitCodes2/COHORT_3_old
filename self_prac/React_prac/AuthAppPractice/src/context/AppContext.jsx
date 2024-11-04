import { useState, createContext } from "react";

export const AuthContext = createContext();

function AppContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginFormOpen, setLoginFormOpen] = useState(false);
  const [name, setName] = useState("");
  const [toggleAuth, setToggleAuth] = useState(props.toggleAuthRecieved);

  return (
    <AuthContext.Provider value={{
      loggedIn, setLoggedIn,
      loginFormOpen, setLoginFormOpen,
      name, setName,
      toggleAuth, setToggleAuth
    }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AppContextProvider;