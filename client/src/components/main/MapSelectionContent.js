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
    // window.location.reload();
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

    
    const deleteSubRegion = async (regionId) =>{
		const { data } = await DeleteSubRegion({ variables: { regionId:regionId} });
		refetchRegion({ variables: { regionId: userId } })
	}

    const [AddSubRegion] 		    = useMutation(mutations.ADD_SUBREGION);
    const [DeleteSubRegion] 		= useMutation(mutations.DELETE_SUBREGION);
    const [MakeTopMap] 		    = useMutation(mutations.MAKE_TOPMAP);
    const [UpdateSubRegion]     = useMutation(mutations.UPDATE_SUBREGION_FIELD);

    


	const [showCreateMap, toggleShowCreateMap] 	= useState(false);
    
    const setshowCreateMap = () => {
		toggleShowCreateMap(!showCreateMap);
	};

    const renameRegion = async (regionId, newName) =>{
		const { data } = await UpdateSubRegion({ variables: { regionId:regionId,field: "name", value:newName} });
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
		const { data } = await AddSubRegion({ variables: { region:newMap, index: 0} });
		refetchRegion({ variables: { regionId: userId } })
	};

    const handleMapClick = async (mapId) => {
        const { data } = await MakeTopMap({ variables: { regionId: mapId} });
        history.replace("/RegionSpreadSheet/" + mapId);
        refetchRegion({ variables: { regionId: userId } });
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
                    deleteSubRegion = {deleteSubRegion} handleMapClick ={handleMapClick}
                    />
                ))
            }
            </div>
            <div className = "mapSelection-Rs">
            <img style = {{height: "90%", width:"100%"}}src={require('../image/Welcome Earth.png')}/>
            <WButton className="modal-button yellow-hover" span clickAnimation="ripple-light" hoverAnimation="darken" color="primary" onClick = {setshowCreateMap}>
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