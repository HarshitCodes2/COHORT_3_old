import React from 'react'
import { AuthContext } from "../context/AppContext"
import { useContext } from 'react';

const Login = (props) => {

  const context = useContext(AuthContext);

  let setLoggedIn = props.setLoggedIn;
  let setName = props.setName;
  let setLoginFormOpen = props.setLoginFormOpen;

  if (context) {
    // Destructure values from context if available
    ({ setLoggedIn, setName, setLoginFormOpen } = context);
  }

  function submitForm(){
    console.log("Form Submit");
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    console.log(`name : ${name}, email : ${email}, password : ${password}`); 
    
    if(name.length > 3 && email.length > 5 && password.length > 7){
      {
        setLoggedIn(true);
        setName(name);
        setLoginFormOpen(false);
      }
    }

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
  }

  return (
    <form className='login-form' onSubmit={(e) => {e.preventDefault(); submitForm()}}> 
      <div className='form-group'>
        <label>Name</label>
        <input type='text' id='name'></input>
        <label>Email</label>
        <input type='email' id='email'></input>
        <label>Password</label>
        <input type="password" id='password'></input>
      </div>
      <button type='submit'>Submit</button>
    </form>
  )
}

export default Login