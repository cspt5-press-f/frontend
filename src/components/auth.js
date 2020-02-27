import axios from "axios";

export const login = (baseUrl, {username, password}) => {
    axios.post(`${baseUrl}/api/login/`, {
        username,
        password
    })
    .then((res)=>{
        console.log(res);
    })
    .catch((err)=>{
        console.log(err);
    })
}

export const register = (baseUrl, {username, password1, password2}) => {
    console.log("registering", username,password1,password2)
    axios.post(`${baseUrl}/api/registration/`, {
        username,
        password1,
        password2
    })
    .then((res)=>{
        console.log(res);
    })
    .catch((err)=>{
        console.log(err.message);
    });
}

