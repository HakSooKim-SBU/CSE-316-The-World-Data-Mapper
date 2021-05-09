const ObjectId = require('mongoose').Types.ObjectId;
const Region = require('../models/region-model');

module.exports = {
	Query: {
		getRegionById: async (_, args) => {
			console.log("getRegionById")
			const { regionId } = args;
			if(!regionId) { return };
			const _id = new ObjectId(regionId);
			let region = await Region.findOne({_id: _id});
			if(region) {
				console.log("getting region")
				return (region);
			} 
		},
		getSubRegionsById: async (_, args,{req}) => {
			console.log("getSubRegionsById")
			
			if(!req.userId){
				return [];
			}
			const { regionId } = args;
			const userId = new ObjectId(req.userId);
			if(!regionId) { return};
			const _id = new ObjectId(regionId);
			const subRegions = await Region.find({parentRegion_id: _id});
			if(subRegions) {
				if (_id.toString() == userId.toString() ){ 					// when getting regions
					subRegions.sort((a, b) => (a.top > b.top) ? -1: 1)
					return subRegions
				}
				else {	
					let parentRegion = await Region.findOne({_id: _id});
					let direction = parentRegion.subRegion;
					let sortedRegion = []
					for (let i = 0; i < direction.length; i++) {
						const index = subRegions.findIndex(item => item.id === direction[i]);
						sortedRegion.push(subRegions[index]);
					  }
					return sortedRegion
				}
			}
			return
		},
		getRootRegionsById:async (_, args,{req}) => {
			console.log("getRootRegionsById")

			const userId = new ObjectId(req.userId);
			const { regionId } = args;
			if (regionId == userId || !regionId){
				return []
			}
			let _id = new ObjectId(regionId);
			let region = await Region.findOne({_id: _id});
			rootRegions = [];
			rootRegions.push(region);
			console.log("getting rootRegions");
			while (true){
			if (region == null){
				return
			}
			let regionRootId = region.parentRegion_id;
			if (regionRootId == userId){
				// rootRegions.push(region);
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
		getSubRegionLandmarkById:async (_, args) => {
			console.log("getSubRegionLandmarkById")

			const {regionId} = args;
			const _id = new ObjectId(regionId);
			let region = await Region.findOne({_id: _id});

			let nodes = [];
			let queue = [];
			queue.unshift(region);
			while(queue.length != 0){
				let node = queue.shift();
				nodes.push(node);
				let subNodes = await Region.find({parentRegion_id: node._id});
				for (let i = 0; i < subNodes.length; i++){
					queue.push(subNodes[i]);
				}
			}
			let subRegionsLandmark = []
			for (let i = 0; i< nodes.length; i++){
				console.log("hi");

				for (let j = 0; j< nodes[i].landmark.length; j++){
					let str = nodes[i].landmark[j];
					if (i !== 0){
					str += " - ";
					str += nodes[i].leader;
					}
					subRegionsLandmark.push(str);
					console.log(str);

				}
			}
			return subRegionsLandmark;
			

			return nodes
		},
	},                                  
	Mutation: {
		addSubRegion: async (_, args,{req}) => {
			const userId = new ObjectId(req.userId);
			const { region, index } = args;
			const objectId = new ObjectId();
			let { _id, name,  capital, leader, flag, landmark, parentRegion_id, subRegion, top} = region;
			if (_id === ""){
				_id = objectId
			}			
			const newRegion = new Region({
				_id: _id,
				name: name,
				capital: capital,
				leader: leader,
				flag: flag,
				landmark: landmark,
				parentRegion_id: parentRegion_id,
				subRegion: subRegion,
				top: top,
				});
			if (parentRegion_id.toString() != userId.toString()){
				let parentRegion = await Region.findOne({_id: parentRegion_id});
				let parentRegionSubRegions = parentRegion.subRegion;

				if(index < 0) parentRegionSubRegions.push(newRegion._id);
				else parentRegionSubRegions.splice(index, 0, newRegion._id);
				let updatedParentRegion = await Region.updateOne({_id: parentRegion_id}, { subRegion: parentRegionSubRegions })
			}
			const updated = await newRegion.save();
			if(updated) {
				console.log("succefully added");
				return newRegion._id;
			}
			else{
				console.log("failed");
			}
		},
		deleteSubRegion: async (_, args,{req}) => {
			const {regionId} = args;
			const userId = new ObjectId(req.userId);

			const _id = new ObjectId(regionId);

			let region = await Region.findOne({_id: _id});
			if (region.parentRegion_id != userId){
				let parentRegion = await Region.findOne({_id: region.parentRegion_id});
				let parentRegionSubRegions = parentRegion.subRegion;
				parentRegionSubRegions = parentRegionSubRegions.filter(item => item !== _id.toString());
				let updatedParentRegion = await Region.updateOne({_id: region.parentRegion_id}, { subRegion: parentRegionSubRegions })
			} 
			const deleted = await Region.deleteOne({_id: _id});

			if(deleted) return true;
			else return false;
		},	
		makeTopMap: async  (_, args,{req}) => {
			const userId = new ObjectId(req.userId);
			const {regionId} = args;
			const _id = new ObjectId(regionId);
			const updateAllMapToFalseTop = await Region.updateMany({parentRegion_id: userId}, { top: false });
			const updateSelectedMapTrue = await Region.updateOne({_id: _id}, { top: true });
			if(updateSelectedMapTrue && updateAllMapToFalseTop) return true;
			else return false;
		},
		updateSubRegionField: async  (_, args) => {
			const {regionId, field, value} = args;
			const _id = new ObjectId(regionId);
			const updated = await Region.updateOne({_id: _id}, {[field] : value })
			if (updated)
				return true;
			else 
				return false;

		},
		updateSubRegionSort: async  (_, args) => {
			const {regionId, field, value} = args;
			const _id = new ObjectId(regionId);
			const updated = await Region.updateOne({_id: _id}, {[field] : value })
			if (updated)
				return true;
			else 
				return false;

		},

	}
}