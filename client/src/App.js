import React 			from 'react';
import { useQuery } 	from '@apollo/client';
import { jsTPS } 		from './utils/jsTPS';
import {BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import  { useState } 				from 'react';
import { WNavbar, WNavItem } 	from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WLSide, WCard, WCContent, WCMedia } from 'wt-frontend';
import * as queries				from '../src/cache/queries';
import RegionSpreadSheet				from '../src/components/main/RegionSpreadSheet'
import MapSelectionContent				from '../src/components/main/MapSelectionContent'
import NavbarOptions 					from '../src/components/navbar/NavbarOptions';
import AncestorRegionNavigator 			from '../src/components/navbar/AncestorRegionNavigator';

import Logo 							from '../src/components/navbar/Logo';
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

	return(
		<Router>
		<WLayout wLayout="header">
			<WLHeader>
				<WNavbar color="colored">
					<div >
						<WNavItem>
							<Logo className='logo' user = {user} />
						</WNavItem>
					</div>
					<div style = {{width:"53%"}}>
					<Route path={["/RegionSpreadSheet/:_id","/RegionViewer/:_id"]}  component={() => <AncestorRegionNavigator/>} /> <Route/>
					</div>
					<div  >
						<NavbarOptions		
							fetchUser={refetch} auth={auth} 
							 user = {user}				
						/>
					</div>
				</WNavbar>
			</WLHeader>
				
			<Switch>
				<WLMain>
					<Route exact path="/" name="welcome" render={() => <Welcome auth={auth} user = {user} />} /> <Route/>
					<Route path="/MapSelection/:_id" render={() => <MapSelectionContent user={user}/>}/> <Route/>
					<Route path="/RegionSpreadSheet/:_id" render={() => <RegionSpreadSheet user={user}/>}/> <Route/>
					<Route path="/RegionViewer/:_id" render={() => <RegionViewer user={user}/>} /> <Route/>
				</WLMain>
			</Switch>

		</WLayout>
		</Router>

	);
}

export default App;