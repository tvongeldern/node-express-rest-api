import { wingDing } from 'controllers';
// import { fooBar } from 'wing-ding/controller'; // would also work

function helloWorld({ data, myParamName }) {
	console.log('request query', data);
	console.log('my param value', `"${myParamName}"`);
	return wingDing.fooBar();
}

export default {
	method: 'GET',
	handler: helloWorld,
	reference: 'myParamName',
};
