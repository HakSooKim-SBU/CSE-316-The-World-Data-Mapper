const ObjectId = require('mongoose').Types.ObjectId;
const Region = require('../models/region-model');

module.exports = {
	Query: {
		getRootRegionsByUserId: async (_, __, { req }) => {
			console.log("getting root regions");
			const _id = new ObjectId(req.userId);
			if(!_id) { return([])};
			const Regions = await Region.find({owner: _id});
			if(Regions) {
				return (Regions);
			}




		},
		getSubRegionsById: async (_, args) => {
			const { regionId } = args;
			const _id = new ObjectId(regionId);
			
			const subRegions = await Region.find({parentRegion_id: _id});

			if(subRegions) {
				return (subRegions);
			} 
		},
	},
	Mutation: {
		addRegion: async (_, args) => {
			const { region } = args;
			const objectId = new ObjectId();
			const { _id, owner , name,  capital, leader, flag, landmark, parentRegion_id, top} = region;
			const newRegion = new Region({
				_id: objectId,
				owner: owner,
				name: name,
				capital: capital,
				leader: leader,
				flag: flag,
				landmark: landmark,
				parentRegion_id: parentRegion_id,
				top: top,
				});
			console.log("trying2");
			const updated = await newRegion.save();
			if(updated) {
				console.log(objectId);
				return objectId._id;
			}
			else{
				console.log("failed");

			}
		},
		renameMap: async (_, args) => {
			const { regionId, newName } = args;
			const _id = new ObjectId(regionId);
			const updated = await Region.updateOne({_id: _id}, { name: newName });

			if(updated){
				console.log("successfully changed name to" + newName);
			}
			return updated.acknowledged
		},
		deleteMap: async (_, args) => {
			const {regionId} = args;
			const _id = new ObjectId(regionId);
			const deleted = await Region.deleteOne({_id: _id});
			if(deleted) return true;
			else return false;
		},

	}
}