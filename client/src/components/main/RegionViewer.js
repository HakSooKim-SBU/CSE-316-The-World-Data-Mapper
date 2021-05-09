import React, { useState } 				from 'react';
import { WLayout, WLHeader, WLMain, WLSide, WInput, WRow, WCol, WButton } from 'wt-frontend';
import { useParams } from "react-router-dom";
import { useQuery } 	from '@apollo/client';
import * as queries				from '../../cache/queries';
import {useHistory } from 'react-router-dom';
import * as mutations 					from '../../cache/mutations';
import { useMutation } 		from '@apollo/client';
import { UpdateSubRegionField_Transaction } 				from '../../utils/jsTPS';
import LandmarkEntry from './LandmarkEntry';


const RegionViewer = (props) => {
    let {_id} = useParams();
    let history = useHistory();
    let region = null;
    let parentRegion = null;
    let allSubRegionsLandmark = [];
 
    const { data, error, loading, refetch} = useQuery(queries.GET_REGION_BYID, {variables: { regionId: _id }});
	if(loading) { console.log(loading, 'loading'); }
	if(error) { console.log(error, 'error'); }
	if(data && data.getRegionById !== null) { 
		region = data.getRegionById;
	}

    const { data: dataRootsRegion, error: errorRootsRegion, loading: loadingRootsRegion, refetch:rootRegionsRefetch} = useQuery(queries.GET_ROOTREGIONS_BYID, {variables: { regionId: _id }});
	if(loadingRootsRegion) { console.log(loadingRootsRegion, 'loading'); }
	if(errorRootsRegion) { console.log(errorRootsRegion, 'error'); }
	if(dataRootsRegion && dataRootsRegion.getRootRegionsById !== null) { 
        let rootsRegions = dataRootsRegion.getRootRegionsById
        parentRegion = rootsRegions[rootsRegions.length - 2];
    }

    const { data: dataAllSubRegion, error: errorAllSubRegion, loading: loadingAllSubRegion, refetch:landmarkRefetch} = useQuery(queries.GET_SUBREGION_LANDMARK_BYID, {variables: { regionId: _id }});
	if(loadingAllSubRegion) { console.log(loadingAllSubRegion, 'loading'); }
	if(errorAllSubRegion) { console.log(errorAllSubRegion, 'error'); }
	if(dataAllSubRegion && dataAllSubRegion.getSubRegionLandmarkById !== null) { 
        for(let landmark of dataAllSubRegion.getSubRegionLandmarkById) {
			allSubRegionsLandmark.push(landmark)            
        }
    }

    const parentRegionClick = async () =>{
        let a = await refetch();
        let b = await rootRegionsRefetch();
        let c = await landmarkRefetch();
        props.tps.clearAllTransactions();
        setCanUndo(props.tps.hasTransactionToUndo());
        setCanRedo(props.tps.hasTransactionToRedo());
        history.push("/RegionSpreadSheet/" + region.parentRegion_id);
    }

    const [UpdateSubRegionField] 	= useMutation(mutations.UPDATE_SUBREGION_SORT);
    const [canUndo, setCanUndo] = useState(props.tps.hasTransactionToUndo());
	const [canRedo, setCanRedo] = useState(props.tps.hasTransactionToRedo());
	const [landmarkInput, setLandmarkInput] = useState("");

	const updateLandmarkInput = (e) => {
		setLandmarkInput(e.target.value);
	}

    const editLandmark = async (editLandmark, value, opcode) => { //opcode == 1 add, opcode == 0 delete, opcode == 2 edit
        let newLandmark = [...region.landmark];
        if (opcode == 1){
            if(!editLandmark){
                return
            }
            newLandmark.push(editLandmark);
        }
        else if (opcode == 0){
            newLandmark = newLandmark.filter(landmark => landmark !== editLandmark);
        }
        else{
            let idx = newLandmark.indexOf(value);
            newLandmark[idx] = editLandmark;
        }
        let transaction = new UpdateSubRegionField_Transaction(region._id , "landmark", newLandmark , region.landmark, UpdateSubRegionField);
        props.tps.addTransaction(transaction);
        tpsRedo();
	};

    const tpsUndo = async () => {
		const ret = await props.tps.undoTransaction();
		if(ret) {
			setCanUndo(props.tps.hasTransactionToUndo());
			setCanRedo(props.tps.hasTransactionToRedo());
		}
        let a = await refetch();
        let b = await rootRegionsRefetch();
        let c = await landmarkRefetch();
	}

	const tpsRedo = async () => {
		const ret = await props.tps.doTransaction();
		if(ret) {
			setCanUndo(props.tps.hasTransactionToUndo());
			setCanRedo(props.tps.hasTransactionToRedo());
		}
        let a = await refetch();
        let b = await rootRegionsRefetch();
        let c = await landmarkRefetch();
        }

    const disable = () =>{}

    return (
        <div class="regionViewer">
            <div class="regionViewerLS">
                <div class="regionViewer-icons">
                    <WButton wType="texted" className = "regionViewer-icon"  shape = "Rounded" disabled = {!canUndo} onClick = { (canUndo)?tpsUndo:disable} >
                        <i className="material-icons">undo</i>
                    </WButton>
                    <WButton wType="texted" className = "regionViewer-icon" shape = "Rounded" disabled = {!canRedo} onClick = {(canRedo)?tpsRedo:disable} >
                        <i className="material-icons">redo</i>
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
                        Parent Region:  <span style={{paddingLeft: "3%"}} onClick={parentRegionClick}>{(parentRegion) ? parentRegion.name : "  "} </span> 
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
                <div class="regionViewer-LMtable">
                    {
                        (region)?
                        allSubRegionsLandmark.map((entry, index) => (
                            <LandmarkEntry  landmark ={entry} index = {index} regionLandmarkNum = {region.landmark.length} editLandmark ={editLandmark}/>    
                            ))
                            :null    
                    }
                </div>
                <div class="regionViewer-LMaddbox">
                <WRow>
                    <WCol size="1">
                        <WButton wType="Ghost" span className = "regionViwer-add" clickAnimation = "ripple-light" onClick = {() => editLandmark(landmarkInput,"",1)} >
                            <i className="material-icons">add</i>
                        </WButton>
                    </WCol>
                    <WCol size="11">
                        <WInput 
                            className="regionViewer-landmarkInput"  labelAnimation="shrink" filled = "filled"
                            barAnimation="left-to-right" labelText="Enter Landmark" wType="outlined"  onBlur={updateLandmarkInput}
                        />
                    </WCol>
                </WRow>
                </div>
            </div>
        </div>        
        

    );
};

export default RegionViewer;