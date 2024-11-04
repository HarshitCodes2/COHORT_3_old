import React from 'react'
import { useContext } from 'react'
import { AuthContext } from "../context/AppContext"

const AppBar = (props) => {
  const context = useContext(AuthContext);
  
  let toggleAuth = false;
  let loggedIn = props.loggedIn;
  let name = props.name;
  let setLoggedIn = props.setLoggedIn;
  let setName = props.setName;
  let setLoginFormOpen = props.setLoginFormOpen;

  if (context) {
    // Destructure values from context if available
    ({ toggleAuth, loggedIn, name, setLoggedIn, setName, setLoginFormOpen } = context);
  }

  return (
    <div className='app-bar'>
      <h1 style={{display:"inline-block"}}>Auth System Demo</h1>
      <div className='user-section'>
        
        {
          toggleAuth ?
          (
          
            loggedIn ?
              (
                <>
                  <h2>Hello, {name}!</h2>
                  <button onClick={() => {setLoggedIn(false); setName("")}}>LogOut</button>
                </>
              )
            :
              (
                <>
                  <button onClick={() => setLoginFormOpen(prev => !prev)}>LogIn</button>
                </>
              )
            
          )
          :
          (
            props.loggedIn ? 
            (<><h2>Hello, {props.name}!</h2>
            <button onClick={() => {props.setLoggedIn(false); props.setName("")}}>LogOut</button></>) 
            : 
            (<button onClick={() => props.setLoginFormOpen(prev => !prev)}>LogIn</button>)
          )
        }
      </div>
    </div>
  )
}

export default AppBar