const camelcase = require('camelcase');
const urlSlug = require('url-slug');
const { appendFileSync, mkdirSync, writeFileSync } = require('fs');

const templates = require('./defaults');

const PROJECT_ROOT = __dirname + '/../../';
const LIB_DIR = PROJECT_ROOT + 'lib/';
const GLOBAL_CONTROLLERS_INDEX = LIB_DIR + 'controllers.js';
const GLOBAL_ENDPOINTS_INDEX = LIB_DIR + 'endpoints.js';
const GLOBAL_MODELS_INDEX = LIB_DIR + 'models.js';

function constructorName(string) {
    return urlSlug(string, '_', 'titlecase').replace(/[^a-z0-9]/ig, '');
}

function buildGroup({ name, controller, model, endpoints }) {

    const GROUP_DIR = LIB_DIR + name;
    const MODEL = GROUP_DIR + '/model.js';
    const CONTROLLER_DIR = GROUP_DIR + '/controller';
    const CONTROLLER_INDEX = CONTROLLER_DIR + '/index.js';
    const ENDPOINTS_DIR = GROUP_DIR + '/endpoints';
    const ENDPOINTS_INDEX = ENDPOINTS_DIR + '/index.js';

    mkdirSync(GROUP_DIR);
    if (model) {
        writeFileSync(MODEL, templates.model({ name }));
        appendFileSync(GLOBAL_MODELS_INDEX, `export ${constructorName(name)} from '${name}/model';`);
    }
    if (controller) {
        mkdirSync(CONTROLLER_DIR);
        writeFileSync(CONTROLLER_INDEX, '');
        appendFileSync(GLOBAL_CONTROLLERS_INDEX, `export * as ${camelcase(name)} from '${name}/controller';`);
    }
    if (endpoints) {
        mkdirSync(ENDPOINTS_DIR);
        writeFileSync(ENDPOINTS_INDEX, '');
        appendFileSync(GLOBAL_ENDPOINTS_INDEX, `export * as ${camelcase(name)} from '${name}/endpoints';`);
    }
    console.log(`\nGroup ${name} successfully built!\n`);

}

module.exports = buildGroup;
