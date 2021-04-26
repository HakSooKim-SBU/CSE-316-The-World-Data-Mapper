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

export const ADD_REGION = gql`
	mutation AddRegion($region: regionInput!) {
		addRegion(region: $region)
	}
`;

export const RENAME_MAP = gql`
	mutation RenameMap($regionId: String!, $newName: String!) {
		renameMap(regionId: $regionId, newName: $newName)
}
`;

export const DELETE_MAP = gql`
	mutation DeleteMap($regionId: String!) {
		deleteMap(regionId: $regionId)
}
`;




