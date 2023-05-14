import * as crud from '../crud.js';

const login = document.getElementById('login-button');
const signup = document.getElementById('signup-button');
const new_username = document.getElementById('create-username');
const pass_one = document.getElementById('create-password-1');
const pass_two = document.getElementById('create-password-2');

login.addEventListener('click', async () => {
    console.log("clicked login");
    const username = document.getElementById('user').value;
    const password = document.getElementById('pass').value;
    await crud.login(username, password);
});

signup.addEventListener('click', async () => {
    if(pass_one.value !== pass_two.value){
        alert("Passwords do not match");
        return;
    } else if (pass_one.value === pass_two.value && pass_one.value !== "" && pass_two.value !== "") {
        const user = crud.getSampleStockObject();
        user.username = new_username.value;
        user.password = pass_one.value;
        crud.createUser(user);
        window.location.href = "../Discovery/discovery.html";
        return;
    }

});