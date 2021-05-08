const { gql } = require('apollo-server');

const typeDefs = gql `
    type Region {
        _id: String!
        name: String!
        capital: String!
        leader: String!
        flag: String!
        landmark: [String]
        parentRegion_id: String!
        top: Boolean!
        subRegion: [String]
    }
    extend type Query {
        getRegionById(regionId : String!): Region
        getSubRegionsById(regionId : String!): [Region]
        getRootRegionsById(regionId : String!): [Region]
	}
    extend type Mutation {
        addRegion(region: regionInput!): String!
        renameRegion(regionId: String!, newName: String!): Boolean
        deleteRegion(regionId: String!): Boolean
        makeTopMap(regionId: String!): Boolean
        updateSubRegionField(regionId: String!, field: String!, value: String! ): Boolean
        updateSubRegionSort(regionId: String!, field: String!, value: [String] ): Boolean

    }
    input regionInput{
        _id: String!
        name: String!
        capital: String!
        leader: String!
        flag: String!
        landmark: [String]
        parentRegion_id: String!
        top: Boolean
        subRegion: [String]
    }
`;

module.exports = { typeDefs: typeDefs }
