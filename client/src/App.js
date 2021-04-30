import React 			from 'react';
// import Homescreen 		from './components/homescreen/Homescreen';
import { useQuery } 	from '@apollo/client';
import { jsTPS } 		from './utils/jsTPS';
import {BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
// import { browserHistory } from 'react-router'
import  { useState } 				from 'react';
import { useMutation } 		from '@apollo/client';
import { WNavbar, WNavItem } 	from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WLSide, WCard, WCContent, WCMedia } from 'wt-frontend';
import * as mutations 					from '../src/cache/mutations';
import * as queries				from '../src/cache/queries';
import RegionSpreadSheet				from '../src/components/main/RegionSpreadSheet'
import MapSelectionContent				from '../src/components/main/MapSelectionContent'
import Login 							from '../src/components/modals/Login';
import NavbarOptions 					from '../src/components/navbar/NavbarOptions';
import CreateAccount 					from '../src/components/modals/CreateAccount';
import Logo 							from '../src/components/navbar/Logo';
import UpdateAccount 					from '../src/components/modals/UpdateAccount';
import RegionViewer						from '../src/components/main/RegionViewer'
import Welcome							from '../src/components/main/Welcome';
import { PromiseProvider } from 'mongoose';



const App = () => {
	let user = null;
    let transactionStack = new jsTPS();
	let refreshTps = false;
    const { loading, error, data, refetch } = useQuery(queries.GET_DB_USER);
	
    if(error) { console.log(error); }
	if(loading) { console.log(loading); }
	if(data) { 
		let { getCurrentUser } = data;
		if(getCurrentUser !== null) { user = getCurrentUser; }
    }

	const auth = user === null ? false : true;

	let subRegions = [];
	let rootRegions = [];
	let activeRegionId = "";
	const [activeRegion, setActiveRegion] = useState({});
	const [showCreate, toggleShowCreate] 	= useState(false);
	const [showLogin, toggleShowLogin] 		= useState(false);
	const [showUpdate, toggleShowUpdate] 	= useState(false);

	const [showViwer, toggleShowViewer] 	= useState(false);
	const [AddRegion] 		= useMutation(mutations.ADD_REGION);
	const [RenameRegion] 		= useMutation(mutations.RENAME_REGION);
	const [DeleteRegion] 		= useMutation(mutations.DELETE_REGION);

	if (!activeRegion._id && auth){
		activeRegionId = user._id;
	}
	else if (activeRegion._id && auth){
		activeRegionId = activeRegion._id;
	}

	const { data: dataRegion, error: errorRegion, loading: loadingRegion, refetch: refetchRegion} = useQuery(queries.GET_SUBREGIONS_BYID, {variables: { regionId: activeRegionId }});
	if(loadingRegion) { console.log(loadingRegion, 'loading'); }
	if(errorRegion) { console.log(errorRegion, 'error'); }
	if(dataRegion && dataRegion.getSubRegionsById !== null) { 
		for(let subRegion of dataRegion.getSubRegionsById) {
			subRegions.push(subRegion)
		}
	}

	const { data: dataRootRegion, error: errorRootRegion, loading: loadingRootRegion} = useQuery(queries.GET_ROOTREGIONS_BYID, {variables: { regionId: activeRegionId }});
	if(loadingRootRegion) { console.log(loadingRootRegion, 'loading'); }
	if(errorRootRegion) { console.log(errorRootRegion, 'error'); }
	if(dataRootRegion && dataRootRegion.getRootRegionsById !== null) { 
		for(let rootRegion of dataRootRegion.getRootRegionsById) {
			rootRegions.push(rootRegion)
		}
	}

	
	const addMap = async (mapName) => {
		let userId = user._id;
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
		const { data } = await AddRegion({ variables: { region:newMap} });
		refetchRegion({ variables: { regionId: activeRegionId } })
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
		refetchRegion({ variables: { regionId: activeRegionId } })
	};


	const goHome = () =>{
		if (auth)
			setActiveRegion(user._id);
	}


	const renameRegion = async (regionId, newName) =>{
		const { data } = await RenameRegion({ variables: { regionId:regionId, newName:newName} });
		refetchRegion({ variables: { regionId: activeRegionId } })

	}

	const deleteRegion = async (regionId) =>{
		const { data } = await DeleteRegion({ variables: { regionId:regionId} });
		refetchRegion({ variables: { regionId: activeRegionId } })
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

	const setShowViewer = () => {		
		toggleShowViewer(!showViwer);
	}

	return(
		<Router>

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
							fetchUser={refetch} auth={auth} 
							setShowCreate={setShowCreate} 	setShowLogin={setShowLogin}
							setActiveRegion = {setActiveRegion} user = {user}
							setShowUpdate={setShowUpdate} showUpdate = {showUpdate}
						/>
					</ul>
				</WNavbar>
			</WLHeader>
			<Switch>
				<WLMain>
						{(!auth)?
						<Redirect to={ {pathname: "/welcome"} } />	: null
						}
						{(auth && !activeRegion._id)?
						<Redirect to={ {pathname: "/MapSelection"} } />	: null
						}
						{(auth && activeRegion._id)?
						<Redirect to={ {pathname: "/RegionSpreadSheet"} } />	: null
						}
						{(showViwer)?
						<Redirect to={ {pathname: "/RegionViewer"} } />	: null
						}
							<Route 
								exact path="/welcome" 
								name="welcome" 
								component={Welcome}
							/>
							<Route/>
							<Route 
								path="/MapSelection" 				
								render={() => 
									<MapSelectionContent addMap={addMap} renameRegion = {renameRegion} subRegions = {subRegions}
												deleteRegion = {deleteRegion} setActiveRegion = {setActiveRegion}
									/>			
								} 
							/>
							<Route/>
							<Route 
								path="/RegionSpreadSheet" 				
								render={() => 
									<RegionSpreadSheet activeRegion = {activeRegion} 
										subRegions = {subRegions} addSubRegion = {addSubRegion} setShowViewer ={setShowViewer}
										deleteRegion = {deleteRegion} setActiveRegion = {setActiveRegion} />	
								} 
							/>
							<Route/>
							<Route 
								path="/RegionViewer" 				
								render={() => 
									<RegionViewer activeRegion = {activeRegion}/>
									
								}
							/>
							<Route/>
				</WLMain>
			</Switch>


			{
				showCreate && (<CreateAccount fetchUser={refetch} setShowCreate={setShowCreate} />)
			}

			{
				showLogin && (<Login fetchUser={refetch} setShowLogin={setShowLogin} refetch={refetchRegion} auth = {auth} />)
			}

			{
				showUpdate && (<UpdateAccount fetchUser={refetch}  setShowUpdate={setShowUpdate} showUpdate = {showUpdate}/>)
			}

		</WLayout>
		</Router>


	);
}

export default App;