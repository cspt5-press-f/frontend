import axios from "axios";

export const login = (baseUrl, {username, password}) => {
    return axios.post(`${baseUrl}/api/login/`, {
        username,
        password
    })
    .then((res)=>{
        console.log("login response", res);
        return res.status;
    })
    .catch((err)=>{
        console.log("login response error", err);
        return err.message;
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
        console.log(res);
        return res.status;
    })
    .catch((err)=>{
        console.log(err.message);
        return err.message;
    });
}

