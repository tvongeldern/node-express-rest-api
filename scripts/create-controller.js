const inquirer = require('inquirer');
const fs = require('fs');

const build = require('./builders/controller');

const PROJECT_ROOT = __dirname + '/../';
const LIB_DIR = PROJECT_ROOT + 'lib';

const existingGroupsWithControllers = fs.readdirSync(LIB_DIR).filter((filename) => {
    if (filename.includes('.')) {
        return false;
    }
    if (fs.readdirSync(`${LIB_DIR}/${filename}`).includes('controller')) {
        return true;
    }
});

function validateControllerName(name, { group }) {
    if (!/^[a-z0-9]+$/ig.test(name)) {
        return 'Controller name must be alphanumeric, convention is to use camel case.';
    }
    if (fs.readdirSync(`${LIB_DIR}/${group}/controller`).map(fn => fn.split('.')[0]).includes(name)) {
        return `Controller name ${name} is already taken!`;
    }
    return true;
}

const questions = [
    {
        name: 'group',
        message: 'Which controller would you like to add to?',
        type: 'list',
        choices: existingGroupsWithControllers,
    },
    {
        name: 'name',
        message: 'What would you like to name your controller function?',
        type: 'input',
        validate: validateControllerName,
    },
];

inquirer.prompt(questions).then(build);
