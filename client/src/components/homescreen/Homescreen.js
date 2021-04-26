import React, { useState } 				from 'react';
import { useMutation, useQuery } 		from '@apollo/client';
import { WNavbar, WSidebar, WNavItem } 	from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WLSide, WCard, WCContent, WCMedia } from 'wt-frontend';
import * as mutations 					from '../../cache/mutations';
import * as queries				from '../../cache/queries';


import MapSelectionContent				from '../main/MapSelectionContent'
import Login 							from '../modals/Login';
import NavbarOptions 					from '../navbar/NavbarOptions';
import CreateAccount 					from '../modals/CreateAccount';
import Logo 							from '../navbar/Logo';



const Homescreen = (props) => {
	const auth = props.user === null ? false : true;
	let subMaps = []; // Maps
	let subRegions = [];	// 
	const [activeRegion, setActiveRegion] = useState({});
	const [activeMap, setActiveMap]			= useState({});
	const [showCreate, toggleShowCreate] 	= useState(false);
	const [showLogin, toggleShowLogin] 		= useState(false);

	const [AddRegion] 		= useMutation(mutations.ADD_REGION);
	const [RenameMap] 		= useMutation(mutations.RENAME_MAP);
	const [DeleteMap] 		= useMutation(mutations.DELETE_MAP);


	const { loading: loadingRootRegion, error: errorRootRegion, data: dataRootRegion , refetch } = useQuery(queries.GET_ROOT_REGIONS_BY_USERID);
	if(loadingRootRegion) { console.log(loadingRootRegion); }
	if(errorRootRegion) { console.log(errorRootRegion); }
	if(dataRootRegion) { 
		for(let rootRegion of dataRootRegion.getRootRegionsByUserId) {
			subMaps.push(rootRegion)
		}
	}

	const {loading, error, data}  = useQuery(queries.GET_SUBREGIONS_BYID, {variables: { regionId: activeRegion._id },});
	if(loading) { console.log(loading, 'loading'); }
	// if(error) { console.log(error, 'error'); }
	if(data) { 
		for(let subRegion of data.getSubRegionsById) {
			subRegions.push(subRegion)
		}
	}



	const addMap = async (mapName) => {
		let userId = props.user._id;
		const newMap = {
			_id: '',
			owner: userId,
			name: mapName,
			capital: "NO CAPITAL",
        	leader: "NO LEADER",
        	flag: "NO FLAG",
        	landmark: [],
        	parentRegion_id: "NO PARENT",
        	top: true,
			subRegion : []
		};
		const { data } = await AddRegion({ variables: { region:newMap}, refetchQueries: [{ query: queries.GET_ROOT_REGIONS_BY_USERID }] });
	};

	const renameMap = async (regionId, newName) =>{
		const { data } = await RenameMap({ variables: { regionId:regionId, newName:newName}, refetchQueries: [{ query: queries.GET_ROOT_REGIONS_BY_USERID }] });
	}

	const deleteMap = async (regionId, newName) =>{
		const { data } = await DeleteMap({ variables: { regionId:regionId}, refetchQueries: [{ query: queries.GET_ROOT_REGIONS_BY_USERID }] });
	}

	const selectMap = (selectedMap) =>{
		setActiveRegion(selectedMap)
		setActiveMap(selectedMap)
	}

	// if(loading) { console.log(loading, 'loading'); }
	// if(error) { console.log(error, 'error'); }
	// if(data) { 
	// 	// Assign todolists 
	// 	for(let todo of data.getAllTodos) {
	// 		todolists.push(todo)
	// 	}
	// 	// if a list is selected, shift it to front of todolists
	// 	if(activeList._id) {
	// 		let selectedListIndex = todolists.findIndex(entry => entry._id === activeList._id);
	// 		let removed = todolists.splice(selectedListIndex, 1);
	// 		todolists.unshift(removed[0]);
	// 	}
	// 	// create data for sidebar links
	// 	for(let todo of todolists) {
	// 		if(todo) {
	// 			SidebarData.push({_id: todo._id, name: todo.name});
	// 		}	
	// 	}
	// }


	const setShowLogin = () => {
		toggleShowCreate(false);
		toggleShowLogin(!showLogin);
	};

	const setShowCreate = () => {
		toggleShowLogin(false);
		toggleShowCreate(!showCreate);
	};


	let mainContents;
	console.log(typeof(activeMap));
	console.log(activeMap);

	if (auth && !activeMap._id){
		mainContents = 				
				<MapSelectionContent addMap={addMap} subMaps = {subMaps} renameMap = {renameMap}
				deleteMap = {deleteMap} selectMap = {selectMap}
				/>			
		}
	else if (auth && activeMap._id){
		mainContents = <div>Hello</div>
		}
	else if (!auth){
		mainContents = 
					<div class = "welcome">
						<img style = {{borderRadius: "30px"}} src={require('../image/Welcome Earth.png')}/>
						<div>
							Welcome To The World Data Mapper
						</div>
					</div>
					

	}

	// <img src={require('/Users/haksookim/Desktop/2021 Spring/CSE 316/HW4/CSE316-HW3-Spring21-Solution/client/src/components/image/Welcome Earth.png')}/>
	// class="fit-picture"

	return (
		<WLayout wLayout="header">
			<WLHeader>
				<WNavbar color="colored">
					<ul>
						<WNavItem>
							<Logo className='logo' />
						</WNavItem>
					</ul>
					<ul>
						<NavbarOptions
							
							fetchUser={props.fetchUser} auth={auth} 
							setShowCreate={setShowCreate} 	setShowLogin={setShowLogin}
						/>
					</ul>
				</WNavbar>
			</WLHeader>
			<WLMain>
				{mainContents}
			</WLMain>

			{
				showCreate && (<CreateAccount fetchUser={props.fetchUser} setShowCreate={setShowCreate} />)
			}

			{
				showLogin && (<Login fetchUser={props.fetchUser} setShowLogin={setShowLogin} refetch={refetch} />)
			}

		</WLayout>
	);
};

export default Homescreen;