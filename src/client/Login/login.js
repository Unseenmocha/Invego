import * as crud from '../crud.js';

const login = document.getElementById('login-button');
const signup = document.getElementById('signup-button');
const new_username = document.getElementById('create-username');
const pass_one = document.getElementById('create-password-1');
const pass_two = document.getElementById('create-password-2');

login.addEventListener('click', () => {
    const username = document.getElementById('user').value;
    const password = document.getElementById('pass').value;
    const data = crud.readUser(username, password);
    //console.log(data);
    if(data.password === password){
    } else {
        alert("Login failed, Please double check your username and password");
    }
   // window.location.href = "../Discovery/discovery.html";
});

signup.addEventListener('click', async () => {
    if(pass_one.value !== pass_two.value){
        alert("Passwords do not match");
        return;
    } else {
        const data = crud.createUser(new_username.value, pass_one.value);
        return;
    }
});