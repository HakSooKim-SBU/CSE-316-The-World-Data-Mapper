import { GET_DB_TODOS } 				from '../../cache/queries';
import React, { useState } 				from 'react';
import { useMutation, useQuery } 		from '@apollo/client';
import { WNavbar, WSidebar, WNavItem } 	from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WLSide, WCard, WCContent, WCMedia } from 'wt-frontend';

import Login 							from '../modals/Login';
import NavbarOptions 					from '../navbar/NavbarOptions';
import CreateAccount 					from '../modals/CreateAccount';
import Logo 							from '../navbar/Logo';



const Homescreen = (props) => {
	const auth = props.user === null ? false : true;
	const [activeRegion, setActiveRegion] = useState({});

	const [showCreate, toggleShowCreate] 	= useState(false);
	const [showLogin, toggleShowLogin] 		= useState(false);



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
	console.log(typeof(activeRegion_id));
	if (auth && !activeRegion._id){
		mainContents = <div>Bye</div>
	}
	else if (!auth){
		mainContents = 
					<div class = "welcome">
						<img style = {{borderRadius: "30px"}}src={require('../image/Welcome Earth.png')}/>
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
				showLogin && (<Login fetchUser={props.fetchUser} setShowLogin={setShowLogin} />)
			}

		</WLayout>
	);
};

export default Homescreen;