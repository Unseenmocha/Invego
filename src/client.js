import * as crud from './crud.js';


const login = document.getElementById('login-button');
const signup = document.getElementById('signup-button');
const pass_one = document.getElementById('create-password-1');
const pass_two = document.getElementById('create-password-2');

login.addEventListener('click', async () => {
    const response = await crud.readAccount('test', 'test');
    
});

signup.addEventListener('click', async () => {
    if(pass_one.value !== pass_two.value) {
        alert('Passwords do not match');
        return;
    }
    else {
        const response = await crud.createAccount('test', pass_one.value);
        if(response.status === 200) {
            alert('Account created');
        }
        else {
            alert('Account creation failed');
        }
    }
});


