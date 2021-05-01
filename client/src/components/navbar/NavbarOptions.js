import React                                from 'react';
import { LOGOUT }                           from '../../cache/mutations';
import { useMutation, useApolloClient }     from '@apollo/client';
import { WButton, WNavItem }                from 'wt-frontend';
import { Redirect, useHistory } from "react-router-dom";

const LoggedIn = (props) => {
    let history = useHistory();

    const client = useApolloClient();
	const [Logout] = useMutation(LOGOUT);

    const handleLogout = async (e) => {
        Logout();
        const { data } = await props.fetchUser();
        if (data) {
            let reset = await client.resetStore();
            if (reset) {
            props.setActiveRegion({});
            }
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
    return (
        <>
            {
                props.auth === false ? <LoggedOut setShowLogin={props.setShowLogin} setShowCreate={props.setShowCreate}  />
                : <LoggedIn fetchUser={props.fetchUser} logout={props.logout}  showUpdate = {props.showUpdate}  auth = {props.auth}
                setActiveRegion ={props.setActiveRegion} user = {props.user} setShowUpdate = {props.setShowUpdate}
                />
            }
        </>

    );
};

export default NavbarOptions;