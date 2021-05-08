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
import { UpdateSubRegionField_Transaction, UpdateSubRegion_Transaction } 				from '../../utils/jsTPS';

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

    const [canUndo, setCanUndo] = useState(props.tps.hasTransactionToUndo());
	const [canRedo, setCanRedo] = useState(props.tps.hasTransactionToRedo());

    const [AddSubRegion] 		    = useMutation(mutations.ADD_SUBREGION);
    const [DeleteSubRegion] 	    = useMutation(mutations.DELETE_SUBREGION);
	const [UpdateSubRegionField] 	= useMutation(mutations.UPDATE_SUBREGION_FIELD);
    const [UpdateSubRegionSort] 	= useMutation(mutations.UPDATE_SUBREGION_SORT);
    
    const tpsUndo = async () => {
		const ret = await props.tps.undoTransaction();
		if(ret) {
			setCanUndo(props.tps.hasTransactionToUndo());
			setCanRedo(props.tps.hasTransactionToRedo());
		}
        refetch();
        refetchRegion();
	}

	const tpsRedo = async () => {
		const ret = await props.tps.doTransaction();
		if(ret) {
			setCanUndo(props.tps.hasTransactionToUndo());
			setCanRedo(props.tps.hasTransactionToRedo());
		}
        refetch();
        refetchRegion();
	}






    const addSubRegion = async () => {
		const newSubRegion = {
			_id: '',
			name: "Not Assigned",
			capital: "Not Assigned",
        	leader: "Not Assigned",
        	flag: "Not Assigned",
        	landmark: [],
        	parentRegion_id: _id,
        	top: false,
			subRegion : []
		};
        let opcode = 1;
        let subRegionId = newSubRegion._id;

        let transaction = new UpdateSubRegion_Transaction(subRegionId, newSubRegion, opcode, AddSubRegion, DeleteSubRegion);
        props.tps.addTransaction(transaction);
		tpsRedo();
    };

    const deleteSubRegion = async (subRegion, index) => {
		const subRegionToDelete = {
			_id: subRegion._id,
			name: subRegion.name,
			capital: subRegion.capital,
        	leader: subRegion.leader,
        	flag: subRegion.flag,
        	landmark: subRegion.landmark,
        	parentRegion_id: subRegion.parentRegion_id,
        	top: subRegion.top,
			subRegion : subRegion.subRegion
		};
        let subRegionId = subRegion._id;
        let opcode = 0;
        let transaction = new UpdateSubRegion_Transaction(subRegionId, subRegionToDelete, opcode, AddSubRegion, DeleteSubRegion,index);
        props.tps.addTransaction(transaction);
		tpsRedo();
    };




    const sortByColumn = async (sortingCriteria) => {
		let oldSubRegionsIds = [];
        let newSubRegionsIds = [];
		for (let i = 0; i < subRegions.length; i++) {
			let subRegion = subRegions[i];
			oldSubRegionsIds.push(subRegion._id);
		  }
        let subRegionsToSort = [...subRegions]

        let sortIncreasing = isInIncreasingOrder(subRegionsToSort, sortingCriteria);
		let compareFunction = makeCompareFunction(sortingCriteria, sortIncreasing);
		subRegionsToSort = subRegionsToSort.sort(compareFunction);
        for (let i = 0; i < subRegionsToSort.length; i++) {
			let subRegion = subRegionsToSort[i];
			newSubRegionsIds.push(subRegion._id);
		  }

		let transaction = new UpdateSubRegionField_Transaction (_id, "subRegion" , newSubRegionsIds, oldSubRegionsIds, UpdateSubRegionSort);
		props.tps.addTransaction(transaction);
		tpsRedo();
	}

    const isInIncreasingOrder = (subRegionsToSort, sortingCriteria) => {
        for (let i = 0; i < subRegionsToSort.length - 1; i++) {
            let a = subRegionsToSort[i][sortingCriteria];
            let b = subRegionsToSort[i + 1][sortingCriteria];
            let c = a>b
          if (subRegionsToSort[i][sortingCriteria] > subRegionsToSort[i + 1][sortingCriteria]){
            return false;
          }
        }
        return true;
    }

    const makeCompareFunction = (criteria, increasing) => {
        return function (item1, item2) {
          let negate = 1;
          if (increasing) {
            negate = -1;
          }
          let value1 = item1[criteria];
          let value2 = item2[criteria];
          if (value1 < value2) {
            return -1 * negate;
          }
          else if (value1 === value2) {
            return 0;
          }
          else {
            return 1 * negate;
          }
        }
      }


    const editRegion = async (regionID, field, value, prev) => {
        let transaction = new UpdateSubRegionField_Transaction(regionID, field, value, prev, UpdateSubRegionField);
        props.tps.addTransaction(transaction);
        tpsRedo();
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
                        <WButton wType="texted" span hoverAnimation = "darken" className = "SpreadSheet-table-icons-undo-redo" 
                        clickAnimation = "ripple-light" shape = "pill" onClick = {tpsUndo} >
                            <i className="material-icons">undo</i>
                        </WButton>
                    </WCol>
                    <WCol size="4">
                        <WButton wType="texted" span hoverAnimation = "darken" className = "SpreadSheet-table-icons-undo-redo" 
                        clickAnimation = "ripple-light" shape = "pill"onClick = {tpsRedo} >
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
                <WButton wType="texted" span clickAnimation = "ripple-light" className = "SpreadSheet-Header-icons" onClick = {() => sortByColumn("name")} >
                    Name<span style={{paddingLeft: "15px"}}></span><i className="material-icons">arrow_downward</i>
                </WButton>
            </div>
            <div class="SpreadSheet-capitalHeader"> 
                <WButton wType="texted" span clickAnimation = "ripple-light" className = "SpreadSheet-Header-icons" onClick = {() => sortByColumn("capital")} >
                    Capital<span style={{paddingLeft: "15px"}}></span><i className="material-icons">arrow_downward</i>
                </WButton>
            </div>
            <div class="SpreadSheet-leaderHeader">
                <WButton wType="texted" span clickAnimation = "ripple-light" className = "SpreadSheet-Header-icons"onClick = {() => sortByColumn("leader")} >
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
                    <SubRegionEntry handleClickLandmark = {handleClickLandmark} handleClickName = {handleClickName} editRegion={editRegion}
                    subRegion ={entry} index = {index} deleteSubRegion = {deleteSubRegion} />
                ))
            }

            </div>




        </div>

       
        
        

    );
};

export default RegionSpreadSheet;

                    
                