const inquirer = require('inquirer');
const build = require('./builders/group');
const fs = require('fs');

const PROJECT_ROOT = __dirname + '/../';
const LIB_DIR = PROJECT_ROOT + 'lib';

const existingGroups = fs.readdirSync(LIB_DIR).map(fn => fn.split('.')[0]);

function validateGroupName(name) {
    if (existingGroups.includes(name)) {
        return 'Group name ' + name + ' is either prohibited or already taken';
    }
    if (/^[a-z0-9\-]{3,}$/g.test(name)) {
        return true;
    }
    return 'Group names must be at least 3 characters long and contain only lower-case letters, numbers, and hyphens';
}

const questions = [
        {
            name: 'name',
            message: 'What would you like to name this group?',
            type: 'input',
            validate: validateGroupName,
        },
        {
            name: 'controller',
            message: 'Would you like a controller for this group?',
            type: 'confirm',
        },
        {
            name: 'model',
            message: 'Would you like a model for this group?',
            type: 'confirm',
        },
        {
            name: 'endpoints',
            message: 'Would you like endpoints for this group?',
            type: 'confirm',
        },
];

inquirer.prompt(questions).then(build);
