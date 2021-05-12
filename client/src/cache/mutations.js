import { gql } from "@apollo/client";

export const LOGIN = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			email 
			_id
			name
			password
		}
	}
`;

export const REGISTER = gql`
	mutation Register($email: String!, $password: String!, $name: String!) {
		register(email: $email, password: $password, name: $name) {
			email
			password
			name
		}
	}
`;
export const LOGOUT = gql`
	mutation Logout {
		logout 
	}
`;

export const UPDATE = gql`
	mutation UpdateAccount($email: String!, $password: String!, $name: String!) {
		updateAccount(email: $email, password: $password, name: $name) {
			email
			password
			name
		}
	}
`;


export const ADD_SUBREGION = gql`
	mutation AddSubRegion($region: regionInput!, $index: Int) {
		addSubRegion(region: $region, index: $index)
	}
`;


export const DELETE_SUBREGION = gql`
	mutation DeleteSubRegion($regionId: String!) {
		deleteSubRegion(regionId: $regionId)
	}
`;

export const MAKE_TOPMAP = gql`
	mutation MakeTopMap($regionId: String!) {
		makeTopMap(regionId: $regionId)
	}
`

export const UPDATE_SUBREGION_FIELD = gql`
	mutation UpdateSubRegionField($regionId: String!, $field: String!, $value: String!) {
		updateSubRegionField(regionId: $regionId, field:$field, value:$value )
	}
`

export const UPDATE_SUBREGION_SORT = gql`
	mutation UpdateSubRegionSort($regionId: String!, $field: String!, $value: [String]) {
		updateSubRegionSort(regionId: $regionId, field:$field, value:$value )
	}
`

export const CHANGE_PARENT_REGION = gql`
	mutation ChangeParentRegion($subRegionIdToMove: String!, $currentParentId: String!, $newParentId: String!) {
		changeParentRegion(subRegionIdToMove: $subRegionIdToMove, currentParentId:$currentParentId, newParentId:$newParentId )
	}
`
