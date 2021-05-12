import {useHistory } from 'react-router-dom';
import React, { useState } 				from 'react';
import { WLayout, WLHeader, WLMain, WLSide, WInput, WRow, WCol, WButton } from 'wt-frontend';
import { useParams } from "react-router-dom";
import { useQuery } 	from '@apollo/client';
import * as queries				from '../../cache/queries';


const SiblingsNavigator = (props) => {
    let history = useHistory();
    let parentRegion = null;
    const pathname = window.location.pathname 
    let _id = ""
    let index = null; 
    let prevIndex = null;
    let nextIndex = null;
    const disable = () =>{}
    
    if (pathname.startsWith("/RegionViewer/")){
        _id = pathname.replace("/RegionViewer/","");
    }
    const { data: dataRootsRegion, error: errorRootsRegion, loading: loadingRootsRegion} = useQuery(queries.GET_ROOTREGIONS_BYID, {variables: { regionId: _id }});
	if(loadingRootsRegion) { console.log(loadingRootsRegion, 'loading'); }
	if(errorRootsRegion) { console.log(errorRootsRegion, 'error'); }
	if(dataRootsRegion && dataRootsRegion.getRootRegionsById !== null) { 
        let rootsRegions = dataRootsRegion.getRootRegionsById
        parentRegion = rootsRegions[rootsRegions.length - 2];
    }

    if(parentRegion){
        index = parentRegion.subRegion.indexOf(_id)
        prevIndex = index - 1;
        nextIndex = index + 1; 
    }

    const moveToPrevSibling = () =>{
        props.tps.clearAllTransactions();

        history.push("/RegionViewer/" + parentRegion.subRegion[prevIndex]);
    }

    const moveToNextSibling = () =>{
        props.tps.clearAllTransactions();

        history.push("/RegionViewer/" + parentRegion.subRegion[nextIndex]);
    }




    return (
         <>
        <WButton wType="texted" className = "regionViewer-icon" disabled ={(parentRegion)?prevIndex===-1:null}  shape = "Rounded" onClick = { ((parentRegion)&&prevIndex===-1)?disable:moveToPrevSibling} >
        <i className="material-icons">navigate_before</i>
    </WButton>
    <WButton wType="texted" className = "regionViewer-icon" disabled ={(parentRegion)?nextIndex === parentRegion.subRegion.length:null} shape = "Rounded" onClick = {((parentRegion)&&nextIndex === parentRegion.subRegion.length)?disable:moveToNextSibling}>
        <i className="material-icons">navigate_next</i>
    </WButton>
    </>
        
       


    );
};


export default SiblingsNavigator;