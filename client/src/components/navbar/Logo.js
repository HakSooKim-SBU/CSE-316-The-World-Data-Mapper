import React from 'react';
import { WButton }                from 'wt-frontend';
import {useHistory } from 'react-router-dom';

const Logo = (props) => {
    let history = useHistory();
const handleLogoCLick = () =>{
    if(props.user !== null)
    history.push("/MapSelection/" + props.user._id);
    props.tps.clearAllTransactions();
}
    return (
        <WButton className="logo" onClick={handleLogoCLick} wType="texted">
            The World Data Mapper
        </WButton>
    );
};

export default Logo;