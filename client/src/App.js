import React 			from 'react';
import { useQuery } 	from '@apollo/client';
import { jsTPS } 		from './utils/jsTPS';
import {BrowserRouter as Router, Switch, Route, Redirect,useHistory } from 'react-router-dom';
import  { useState } 				from 'react';
import { WNavbar, WNavItem } 	from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WLSide, WCard, WCContent, WCMedia } from 'wt-frontend';
import * as queries				from '../src/cache/queries';
import RegionSpreadSheet				from '../src/components/main/RegionSpreadSheet'
import MapSelectionContent				from '../src/components/main/MapSelectionContent'
import NavbarOptions 					from '../src/components/navbar/NavbarOptions';
import AncestorRegionNavigator 			from '../src/components/navbar/AncestorRegionNavigator';
import SiblingsNavigator 			from '../src/components/navbar/SiblingsNavigator';

import Logo 							from '../src/components/navbar/Logo';
import RegionViewer						from '../src/components/main/RegionViewer'
import Welcome							from '../src/components/main/Welcome';
import { PromiseProvider } from 'mongoose';
import { createBrowserHistory } from 'history';

const App = () => {
	let user = null;
    let tps = new jsTPS();
	console.log(tps)
	const { loading, error, data, refetch } = useQuery(queries.GET_DB_USER);
	
    if(error) { console.log(error); }
	if(loading) { console.log(loading); }
	if(data) { 
		let { getCurrentUser } = data;
		if(getCurrentUser !== null) { user = getCurrentUser; }
    }


	const auth = user === null ? false : true;
	return(
		<Router >
		<WLayout wLayout="header" >
			<WLHeader>
				<WNavbar color="colored">
				<ul className = "logoSpace" >
					<Logo className='logo' user = {user} tps = {tps} />
				</ul>
				<ul className = "navigatorSpace" >
						<ul className = "ancestorNavigator" >
							<Route path={["/RegionSpreadSheet/:_id","/RegionViewer/:_id"]}  render={() => <AncestorRegionNavigator tps = {tps}/>} /> <Route/>
						</ul>
						<ul className = "siblingNavigator" >
							<Route path={["/RegionViewer/:_id"]}  render={() => <SiblingsNavigator tps = {tps}/>} /> <Route/>
						</ul>
				</ul>
				<ul>
					<NavbarOptions fetchUser={refetch} auth={auth} user = {user} />
				</ul>
				</WNavbar>
			</WLHeader>
				
			<Switch>
				<WLMain>
					<Route exact path="/" name="welcome" render={() => <Welcome />} /> <Route/>
					<Route path="/MapSelection/:_id" render={() => <MapSelectionContent />}/> <Route/>
					<Route path="/RegionSpreadSheet/:_id" render={() => <RegionSpreadSheet tps = {tps} />}/> <Route/>
					<Route path="/RegionViewer/:_id" render={() => <RegionViewer  tps = {tps}  />}/><Route/>
				</WLMain>
			</Switch>

		</WLayout>
		</Router>

	);
}

export default App;