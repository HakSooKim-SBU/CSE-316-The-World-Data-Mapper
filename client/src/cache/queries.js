import { gql } from "@apollo/client";

export const GET_DB_USER = gql`
	query GetDBUser {
		getCurrentUser {
			_id
			name
			email
			password
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

export const GET_REGION_BYID = gql`
	query GetRegionById($regionId: String!) {
		getRegionById(regionId : $regionId) {
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
export const GET_SUBREGION_LANDMARK_BYID = gql`
	query GetSubRegionLandmarkById($regionId: String!) {
		getSubRegionLandmarkById(regionId : $regionId) 		
	} 
`;

