import { gql } from "@apollo/client";

export const GET_DB_USER = gql`
	query GetDBUser {
		getCurrentUser {
			_id
			name
			email
		}
	}
`;

export const GET_ROOT_REGIONS_BY_USERID = gql`
	query GetRootRegionsByUserId {
		getRootRegionsByUserId {
		_id
        name
        capital
		leader
        flag 
        landmark
        parentRegion_id
		subRegion
        top
		}
	}
`;

export const GET_SUBREGIONS_BYID = gql`
	query GetSubRegionsById($regionId: String!) {
		getSubRegionsById(regionId : $regionId) {
		_id
        name
        capital
		leader
        flag 
        landmark
        parentRegion_id
        top
		subRegion
		}
	}
`;

export const GET_ROOTREGIONS_BYID = gql`
	query GetRootRegionsById($regionId: String!) {
		getRootRegionsById(regionId : $regionId) {
		_id
        name
        capital
		leader
        flag 
        landmark
        parentRegion_id
        top
		subRegion
		}
	}
`;

