import React, { useState } 				from 'react';
import { useMutation, useQuery } 		from '@apollo/client';
import { WNavbar, WNavItem } 	from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WLSide, WCard, WCContent, WCMedia } from 'wt-frontend';
import * as mutations 					from '../../cache/mutations';
import * as queries				from '../../cache/queries';


import RegionSpreadSheet				from '../main/RegionSpreadSheet'
import MapSelectionContent				from '../main/MapSelectionContent'
import Login 							from '../modals/Login';
import NavbarOptions 					from '../navbar/NavbarOptions';
import CreateAccount 					from '../modals/CreateAccount';
import Logo 							from '../navbar/Logo';
import UpdateAccount 					from '../modals/UpdateAccount';
import RegionViewer				from '../main/RegionViewer'

import { PromiseProvider } from 'mongoose';



const Homescreen = (props) => {
	const auth = props.user === null ? false : true;
	let subRegions = [];
	let activeRegionId = "";
	const [activeRegion, setActiveRegion] = useState({});
	const [showCreate, toggleShowCreate] 	= useState(false);
	const [showLogin, toggleShowLogin] 		= useState(false);
	const [showUpdate, toggleShowUpdate] 	= useState(false);


	const [showViwer, toggleShowViewer] 	= useState(true);// erase later



	const [AddRegion] 		= useMutation(mutations.ADD_REGION);
	const [RenameRegion] 		= useMutation(mutations.RENAME_REGION);
	const [DeleteRegion] 		= useMutation(mutations.DELETE_REGION);

	if (!activeRegion._id && auth){
		activeRegionId = props.user._id;
	}
	else if (activeRegion._id && auth){
		activeRegionId = activeRegion._id;
	}

	const {loading, error, data, refetch}  = useQuery(queries.GET_SUBREGIONS_BYID, {variables: { regionId: activeRegionId }});
	if(loading) { console.log(loading, 'loading'); }
	if(error) { console.log(error, 'error'); }
	if(data && data.getSubRegionsById !== null) { 
		for(let subRegion of data.getSubRegionsById) {
			subRegions.push(subRegion)
		}
	}

	const addMap = async (mapName) => {
		let userId = props.user._id;
		const newMap = {
			_id: '',
			name: mapName,
			capital: "NO CAPITAL",
        	leader: "NO LEADER",
        	flag: "NO FLAG",
        	landmark: [],
        	parentRegion_id: userId,
        	top: true,
			subRegion : []
		};
		// const { data } = await AddRegion({ variables: { region:newMap}, refetchQueries: [{ query: queries.GET_SUBREGIONS_BYID,{variables: { regionId: activeRegionId }} }] });
		const { data } = await AddRegion({ variables: { region:newMap} });
		refetch({ variables: { regionId: activeRegionId } })
	};

	const addSubRegion = async () => {
		const newMap = {
			_id: '',
			name: "Not Assigned",
			capital: "Not Assigned",
        	leader: "Not Assigned",
        	flag: "Not Assigned",
        	landmark: [],
        	parentRegion_id: activeRegion._id,
        	top: true,
			subRegion : []
		};
		// const { data } = await AddRegion({ variables: { region:newMap}, refetchQueries: [{ query: queries.GET_SUBREGIONS_BYID,{variables: { regionId: activeRegionId }} }] });
		const { data } = await AddRegion({ variables: { region:newMap} });
		refetch({ variables: { regionId: activeRegionId } })
	};


	const goHome = () =>{
		if (auth)
			setActiveRegion(props.user._id);
		
	}


	const renameRegion = async (regionId, newName) =>{
		// const { data } = await RenameRegion({ variables: { regionId:regionId, newName:newName}, refetchQueries: [{ query: queries.GET_ROOT_REGIONS_BY_USERID }] });
		const { data } = await RenameRegion({ variables: { regionId:regionId, newName:newName} });
		refetch({ variables: { regionId: activeRegionId } })

	}

	const deleteRegion = async (regionId) =>{
		const { data } = await DeleteRegion({ variables: { regionId:regionId} });
		refetch({ variables: { regionId: activeRegionId } })
	}

	const setShowLogin = () => {
		toggleShowCreate(false);
		toggleShowUpdate(false);
		toggleShowLogin(!showLogin);
	};

	const setShowCreate = () => {
		toggleShowLogin(false);
		toggleShowUpdate(false);
		toggleShowCreate(!showCreate);
	};

	const setShowUpdate = () => {
		toggleShowLogin(false);
		toggleShowCreate(false);
		toggleShowUpdate(!showUpdate);
	};

	



	let mainContents;
	
	if (auth && !activeRegion._id){
		mainContents = 				
				<MapSelectionContent addMap={addMap} renameRegion = {renameRegion} subRegions = {subRegions}
				deleteRegion = {deleteRegion} setActiveRegion = {setActiveRegion}
				/>			
		}
	else if (auth && activeRegion._id){
		mainContents = <RegionSpreadSheet activeRegion = {activeRegion} 
		subRegions = {subRegions} addSubRegion = {addSubRegion}
		deleteRegion = {deleteRegion} setActiveRegion = {setActiveRegion}

		/>			
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





	if (showViwer){
		mainContents = <RegionViewer/>
	}












	return (
		<WLayout wLayout="header">
			<WLHeader>
				<WNavbar color="colored">
					<ul>
						<WNavItem>
							<Logo className='logo' goHome = {goHome}/>
						</WNavItem>
					</ul>
					<ul>
						<NavbarOptions
							
							fetchUser={props.fetchUser} auth={auth} 
							setShowCreate={setShowCreate} 	setShowLogin={setShowLogin}
							setActiveRegion = {setActiveRegion} user = {props.user}
							setShowUpdate={setShowUpdate} showUpdate = {showUpdate}
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

			{
				showUpdate && (<UpdateAccount fetchUser={props.fetchUser}  setShowUpdate={setShowUpdate} showUpdate = {showUpdate}/>)
			}


		</WLayout>
	);
};

export default Homescreen;