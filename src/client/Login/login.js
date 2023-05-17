import * as crud from '../crud.js';

const login = document.getElementById('login-button');
const signup_elem = document.getElementById('signup-button');
const new_username = document.getElementById('create-username');
const pass_one = document.getElementById('create-password-1');
const pass_two = document.getElementById('create-password-2');
const first = document.getElementById('create-first-name');
const last = document.getElementById('create-last-name');

login.addEventListener('click', async () => {
    console.log("clicked login");
    const username = document.getElementById('user').value;
    const password = document.getElementById('pass').value;
    await crud.login(username, password);
});

signup_elem.addEventListener('click', async () => {

    if(pass_one.value !== pass_two.value){
        alert("Passwords do not match.");
        return;
    } else if ([first, last, pass_one, new_username].every(elem=>{
        let valid = elem.value !== '';
        if (valid) {
            return true;
        } else {
            alert(`Please enter ${elem.placeholder}.`)
            return false;
        }
    })) {
        await crud.signup(new_username.value, pass_one.value, first.value, last.value);
        window.location.href = "http://localhost:5000/page/discovery";
    }

});