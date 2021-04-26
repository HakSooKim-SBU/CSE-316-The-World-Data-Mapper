const { model, Schema, ObjectId } = require('mongoose');

const regionSchema = new Schema(
    {
        _id: {
            type: ObjectId,
            required: true
        },
        owner: {
            type: String,
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
        top:{
            type: Boolean,
            required: true
        },
    },
    { timestamps: true }
);
    regionSchema.add({
    subRegion:{
    type: [regionSchema]
    }
});
const Region = model('Region', regionSchema);
module.exports = Region;

