import React, { useState } from "react";
import { login, register } from "./auth";
import { connect } from "react-redux";
import { addResponse } from "../redux/actions";
import Map from "./map";
import MovementButtons from "./MovementButtons";
import { Switch, Route, useHistory } from "react-router-dom";


function FormScreens(props) {
  const history = useHistory();
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: ""
  });
  const [registerDetails, setRegisterDetails] = useState({
    username: "",
    password1: "",
    password2: ""
  });
  
  const [baseUrl, setBaseUrl] = useState(
    "https://cspt5-f-mud-backend.herokuapp.com/"
  );

  const loginChangeHandler = e => {
    //console.log("login change", loginDetails);

    setLoginDetails(
      Object.assign({}, loginDetails, { [e.target.name]: e.target.value })
    );
  };

  const registerChangeHandler = e => {
    //console.log("reg change", registerDetails);
     
           if (e.target.name === 'password2' && e.target.name === 'password1'){
          
         document.getElementById('message').style.color = 'green';
    document.getElementById('message').innerHTML = 'matching'
      }
      else{
          document.getElementById('message').style.color = 'red';
    document.getElementById('message').innerHTML = 'not matching';
      }
    

    setRegisterDetails(
      Object.assign({}, registerDetails, { [e.target.name]: e.target.value })
    );
  };
 
  const urlChangeHandler = e => {
    console.log("Base url changed to ", baseUrl);
    setBaseUrl(e.target.value);
  };

  const loginHandler = async (baseUrl, data) => {
    console.log("login handler", data);
    await login(baseUrl, data);
    history.push("/");
  };

  const registerHandler = async (baseUrl, data) => {
    console.log("register data", data);

    await register(baseUrl, data);
    history.push("/");
  };

  return (
    <div id="user-landing">
      {/*<form>
        <h1>Base URL</h1>
        This will be the base url, and the login and registration will append
        "/api" to the requests.
        <br />
        <input
          type="text"
          name="base-url"
          value={baseUrl}
          style={{ width: "25vw" }}
          onChange={urlChangeHandler}
        />
      </form>*/}
      <Switch>
        <Route exact path="/login">
          <form className="userForms">
            <label>Name:</label>
            <input
              type="text"
              name="username"
              onChange={loginChangeHandler}
              value={loginDetails.username}
            />
            <br />
            <label>Password:</label>
            <input
              type="password"
              name="password"
              onChange={loginChangeHandler}
              value={loginDetails.password}
            />
            <br />
            <button
              type="button"
              value="Submit"
              onClick={() => loginHandler(baseUrl, loginDetails)}
            >
              Login
            </button>
          </form>
        </Route>

        <Route exact path="/registration">
          <form className="userForms">
            <label>Name:</label>
            <input
              type="text"
              name="username"
              onChange={registerChangeHandler}
              value={registerDetails.username}
            />
            <br />
            <label>Password:</label>
            <input
              type="password"
              name="password1"
              onChange={registerChangeHandler}
              value={registerDetails.password1}
            />
            <br />
            <label>Confirm Password:</label>
            <input
              type="password"
              name="password2"
              onChange={registerChangeHandler}
              value={registerDetails.password2}
            />
              <span id='message'></span>
            <br />
            <button
              type="button"
              value="Submit"
              onClick={() => registerHandler(baseUrl, registerDetails)}
            >
              Register
            </button>
          </form>
        </Route>
      </Switch>
      <br />
      <br />
      {/*<Map baseUrl={baseUrl}/> //... Not sure if we need this anymore*/}

      <br />
      <br />
    </div>
  );
}

export default connect(null, { addResponse })(FormScreens);