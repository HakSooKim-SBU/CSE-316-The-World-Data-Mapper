import React from 'react';
import { WButton }                from 'wt-frontend';
import {useHistory } from 'react-router-dom';
import {withRouter} from 'react-router';

const Logo = (props) => {
    let history = useHistory();
const handleLogoCLick = async () =>{
    if(props.user !== null){
    props.tps.clearAllTransactions();
    history.push("/MapSelection/" + props.user._id);
    }

}
    return (
        <WButton className="logo" onClick={handleLogoCLick} wType="texted">
            The World Data Mapper
        </WButton>
    );
};

export default Logo;