// THIS IS A TEST ENDPOINT THAT RETURNS A HELLO WORLD OBJECT
// CREATED TO TEST API AND INDEX FILE STRUCTURE
const { fooBar } = require('../../controllers');

function userCategoryEndpointsTest({ data, reference }) {
    console.log('request query: ', data);
    console.log('request param: ', reference || 'N/A');
    return fooBar.helloWorld();
}

module.exports = {
    method: 'GET',
    handler: userCategoryEndpointsTest,
    reference: true,// MAKES ENDPOINT REQUIRE A PARAM
};
