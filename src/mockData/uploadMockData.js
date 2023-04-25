let db1Old = new PouchDB("users");
let db2Old = new PouchDB("portfolios");


const xhr = new XMLHttpRequest();
xhr.open('GET', '../../mockData/USER_MOCK_DATA.json');
xhr.responseType = 'json';
xhr.onload = async () => {
    const data = xhr.response;
    await db1Old.destroy();
    //await db2Old.destroy();
    let db1 = new PouchDB("users");
    //let db2 = new PouchDB("portfolios");
    await db1.bulkDocs(data).then(result => {
        console.log('Bulk upload successful:', result);
    }).catch(error => {
        console.error('Bulk upload error:', error);
    });
};
xhr.send();

