const express = require('express');
const app = express();

const { Endpoint } = require('./lib/constructors');
const endpointsModule = require('./lib/endpoints');

const endpointGroups = Object.keys(endpointsModule);
const apiVersion = '0.0';

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

app.listen(3000, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('app listening on 3000');
});
