import React, { useState } from 'react';
import AuthSystem from './components/AuthSystem';
import AppContextProvider from './context/AppContext';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginFormOpen, setLoginFormOpen] = useState(false);
  const [name, setName] = useState("");
  const [toggleAuthShared, setToggleAuthShared] = useState(false);

  return (
    <>
      <div style={{ backgroundColor: "#25a5a6", padding: "10px", textAlign: "right" }}>
        <input
          style={{ height: "15px", width: "15px" }}
          onChange={(e) => setToggleAuthShared(e.target.checked)}
          type='checkbox'
        />
        <label style={{ marginLeft: "10px", fontSize: "1.25rem" }}>
          Context Api : {toggleAuthShared ? "On" : "Off"}
        </label>
      </div>
      {toggleAuthShared ? (
        <AppContextProvider toggleAuthRecieved={toggleAuthShared}>
          <AuthSystem />
        </AppContextProvider>
      ) : (
        <AuthSystem
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          loginFormOpen={loginFormOpen}
          setLoginFormOpen={setLoginFormOpen}
          name={name}
          setName={setName}
        />
      )}
    </>
  );
}

export default App;
