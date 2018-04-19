const inquirer = require('inquirer');
const fs = require('fs');

const build = require('./builders/endpoint');

const PROJECT_ROOT = __dirname + '/../';
const LIB_DIR = PROJECT_ROOT + 'lib';

const existingGroupsWithEndpoints = fs.readdirSync(LIB_DIR).filter((filename) => {
    if (filename.includes('.')) {
        return false;
    }
    if (fs.readdirSync(`${LIB_DIR}/${filename}`).includes('endpoints')) {
        return true;
    }
});

function validateEndpointName(name, { group }) {
    if (fs.readdirSync(`${LIB_DIR}/${group}/endpoints`).map(fn => fn.split('.')[0]).includes(name)) {
        return `Endpoint name ${name} is already taken!`;
    }
    if (/^[a-z0-9\-]{3,}$/g.test(name)) {
        return true;
    }
    return 'Endpoint names must be at least 3 characters long and contain only lower-case letters, numbers, and hyphens';
}

const questions = [
    {
        name: 'group',
        message: 'To which group is this endpoint being added?',
        type: 'list',
        choices: existingGroupsWithEndpoints,
    },
    {
        name: 'name',
        message: 'What would you like to name your endpoint?',
        type: 'input',
        validate: validateEndpointName,
    },
    {
        name: 'method',
        message: 'What method will this endpoint use?',
        type: 'list',
        choices: [ 'GET', 'PUT', 'POST', 'DELETE' ],
    },
];

inquirer.prompt(questions).then(build);
