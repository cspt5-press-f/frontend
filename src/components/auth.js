import axios from "axios";

export const login = ({username, password}) => {
    axios.post("https://lambda-mud-test.herokuapp.com/api/login/", {
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

export const register = ({username, password1, password2}) => {
    console.log("registering", username,password1,password2)
    axios.post("https://lambda-mud-test.herokuapp.com/api/registration/", {
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

