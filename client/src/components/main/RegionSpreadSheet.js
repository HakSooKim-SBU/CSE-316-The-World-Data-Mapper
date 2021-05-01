import { DirectiveLocation } from 'graphql';
import React, { useState } 				from 'react';
import { WLayout, WLHeader, WLMain, WCol, WRow, WCContent, WButton } from 'wt-frontend';
import SubRegionEntry from './SubRegionEntry';
import { useQuery } 	from '@apollo/client';
import * as queries				from '../../cache/queries';
import { useMutation } 		from '@apollo/client';

import { PromiseProvider } from 'mongoose';
import { useParams } from "react-router-dom";
import * as mutations 					from '../../cache/mutations';
import { useHistory } from "react-router-dom";


const RegionSpreadSheet = (props) => {
    let history = useHistory();
    let {_id} = useParams();
    let region = null;
    let subRegions = [];

    const { data, error, loading, refetch} = useQuery(queries.GET_REGION_BYID, {variables: { regionId: _id }});
	if(loading) { console.log(loading, 'loading'); }
	if(error) { console.log(error, 'error'); }
	if(data && data.getRegionById !== null) { 
		region = data.getRegionById;
	}

    

    const { data: dataRegion, error: errorRegion, loading: loadingRegion, refetch: refetchRegion} = useQuery(queries.GET_SUBREGIONS_BYID, {variables: { regionId: _id }});
	if(loadingRegion) { console.log(loadingRegion, 'loading'); }
	if(errorRegion) { console.log(errorRegion, 'error'); }
	if(dataRegion && dataRegion.getSubRegionsById !== null) { 
		for(let subRegion of dataRegion.getSubRegionsById) {
			subRegions.push(subRegion)
		}
	}

    const [AddRegion] 		= useMutation(mutations.ADD_REGION);


    const addSubRegion = async () => {
		const newSubRegion = {
			_id: '',
			name: "Not Assigned",
			capital: "Not Assigned",
        	leader: "Not Assigned",
        	flag: "Not Assigned",
        	landmark: [],
        	parentRegion_id: _id,
        	top: true,
			subRegion : []
		};
		const { data } = await AddRegion({ variables: { region:newSubRegion} });
        refetch();
        refetchRegion();
    };

    const handleClickName = (mapId) => {
        history.push("/RegionSpreadSheet/" +mapId);
    }
    
    const handleClickLandmark = (mapId) =>{
        history.replace("/RegionViewer/" +mapId);
    }
    return (
        <div className = "regionSpreadSheet">

            <div class="SpreadSheet-icon">
                <WRow>
                    <WCol size="4">
                        <WButton wType="texted" span className = "SpreadSheet-table-icons-add" clickAnimation = "ripple-light" shape = "pill" onClick = {addSubRegion} >
                            <i className="material-icons">add</i>
                        </WButton>
                    </WCol>
                    <WCol size="4">
                        <WButton wType="texted" span hoverAnimation = "darken" className = "SpreadSheet-table-icons-undo-redo" clickAnimation = "ripple-light" shape = "pill" >
                            <i className="material-icons">undo</i>
                        </WButton>
                    </WCol>
                    <WCol size="4">
                        <WButton wType="texted" span hoverAnimation = "darken" className = "SpreadSheet-table-icons-undo-redo" clickAnimation = "ripple-light" shape = "pill" >
                            <i className="material-icons">redo</i>
                        </WButton>
                    </WCol>
                </WRow>

            </div>

            <div class="SpreadSheet-title">
                    Region Name : <span style={{paddingLeft: "3%"}}>{(region) ? region.name : "  "}</span>
            </div>
            
            <div class="SpreadSheet-empty"></div>

            <div class="SpreadSheet-titleHeader"> 
                <WButton wType="texted" span clickAnimation = "ripple-light" className = "SpreadSheet-Header-icons" >
                    Name<span style={{paddingLeft: "15px"}}></span><i className="material-icons">arrow_downward</i>
                </WButton>
            </div>
            <div class="SpreadSheet-capitalHeader"> 
                <WButton wType="texted" span clickAnimation = "ripple-light" className = "SpreadSheet-Header-icons" >
                    Capital<span style={{paddingLeft: "15px"}}></span><i className="material-icons">arrow_downward</i>
                </WButton>
            </div>
            <div class="SpreadSheet-leaderHeader">
                <WButton wType="texted" span clickAnimation = "ripple-light" className = "SpreadSheet-Header-icons" >
                    Leader<span style={{paddingLeft: "15px"}}></span><i className="material-icons">arrow_downward</i>
                </WButton>
            </div>
            <div class="SpreadSheet-flagHeader">
                <WButton wType="texted" span clickAnimation = "ripple-light" className = "SpreadSheet-Header-icons" >
                    Flag<span style={{paddingLeft: "15px"}}></span><i className="material-icons">arrow_downward</i>
                </WButton>
            </div>
            <div class="SpreadSheet-landmarkHeader">
                <WButton wType="texted" span clickAnimation = "ripple-light" className = "SpreadSheet-Header-icons" >
                    Landmarks<span style={{paddingLeft: "15px"}}></span><i className="material-icons">arrow_downward</i>
                </WButton>    
            </div>



            <div class="SpreadSheet-tableBody">
            {
                subRegions.map((entry, index) => (
                    <SubRegionEntry handleClickLandmark = {handleClickLandmark} handleClickName = {handleClickName}
                    subRegion ={entry} />
                ))
            }

            </div>




        </div>

       
        
        

    );
};

export default RegionSpreadSheet;

                    
                