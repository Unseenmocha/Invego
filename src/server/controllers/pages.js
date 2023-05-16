import fs from 'fs';


export const getLogin = async (req, res) => {
    //read the html file
    const html = fs.readFileSync('src/client/html/login.html', 'utf8');

    //send the html file
    res.send(html);
}

export const getDiscovery = async (req, res) => {
    //read the html file
    const html = fs.readFileSync('src/client/html/discovery.html', 'utf8');
    
    //send the html file
    res.send(html);
}

export const getUserProfile = async (req, res) => {
    //read the html file
    const html = fs.readFileSync('src/client/html/userProfile.html', 'utf8');

    //send the html file
    res.send(html);
}

export const getBuySell = async (req, res) => {
    //read the html file
    const html = fs.readFileSync('src/client/html/buySellPage.html', 'utf8');

    //send the html file
    res.send(html);
}


