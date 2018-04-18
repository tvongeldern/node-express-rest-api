const camelcase = require('camelcase');
const { mkdirSync, writeFileSync } = require('fs');

const templates = require('./defaults');

const PROJECT_ROOT = __dirname + '/../../';
const LIB_DIR = PROJECT_ROOT + 'lib/';
const CONTROLLERS_INDEX = LIB_DIR + 'controllers.js';
const ENDPOINTS_INDEX = LIB_DIR + 'endpoints.js';
const MODELS_INDEX = LIB_DIR + 'models.js';

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
    }
    if (controller) {
        mkdirSync(CONTROLLER_DIR);
        writeFileSync(CONTROLLER_INDEX, '');
    }
    if (endpoints) {
        mkdirSync(ENDPOINTS_DIR);
        writeFileSync(ENDPOINTS_INDEX, '');
    }
}

module.exports = buildGroup;
