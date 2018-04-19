import { Schema } from 'mongoose';

const WingDing = new Schema({

});

const publicFields = {

};

const adminFields = {
	...publicFields,
};

export default {
	Model: WingDing,
	fields: {
		public: publilcFields,
		admin: adminFields,
	},
};