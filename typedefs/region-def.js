const { gql } = require('apollo-server');

const typeDefs = gql `
    type Region {
        _id: String!
        owner: String!
        name: String!
        capital: String!
        leader: String!
        flag: String!
        landmark: [String]
        parentRegion_id: String!
        top: Boolean!
        subRegion: [Region]

    }
    extend type Query {
        getRootRegionsByUserId: [Region]
        getSubRegionsById(regionId : String!): [Region]
	}
    extend type Mutation {
        addRegion(region: regionInput!): String!
        renameMap(regionId: String!, newName: String!): Boolean
        deleteMap(regionId: String!): Boolean

    }
    input regionInput{
        _id: String
        owner: String
        name: String
        capital: String
        leader: String
        flag: String
        landmark: [String]
        parentRegion_id: String
        top: Boolean
        subRegion: [regionInput]
    }
`;

module.exports = { typeDefs: typeDefs }
// getRootRegionsByUserId(_id: String!): [Region]
// 