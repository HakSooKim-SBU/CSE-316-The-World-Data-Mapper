import React                                from 'react';
import { useHistory } from "react-router-dom";
import {  WButton} from 'wt-frontend';

const RootRegionNavigatorEntry = (props) => {
    const rootRegion = props.rootRegion;
    const index = props.index;
    let history = useHistory();

    const handleClick = () =>{
        history.replace("/RegionSpreadSheet/" + rootRegion._id);
    }
    let content = (props.index == 0)? rootRegion.name : "> " + rootRegion.name;
    return (
         
        <div className = "AncestorRegionNavigator" onClick = {handleClick}>
            {content}
        </div>
        
       


    );
};


export default RootRegionNavigatorEntry;