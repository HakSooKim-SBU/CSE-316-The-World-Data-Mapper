import React 			from 'react';
// import Homescreen 		from './components/homescreen/Homescreen';
import { useQuery } 	from '@apollo/client';
import { jsTPS } 		from './utils/jsTPS';
import {BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
// import { browserHistory } from 'react-router'
import  { useState } 				from 'react';
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

	const [activeRegion, setActiveRegion] = useState({});
	const [showCreate, toggleShowCreate] 	= useState(false);
	const [showLogin, toggleShowLogin] 		= useState(false);
	const [showUpdate, toggleShowUpdate] 	= useState(false);

	const goHome = () =>{
		if (auth)
			setActiveRegion(user._id);
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

	return(
		<Router>

		<WLayout wLayout="header">

			<WLHeader>
				<WNavbar color="colored">
					<ul>
						<WNavItem>
							<Logo className='logo' goHome = {goHome} user = {user}/>
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
					<Route exact path="/" name="welcome" component={() => <Welcome auth={auth} user = {user} />} /> <Route/>
					<Route path="/MapSelection/:_id" component={() => <MapSelectionContent user={user}/>}/> <Route/>
					<Route path="/RegionSpreadSheet/:_id" component={() => <RegionSpreadSheet user={user}/>}/> <Route/>
					<Route path="/RegionViewer/:_id" component={() => <RegionViewer user={user}/>} /> <Route/>
				</WLMain>
			</Switch>


			{
				showCreate && (<CreateAccount fetchUser={refetch} setShowCreate={setShowCreate} />)
			}

			{
				showLogin && (<Login fetchUser={refetch} setShowLogin={setShowLogin} auth = {auth} />)
			}

			{
				showUpdate && (<UpdateAccount fetchUser={refetch}  setShowUpdate={setShowUpdate} showUpdate = {showUpdate}/>)
			}

		</WLayout>
		</Router>


	);
}

export default App;