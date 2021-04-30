const ObjectId = require('mongoose').Types.ObjectId;
const Region = require('../models/region-model');

module.exports = {
	Query: {
		getRootRegionsByUserId: async (_, __, { req }) => {
			console.log("getting root regions");
			const _id = new ObjectId(req.userId);
			if(!_id) { return([])};
			const Regions = await Region.find({parentRegion_id: _id});
			if(Regions) {
				return (Regions);
			}

		},
		getSubRegionsById: async (_, args) => {
			const { regionId } = args;
			if (regionId == "" ){
				return
			}
			const _id = new ObjectId(regionId);

			const subRegions = await Region.find({parentRegion_id: _id});
			if(subRegions) {
				return (subRegions);
			} 
		},
		getRootRegionsById:async (_, args,{req}) => {
			const userId = new ObjectId(req.userId);

			const { regionId } = args;
			if (regionId == userId ){
				return []
			}
			else if (regionId == ""){
				return 
			}
			
			console.log(regionId + "!")
			let _id = new ObjectId(regionId);
			console.log(_id + "?")

			let region = await Region.findOne({_id: _id});
			console.log(region)

			rootRegions = [];
			rootRegions.push(region);
			while (true){
			let regionRootId = region.parentRegion_id;
			if (regionRootId == userId){
				rootRegions.push(region);
				break;
			}
			let rootRegion = await Region.findOne({_id: regionRootId});
			rootRegions.push(rootRegion);
			region = rootRegion;
			}
			if(rootRegions) {
				return (rootRegions.reverse());
			} 
		},
	},                                  
	Mutation: {
		addRegion: async (_, args,{req}) => {
			const userId = new ObjectId(req.userId);

			const { region } = args;
			const objectId = new ObjectId();
			const { _id, name,  capital, leader, flag, landmark, parentRegion_id, subRegion, top} = region;
			console.log("ready?")
			const newRegion = new Region({
				_id: objectId,
				name: name,
				capital: capital,
				leader: leader,
				flag: flag,
				landmark: landmark,
				parentRegion_id: parentRegion_id,
				subRegion: subRegion,
				top: top,
				});
			console.log(userId + "!!!!")
			console.log(parentRegion_id)
			if (parentRegion_id != userId){
				let parentRegion = await Region.findOne({_id: parentRegion_id});
				console.log(parentRegion);
				let parentRegionSubRegions = parentRegion.subRegion;
				parentRegionSubRegions.push(objectId);
				let updatedParentRegion = await Region.updateOne({_id: parentRegion_id}, { subRegion: parentRegionSubRegions })
			}
			const updated = await newRegion.save();
			if(updated) {
				console.log("succefully added");
				return objectId._id;
			}
			else{
				console.log("failed");
			}
		},
		renameRegion: async (_, args) => {
			const { regionId, newName } = args;
			const _id = new ObjectId(regionId);
			const updated = await Region.updateOne({_id: _id}, { name: newName });

			if(updated){
				console.log("successfully changed name to" + newName);
			}
			return updated.acknowledged
		},
		deleteRegion: async (_, args) => {
			const {regionId} = args;
			const _id = new ObjectId(regionId);
			const deleted = await Region.deleteOne({_id: _id});
			if(deleted) return true;
			else return false;
		},

	}
}