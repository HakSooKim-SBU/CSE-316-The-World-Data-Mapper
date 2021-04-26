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
        owner
        name
        capital
		leader
        flag 
        landmark
        parentRegion_id
        top
		}
	}
`;

export const GET_SUBREGIONS_BYID = gql`
	query GetSubRegionsById($regionId: String!) {
		getSubRegionsById(regionId : $regionId) {
		_id
        owner
        name
        capital
		leader
        flag 
        landmark
        parentRegion_id
        top
		}
	}
`;


