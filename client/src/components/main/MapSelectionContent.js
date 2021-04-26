import { DirectiveLocation } from 'graphql';
import React, { useState } 				from 'react';
import { WLayout, WLHeader, WLMain, WLSide, WCard, WCContent, WCMedia, WButton } from 'wt-frontend';
import MapEntry from './MapEntry';
import CreateMap 							from '../modals/CreateMap';


const MapSelectionContent = (props) => {
    let entries = props.subMaps;
	const [showCreateMap, toggleShowCreateMap] 	= useState(false);

    
    const setshowCreateMap = () => {
		toggleShowCreateMap(!showCreateMap);
	};


    return (
        <div className = "mapSelection">
            <div className = "mapSelection-Header">
                Your Maps
			</div>
            <div className = "mapSelection-Ls">
            {
                entries.map((entry, index) => (
                    <MapEntry 
                    map ={entry} renameMap = {props.renameMap}
                    deleteMap = {props.deleteMap} selectMap = {props.selectMap}
                    
                    />
                ))
                
            }
            </div>

            <div className = "mapSelection-Rs">
                
            <img style = {{height: "90%", width:"100%"}}src={require('../image/Welcome Earth.png')}/>
            <WButton className="modal-button " span clickAnimation="ripple-light" hoverAnimation="darken" color="primary" onClick = {setshowCreateMap}>
                Create New Map
			</WButton>
            

            </div>

            {
                showCreateMap && (<CreateMap setshowCreateMap={setshowCreateMap} addMap = {props.addMap}/>)
            }
            
        </div>
        

    );
};

export default MapSelectionContent;