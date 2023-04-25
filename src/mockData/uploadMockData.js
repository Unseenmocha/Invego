const uploadFileToDB = function(path, dbString) {
    const xhrUser = new XMLHttpRequest();
    xhrUser.open('GET', path);
    xhrUser.responseType = 'json';
    xhrUser.onload = async () => {
        const data = xhrUser.response;
        let dbOld = new PouchDB(dbString);
        await dbOld.destroy();
        let db = new PouchDB(dbString);
        await db.bulkDocs(data).then(result => {
            console.log('Bulk upload successful:', result);
        }).catch(error => {
            console.error('Bulk upload error:', error);
        });
    };
    xhrUser.send();
}

uploadFileToDB('../../mockData/USER_MOCK_DATA.json', 'users');
uploadFileToDB('../../mockData/PORTFOLIO_MOCK_DATA.json', 'portfolios');