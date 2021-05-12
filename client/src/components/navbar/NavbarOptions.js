import React                                from 'react';
import { LOGOUT }                           from '../../cache/mutations';
import { useMutation, useApolloClient }     from '@apollo/client';
import { WButton, WNavItem }                from 'wt-frontend';
import Login 							from '../../components/modals/Login';
import UpdateAccount 					from '../../components/modals/UpdateAccount';
import CreateAccount 					from '../../components/modals/CreateAccount';
import  { useState } 				from 'react';
import {useHistory } from 'react-router-dom';


const LoggedIn = (props) => {
    let history = useHistory();
    const client = useApolloClient();
	const [Logout] = useMutation(LOGOUT);

    const handleLogout = async (e) => {
        Logout();

        const { data } = await props.fetchUser();
        if (data) {
            let reset = await client.resetStore();
            history.replace("/");
        }

    };

    return (
        <>
        <WNavItem hoverAnimation="lighten">
            <WButton className="navbar-options pinkFont bold" onClick={props.setShowUpdate} wType="texted" > 
                {props.user.name}
            </WButton>
        </WNavItem >
        <WNavItem hoverAnimation="lighten">
            <WButton className="navbar-options bold" onClick={handleLogout} wType="texted" hoverAnimation="text-primary">
                Logout
            </WButton>
        </WNavItem >
        </>
    );
};

const LoggedOut = (props) => {
    return (
        <>
            <WNavItem hoverAnimation="lighten">
                <WButton className="navbar-options pinkFont bold" onClick={props.setShowCreate} wType="texted" > 
                    Create Account
                </WButton>
            </WNavItem>
            <WNavItem hoverAnimation="lighten">
                <WButton className="navbar-options bold" onClick={props.setShowLogin} wType="texted" hoverAnimation="text-primary">
                    Login
                </WButton>
            </WNavItem>
            
        </>
    );
};


const NavbarOptions = (props) => {


	const [showCreate, toggleShowCreate] 	= useState(false);
	const [showLogin, toggleShowLogin] 		= useState(false);
	const [showUpdate, toggleShowUpdate] 	= useState(false);

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
    return (
        <>  
            {
                props.auth === false ? <LoggedOut setShowLogin={setShowLogin} setShowCreate={setShowCreate}  />
                : <LoggedIn fetchUser={props.fetchUser} logout={props.logout}  showUpdate = {showUpdate}  auth = {props.auth}
                 user = {props.user} setShowUpdate = {setShowUpdate} 
                />
            }
            {
				showCreate && (<CreateAccount fetchUser={props.fetchUser} setShowCreate={setShowCreate} />)
			}

			{
				showLogin && (<Login fetchUser={props.fetchUser} setShowLogin={setShowLogin} />)
			}

			{
				showUpdate && (<UpdateAccount fetchUser={props.fetchUser}  setShowUpdate={setShowUpdate}  showUpdate = {showUpdate}/>)
			}

        </>

    );
};

export default NavbarOptions;