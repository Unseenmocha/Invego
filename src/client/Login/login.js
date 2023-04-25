import * as crud from '../crud.js';
import {closeSignUp} from './displaySignup.js';

const login = document.getElementById('login-button');
const signup = document.getElementById('signup-button');
const new_username = document.getElementById('create-username');
const pass_one = document.getElementById('create-password-1');
const pass_two = document.getElementById('create-password-2');

login.addEventListener('click', async () => {
    const username = document.getElementById('user').value;
    const password = document.getElementById('pass').value;
    const user = await crud.login(username, password);
    console.log(user);
    if(user){
        window.location.href = "../Discovery/discovery.html";
    } else {
        alert("Login failed, Please double check your username and password");
    }
   // window.location.href = "../Discovery/discovery.html";
});

signup.addEventListener('click', async () => {
    if(pass_one.value !== pass_two.value){
        alert("Passwords do not match");
        return;
    } else if (pass_one.value === pass_two.value && pass_one.value !== "" && pass_two.value !== "") {
        crud.createUser(new_username.value, pass_one.value);
        //closeSignUp();
        window.location.href = "../Discovery/discovery.html";
        return;
    }

});