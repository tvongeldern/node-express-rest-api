const express = require('express');

const { Endpoint } = require('./lib/constructors');
const endpointsModule = require('./lib/endpoints');

const apiVersion = require('./package').version.split('.').slice(0, -1).join('.');
const PORT = 3000;

const app = express();
const endpointGroups = Object.keys(endpointsModule);

console.log('\nMOUNTING ENDPOINTS...\n');

endpointGroups.forEach((endpointGroupName) => {
    const endpoints = endpointsModule[endpointGroupName];
    const endpointNames = Object.keys(endpoints);
    endpointNames.forEach((endpointName) => {
        const name = `${endpointGroupName}/${endpointName}`;
        const endpointModule = endpoints[endpointName];
        const endpoint = new Endpoint({...endpointModule, name });
        app[endpoint.method](`/${apiVersion}/${name}`, endpoint.handler);
    });
});

console.log('\nFinished mounting endpoints!\n');

app.listen(PORT, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log(`API version ${apiVersion} started on port ${PORT}`);
});
