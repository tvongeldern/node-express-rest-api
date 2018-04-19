const urlSlug = require('url-slug');
const camelcase = require('camelcase');

function constructorName(string) {
    return urlSlug(string, '_', 'titlecase').replace(/[^a-z0-9]/ig, '');
}

function model({ name }) {
    const schemaName = constructorName(name);
    return [
        `import { Schema } from 'mongoose';\n\n`,
        `const ${schemaName} = new Schema({\n\n});\n\n`,
        `const publicFields = {\n\n};\n\n`,
        `const adminFields = {\n\t...publicFields,\n};\n\n`,
        `export default {\n\tModel: ${schemaName},\n\tfields: {\n\t\t`,
        `public: publilcFields,\n\t\tadmin: adminFields,\n\t},\n};`,
    ].join('');
}

function controller({ name }) {
    const controllerName = camelcase(name);
    return [
        `import {  } from 'models';`,
        `export default function ${controllerName} () {\n\n}`,
    ].join('\n\n');
}

const argsMap = {
    GET: 'data, reference',
    PUT: 'data, reference',
    POST: 'data',
    DELETE: 'reference',
};

function endpoint({ name, method }) {
    const endpointName = camelcase(name);
    return [
        `import {  } from 'controllers';`,
        `function ${endpointName}({ ${argsMap[method]} }) {\n\n}`,
        `export default {\n\tmethod: '${method}',\n\thandler: ${endpointName},\n${method === 'GET' ? '\treference: true,\n' : ''}};`,
    ].join('\n\n');
}

module.exports = { model, controller, endpoint };
