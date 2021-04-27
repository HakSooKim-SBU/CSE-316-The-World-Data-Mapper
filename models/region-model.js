const { model, Schema, ObjectId } = require('mongoose');

const regionSchema = new Schema(
    {
        _id: {
            type: ObjectId,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        capital: {
            type: String,
            required: true
        },
        leader: {
            type: String,
            required: true
        },
        flag: {
            type: String,
            required: true
        },
        landmark:{
	        type: [String],
	        required: true
    	},
        parentRegion_id: {
            type: String,
            requried: true
        }, 
        subRegion:{
            type: [String],
            requried: true
        },
        top:{
            type: Boolean,
            required: true
        },
    },
    { timestamps: true }
);
const Region = model('Region', regionSchema);
module.exports = Region;

