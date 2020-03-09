import React, { useState } from "react";
import { login, register } from "./auth";
import { connect } from "react-redux";
import { addResponse } from "../redux/actions";
import Map from "./map";
import MovementButtons from "./MovementButtons";

function MainScreen(props) {
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
    "https://cspt5-f-mud-backend.herokuapp.com"
  );

  const loginChangeHandler = e => {
    //console.log("login change", loginDetails);
    

    setLoginDetails(
      Object.assign({}, loginDetails, { [e.target.name]: e.target.value })
    );
  };

  const registerChangeHandler = e => {
    //console.log("reg change", registerDetails);

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
    props.addResponse(await login(baseUrl, data));
  };

  const registerHandler = async (baseUrl, data) => {
    console.log("register data", data);

    props.addResponse(await register(baseUrl, data));
  };

  return (
    <div id="main-screen">
      <form>
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
      </form>
      <form>
        <h1>Login</h1>
        {`${baseUrl}/api/login/`}
        <br />
        <label>
          Name:
          <input
            type="text"
            name="username"
            onChange={loginChangeHandler}
            value={loginDetails.username}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            onChange={loginChangeHandler}
            value={loginDetails.password}
          />
        </label>
        <br />
        <button
          type="button"
          value="Submit"
          onClick={() => loginHandler(baseUrl, loginDetails)}
        >
          Login
        </button>
      </form>
      <br />
      <br />
      <form>
        <h1>Register</h1>
        {`${baseUrl}/api/registration/`}
        <br />
        <label>
          Name:
          <input
            type="text"
            name="username"
            onChange={registerChangeHandler}
            value={registerDetails.username}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password1"
            onChange={registerChangeHandler}
            value={registerDetails.password1}
          />
        </label>
        <br />
        <label>
          Confirm Password:
          <input
            type="password"
            name="password2"
            onChange={registerChangeHandler}
            value={registerDetails.password2}
          />
        </label>
        <br />
        <button
          type="button"
          value="Submit"
          onClick={() => registerHandler(baseUrl, registerDetails)}
        >
          Register
        </button>
      </form>
      <br /><br />
      {/*<Map baseUrl={baseUrl}/>*/}
      <MovementButtons />
    </div>
  );
}

export default connect(null, {addResponse})(MainScreen);
