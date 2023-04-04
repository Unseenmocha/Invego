import { getBittels } from './getInfo.js';

function header() {
    const headerID = document.getElementById("header");
    const headerLeftContent = '<div class="header-left"><a href="#">Invego</a></div>';
    const headerBittels = `<div class="header-right"><span class="bittels-label">Bittels:</span> <span class="bittels-value">${getBittels()}</span></div>`;
    const headerContent = `<div class="App-header">${headerLeftContent}${headerBittels}</div>`;
    headerID.innerHTML = headerContent;
}

// function getProfileName() {
//     const profileName = "Noah Lupo";
//     return profileName;
// }

export default header(); 
// export default { header };
