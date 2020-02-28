import axios from "axios";

export const login = (baseUrl, {username, password}) => {
    return axios.post(`${baseUrl}/api/login/`, {
        username,
        password
    })
    .then((res)=>{
        console.log("login response", res);
        return JSON.stringify(Object.assign({request: "Login"},{statusText: res.statusText},res.data), null, 2);
    })
    .catch((err)=>{
        console.log("login response error", err);
        return JSON.stringify({request: "Login", message: err.message}, null, 2);
    })
}

export const register = (baseUrl, {username, password1, password2}) => {
    console.log("registering", username,password1,password2)
    return axios.post(`${baseUrl}/api/registration/`, {
        username,
        password1,
        password2
    })
    .then((res)=>{
        console.log("Register response", res);
        return JSON.stringify(Object.assign({request: "Register"},{statusText: res.statusText},res.data), null, 2);
    })
    .catch((err)=>{
        console.log("Register response error", err);
        return JSON.stringify(err.message, null, 2);
        return JSON.stringify({request: "Register", message: err.message}, null, 2);
    });
}

