import { getBittels } from './getInfo.js';

function header() {
    const headerID = document.getElementById("header");
    const headerLeftContent = '<div class="header-left"><a href="#">Invego</a></div>';
    const headerBittels = `<div class="header-right"><span class="bittels-text">Bittels:</span> <span class="bittels-text">${getBittels()}</span></div>`;
    const headerContent = `<div class="App-header">${headerLeftContent}${headerBittels}</div>`;
    headerID.innerHTML = headerContent;
}

export default header(); 

