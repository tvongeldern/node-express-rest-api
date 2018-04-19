const { appendFileSync, writeFileSync } = require('fs');
const templates = require('./defaults');

const PROJECT_ROOT = __dirname + '/../../';
const LIB_DIR = PROJECT_ROOT + 'lib';

function buildController({ name, group }) {
    const CONTROLLER = `${LIB_DIR}/${group}/controller`;
    writeFileSync(`${CONTROLLER}/${name}.js`, templates.controller({ name }));
    appendFileSync(`${CONTROLLER}/index.js`, `export ${name} from './${name}';`);
    console.log(`\nController ${group}/${name} created!\n`);
}

module.exports = buildController;
