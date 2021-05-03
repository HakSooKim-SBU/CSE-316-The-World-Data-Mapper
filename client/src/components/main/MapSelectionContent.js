import { DirectiveLocation } from 'graphql';
import React, { useState } 				from 'react';
import { WLayout, WLHeader, WLMain, WLSide, WCard, WCContent, WCMedia, WButton } from 'wt-frontend';
import MapEntry from './MapEntry';
import CreateMap 							from '../modals/CreateMap';
import { useQuery } 	from '@apollo/client';
import * as queries				from '../../cache/queries';
import { useMutation } 		from '@apollo/client';

import { PromiseProvider } from 'mongoose';
import { useParams } from "react-router-dom";
import * as mutations 					from '../../cache/mutations';
import { useHistory } from "react-router-dom";

const MapSelectionContent = (props) => {
    console.log("hello");
    let history = useHistory();
    let {_id} = useParams();
    const userId = _id;
    let subMaps = []
    const { data: dataRegion, error: errorRegion, loading: loadingRegion, refetch: refetchRegion} = useQuery(queries.GET_SUBREGIONS_BYID, {variables: { regionId: userId }});
    if(loadingRegion) { console.log(loadingRegion, 'loading'); }
	if(errorRegion) { console.log(errorRegion, 'error'); }
	if(dataRegion && dataRegion.getSubRegionsById !== null) { 
		for(let subRegion of dataRegion.getSubRegionsById) {
			subMaps.push(subRegion)
		}
	}

    
    const deleteRegion = async (regionId) =>{
		const { data } = await DeleteRegion({ variables: { regionId:regionId} });
		refetchRegion({ variables: { regionId: userId } })
	}

    const [AddRegion] 		    = useMutation(mutations.ADD_REGION);
	const [RenameRegion] 		= useMutation(mutations.RENAME_REGION);
    const [DeleteRegion] 		= useMutation(mutations.DELETE_REGION);
    const [MakeTopMap] 		    = useMutation(mutations.MAKE_TOPMAP);



	const [showCreateMap, toggleShowCreateMap] 	= useState(false);
    
    const setshowCreateMap = () => {
		toggleShowCreateMap(!showCreateMap);
	};

    const renameRegion = async (regionId, newName) =>{
		const { data } = await RenameRegion({ variables: { regionId:regionId, newName:newName} });
		refetchRegion({ variables: { regionId: userId } })

	}

    const addMap = async (mapName) => {
		const newMap = {
			_id: '',
			name: mapName,
			capital: "NO CAPITAL",
        	leader: "NO LEADER",
        	flag: "NO FLAG",
        	landmark: [],
        	parentRegion_id: userId,
        	top: false,
			subRegion : []
		};
		const { data } = await AddRegion({ variables: { region:newMap} });
		refetchRegion({ variables: { regionId: userId } })
	};

    const handleMapClick = async (mapId) => {
        const { data } = await MakeTopMap({ variables: { regionId: mapId} });
        refetchRegion({ variables: { regionId: userId } });
        // alert("Successfully clicked");
        history.replace("/RegionSpreadSheet/" + mapId);

    }

    return (
        <div className = "mapSelection">
            <div className = "mapSelection-Header">
                Your Maps
			</div>
            <div className = "mapSelection-Ls">
            {
                subMaps.map((entry, index) => (
                    <MapEntry 
                    map ={entry} renameRegion = {renameRegion}
                     deleteRegion = {deleteRegion} handleMapClick ={handleMapClick}
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
                showCreateMap && (<CreateMap setshowCreateMap={setshowCreateMap} addMap = {addMap}/>)
            }
            
        </div>
        

    );
};

export default MapSelectionContent;