const camelcase = require('camelcase');
const { appendFileSync, writeFileSync } = require('fs');
const templates = require('./defaults');

const PROJECT_ROOT = __dirname + '/../../';
const LIB_DIR = PROJECT_ROOT + 'lib';

function buildEndpoint({ group, method, name }) {
    const ENDPOINTS = `${LIB_DIR}/${group}/endpoints`;
    writeFileSync(`${ENDPOINTS}/${name}.js`, templates.endpoint({ name, method }));
    appendFileSync(`${ENDPOINTS}/index.js`, `export ${camelcase(name)} from './${name}';`);
    console.log(`\nEndpoint ${group}/${name} created!\n`);
}

module.exports = buildEndpoint;
