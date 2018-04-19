# node-express-rest-api
Base structure for a RESTFUL Node/Express API

# module structure
Modules are grouped by area of concern- groups will usually have a model, controller, and endpoints although not every group has all 3 of those

Structure looks like:
library
    - group
        - controller
        - endpoints
        - model

# scaffolding commands
To build a new endpoint in an existing group: `npm run create-endpoint`;
To build a new controller function: `npm run create-controller`;
To build a new group: `npm run create-group`

# RESTful endpoints
Endpoint handlers will take in arguments in a de-structured object. This object will have several attributes, based on the request's METHOD

`data`: Depending on the request method, this is either the request body (PUT, POST) or the request query (GET)
`reference`: This is the param appended to the endpoint. Not available for POST requests, can be toggled for GET requests by adding/removing `reference` field to the module exports

# Running example API
After pulling the repository down and installing the dependencies, you can start up the example API as-is using `npm start`

In your browser, you can hit endpoint `http://localhost:3000/0.0/wing-ding/hello-world?query=true&rest=AWESOME`

You should get a response from the endpoint and see the query data logged in your console.
