import { Schema } from 'mongoose';

const ButtHeads = new Schema({

});

const publicFields = {

};

const adminFields = {
	...publicFields,
};

export default {
	Model: ButtHeads,
	fields: {
		public: publilcFields,
		admin: adminFields,
	},
};