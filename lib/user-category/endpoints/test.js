// THIS IS A TEST ENDPOINT THAT RETURNS A HELLO WORLD OBJECT
// CREATED TO TEST API AND INDEX FILE STRUCTURE
const { userCategory } = require('../../controllers');

function userCategoryEndpointsTest({ data, reference }) {
    return userCategory.helloWorld();
}

module.exports = {
    method: 'GET',
    handler: userCategoryEndpointsTest,
};
