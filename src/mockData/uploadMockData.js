const fs = require('fs'); // Node.js File System module
const mongoose = require('mongoose');

import { User } from '../server/models/users.js';
import { Portfolio } from '../server/models/portfolios.js';

const dotenv = require('dotenv');
dotenv.config({path: 'process.env'});

const usersFile = 'mockData/LunchRock_LLC-time-entries.json';
const portfoliosFile = 'mockData/Night_Owls_Inc-time-entries.json';

// Read the input JSON file
let users = JSON.parse(fs.readFileSync(usersFile));
let portfolios = JSON.parse(fs.readFileSync(portfoliosFile));


// Write the reformatted data to the output JSON file

//write files to the mockData folder if you wish
const writeFiles = () => {
    const lunchRockOutput = 'mockData/LunchRock_LLC-time-entries-reformatted.json';
    fs.writeFileSync(lunchRockOutput, JSON.stringify(users));

    const nightOwlsOutput = 'mockData/Night_Owls_Inc-time-entries-reformatted.json';
    fs.writeFileSync(nightOwlsOutput, JSON.stringify(portfolios));

    const onionTechOutput = 'mockData/Onion_Technology-time-entries-reformatted.json';
    fs.writeFileSync(onionTechOutput, JSON.stringify(onionTechData));

    const gizmoGramOutput = 'mockData/GizmoGram-time-entries-reformatted.json';
    fs.writeFileSync(gizmoGramOutput, JSON.stringify(gizmoGramData));
}

const timeEntries = mongoose.model('employeetimeentries', timeSchema);

//run to upload files to database
const uploadFilesToDB = async  () => {
    mongoose
    .connect(process.env.DB.toString(), { useNewUrlParser: true })
    .then(() => {
        console.log(`Database connected successfully`);
    })
    .catch((err) => console.log(err));
    mongoose.Promise = global.Promise;

    await timeEntries.deleteMany({});

    const allData = [...gizmoGramData, ...users, ...portfolios, ...onionTechData];
    await timeEntries.insertMany(allData);
    mongoose.disconnect();
};
uploadFilesToDB();