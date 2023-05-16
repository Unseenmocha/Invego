const invegoButton = document.getElementById('invego');
const profile = document.getElementById('profile');
const logout = document.getElementById('logout');

if (invegoButton) {
    invegoButton.addEventListener("click", async () => {
        window.location.href = "http://localhost:5000/page/discovery";
      });
}

if (profile) {
    profile.addEventListener('click', () => {
        window.location.href = "http://localhost:5000/page/userProfile";
    });
}

if (logout) {
    logout.addEventListener('click', () => {
        localStorage.removeItem("currentUser");
        window.location.href = "http://localhost:5000/page/login";
    });
}
