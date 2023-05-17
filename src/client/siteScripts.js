const invegoButton = document.getElementById('invego');
const profile = document.getElementById('profile');
const logout = document.getElementById('logout');
const bittel = document.getElementById('account_balance');

import * as crud from './crud.js'

if (invegoButton) {
    invegoButton.addEventListener("click", async () => {
        window.location.href = "/page/discovery";
      });
}

if (profile) {
    profile.addEventListener('click', () => {
        window.location.href = "/page/userProfile";
    });
}

if (logout) {
    logout.addEventListener('click', () => {
        localStorage.removeItem("currentUser");
        window.location.href = "/page/login";
    });
}


const populateBittels = async () => {
    const user = await crud.readUser({ username: localStorage.getItem("currentUser") });
    const balance = user.bittels;
    bittel.innerText = `Balance: ${balance} Bittels`;
  }

if (bittel) {
    populateBittels();
}



