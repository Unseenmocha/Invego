const invegoButton = document.getElementById('invego');
const profile = document.getElementById('profile');
const logout = document.getElementById('logout');

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
