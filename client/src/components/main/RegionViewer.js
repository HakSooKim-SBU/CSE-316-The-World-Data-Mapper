import React, { useState } 				from 'react';
import { WLayout, WLHeader, WLMain, WLSide, WInput, WRow, WCol, WButton } from 'wt-frontend';
import { useParams } from "react-router-dom";
import { useQuery } 	from '@apollo/client';
import * as queries				from '../../cache/queries';
import { useHistory } from "react-router-dom";


const RegionViewer = (props) => {
    let {_id} = useParams();
    let history = useHistory();

    let region = null;
    let parentRegionName = " ";
    const { data, error, loading, refetch} = useQuery(queries.GET_REGION_BYID, {variables: { regionId: _id }});
	if(loading) { console.log(loading, 'loading'); }
	if(error) { console.log(error, 'error'); }
	if(data && data.getRegionById !== null) { 
		region = data.getRegionById;
	}

    const { data: dataRootsRegion, error: errorRootsRegion, loading: loadingRootsRegion} = useQuery(queries.GET_ROOTREGIONS_BYID, {variables: { regionId: _id }});
	if(loadingRootsRegion) { console.log(loadingRootsRegion, 'loading'); }
	if(errorRootsRegion) { console.log(errorRootsRegion, 'error'); }
	if(dataRootsRegion && dataRootsRegion.getRootRegionsById !== null) { 
        let rootsRegions = dataRootsRegion.getRootRegionsById
        parentRegionName = rootsRegions[rootsRegions.length - 2].name;
        }
	
    const parenRegionClick = () =>{
        history.replace("/RegionSpreadSheet/" + region.parentRegion_id);
    }
    return (
        <div class="regionViewer">
            <div class="regionViewerLS">
                <div class="regionViewer-icons">
                    <WButton wType="texted" className = "regionViewer-icon" clickAnimation = "ripple-light" shape = "Rounded" >
                        <i className="material-icons">navigate_before</i>
                    </WButton>
                    <WButton wType="texted" className = "regionViewer-icon" clickAnimation = "ripple-light" shape = "Rounded" >
                        <i className="material-icons">navigate_next</i>
                    </WButton>
                </div>
                <div class="regionViewer-flag"></div>
                <div class="regionViewer-space"></div>
                <div class="regionViewer-textbox">
                <WRow>
                    <WCol size ="12" className = "RegionViewerText">
                        Region Name:  {(region) ? region.name : "  "}
                    </WCol>
                </WRow>
                <WRow>
                    <WCol size ="12"  className = "RegionViewerText">
                        Parent Region:  <span style={{paddingLeft: "3%"}} onClick={parenRegionClick}>{(parentRegionName) ? parentRegionName : "  "} </span> 
                    </WCol>
                </WRow>
                <WRow>
                    <WCol size ="12"  className = "RegionViewerText">
                        Region Capital:  {(region) ? region.capital : "  "}
                    </WCol>

                </WRow>
                <WRow>
                    <WCol size ="12"  className = "RegionViewerText">
                        Region Leader:  {(region) ? region.leader : "  "} 
                    </WCol>
                </WRow>
                <WRow>
                    <WCol size ="12"  className = "RegionViewerText">
                        # Of Sub Regions:  {(region) ? region.subRegion.length : "  "}
                    </WCol>
                </WRow>
                </div>
            </div>
            <div class="regionViewerEmptyColumn">

            </div>
            <div class="regionViewerRS">
                <div class="regionViewer-LMheader">
                    Region LandMark
                </div>
                <div class="regionViewer-LMtable"></div>
                <div class="regionViewer-LMaddbox">
                <WRow>
                    <WCol size="1">
                        <WButton wType="Ghost" span className = "regionViwer-add" clickAnimation = "ripple-light" >
                            <i className="material-icons">add</i>
                        </WButton>
                    </WCol>
                    <WCol size="11">
                        <WInput 
                            className="regionViewer-landmarkInput"  labelAnimation="shrink" filled = "filled"
                            barAnimation="left-to-right" labelText="Enter Landmark" wType="outlined"  
                        />
                    </WCol>
                </WRow>


                </div>
            </div>
        </div>        
        

    );
};

export default RegionViewer;