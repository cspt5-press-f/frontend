import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { login, register } from "./components/auth";

function App() {
  const [loginDetails, setLoginDetails ] = useState( {username:" ", password: ""});
  const [registerDetails, setRegisterDetails ] = useState( {username:" ", password1: "", password2: ""});
  
  const loginChangeHandler = (e) => {
    console.log("login change", loginDetails);
    
    setLoginDetails(Object.assign({},loginDetails, {[e.target.name]: e.target.value}));
  }

  const registerChangeHandler = (e) => {
    console.log("reg change", registerDetails);
    
    setRegisterDetails(Object.assign({},registerDetails, {[e.target.name]: e.target.value}));
  }

  const loginHandler = (data) => {

    console.log("login data", data);
    login(data);
  }

  const registerHandler = (data) => {
    console.log("register data", data);
    
    register(data);
  }

  return (
    <div className="App">
      <header className="App-header">
        <form>
          <h1>Login</h1>
          <label>
            Name:
            <input type="text" name="username" onChange={loginChangeHandler} value={loginDetails.username}/>
          </label><br />
          <label>
            Password:
            <input type="password" name="password" onChange={loginChangeHandler} value={loginDetails.password}/>
          </label>
          <button type="button" value="Submit" onClick={()=>loginHandler(loginDetails)}>Login</button>
        </form>
        <br /><br />
        <form>
          <h1>Register</h1>
          <label>
            Name:
            <input type="text" name="username" onChange={registerChangeHandler} value={registerDetails.username}/>
          </label><br />
          <label>
            Password:
            <input type="password" name="password1" onChange={registerChangeHandler} value={registerDetails.password1}/>
          </label><br />
          <label>
            Confirm Password:
            <input type="password" name="password2" onChange={registerChangeHandler} value={registerDetails.password2}/>
          </label><br />
          <button type="button" value="Submit" onClick={()=>registerHandler(registerDetails)}>Register</button>
        </form>
      </header>
    </div>
  );
}

export default App;
