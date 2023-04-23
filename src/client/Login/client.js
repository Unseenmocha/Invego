//import * as crud from '../../crud.js';

const login = document.getElementById('login-button');
const signup = document.getElementById('signup-button');
const pass_one = document.getElementById('create-password-1');
const pass_two = document.getElementById('create-password-2');

login.addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const data = await crud.readSomething(username, password);
    if(data.password === password){
        alert("Login successful");
    } else {
        alert("Login failed, Please double check your username and password");
    }
});

signup.addEventListener('click', () => {
    if(pass_one.value !== pass_two.value){
        alert("Passwords do not match");
        return;
    } else {
        
    }
});