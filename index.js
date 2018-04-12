// EXPRESS SETUP
const express = require('express');
const app = express();

app.use(require('body-parser').json());

// IMPORTING ENDPOINTS
const { Endpoint } = require('./lib/constructors');
const endpointsModule = require('./lib/endpoints');

// DECLARING CONSTANTS
const PORT = 3000;
const apiVersion = require('./package').version.split('.').slice(0, -1).join('.');
const endpointGroups = Object.keys(endpointsModule);

// MOUNTING ENDPOINTS
console.log('\nMOUNTING ENDPOINTS...\n');

endpointGroups.forEach((endpointGroupName) => {
    const endpoints = endpointsModule[endpointGroupName];
    const endpointNames = Object.keys(endpoints);
    endpointNames.forEach((endpointName) => {
        const name = `${endpointGroupName}/${endpointName}`;
        const endpointModule = endpoints[endpointName];
        const endpoint = new Endpoint({...endpointModule, name });
        app[endpoint.method](`/${apiVersion}/${name}${endpoint.reference ? '/:reference' : ''}`, endpoint.handler);
    });
});

console.log('\nFinished mounting endpoints!\n');

// BOOTING API
app.listen(PORT, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log(`\nAPI version ${apiVersion} started on port ${PORT}\n`);
});
