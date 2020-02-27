import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { login, register } from "./components/auth";

function App() {
  const [loginDetails, setLoginDetails ] = useState( {username:" ", password: ""});
  const [registerDetails, setRegisterDetails ] = useState( {username:" ", password1: "", password2: ""});
  const [baseUrl, setBaseUrl] = useState("https://lambda-mud-test.herokuapp.com");
  
  const loginChangeHandler = (e) => {
    console.log("login change", loginDetails);
    
    setLoginDetails(Object.assign({},loginDetails, {[e.target.name]: e.target.value}));
  }

  const registerChangeHandler = (e) => {
    console.log("reg change", registerDetails);
    
    setRegisterDetails(Object.assign({},registerDetails, {[e.target.name]: e.target.value}));
  }

  const urlChangeHandler = (e) => {
    console.log("Base url changed to ", baseUrl);
    setBaseUrl(e.target.value);
  }

  const loginHandler = (baseUrl, data) => {

    console.log("login data", data);
    login(baseUrl, data);
  }

  const registerHandler = (baseUrl, data) => {
    console.log("register data", data);
    
    register(baseUrl, data);
  }

  return (
    <div className="App">
      <header className="App-header">
        <form>
          <h1>Base URL</h1>
          This will be the base url, and the login and registration will append "/api" to the requests.<br />
          <input type="text" name="base-url" value={baseUrl} style={{width: "25vw"}}/>
        </form>
        <form>
          <h1>Login</h1>
          {`${baseUrl}/api/login/`}<br />
          <label>
            Name:
            <input type="text" name="username" onChange={loginChangeHandler} value={loginDetails.username}/>
          </label><br />
          <label>
            Password:
            <input type="password" name="password" onChange={loginChangeHandler} value={loginDetails.password}/>
          </label>
          <button type="button" value="Submit" onClick={()=>loginHandler(baseUrl, loginDetails)}>Login</button>
        </form>
        <br /><br />
        <form>
          <h1>Register</h1>
          {`${baseUrl}/api/registration/`}<br />
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
          <button type="button" value="Submit" onClick={()=>registerHandler(baseUrl, registerDetails)}>Register</button>
        </form>
      </header>
    </div>
  );
}

export default App;
