import { DirectiveLocation, isRequiredArgument, PossibleTypeExtensionsRule } from 'graphql';
import React, { useState } 	from 'react';
import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol } from 'wt-frontend';
import DeleteSubRegionConfirmation 							from '../modals/DeleteSubRegionConfirmation';


const SubRegionEntry = (props) => {

    const [editingName, toggleNameEdit]         = useState(false);
    const [editingCapital, toggleCapitalEdit]   = useState(false);
    const [editingLeader, toggleLeaderEdit]     = useState(false);

    const openNameInput = () =>{
        toggleNameEdit(true);
        props.setFocus(true);
        props.setCurrentLocation({x: props.index, y:0});
    }

    const openCapitalInput = () =>{
        toggleCapitalEdit(true);
        props.setFocus(true);
        props.setCurrentLocation({x: props.index, y:1});
    }

    const openLeaderInput = () =>{
        toggleLeaderEdit(true);
        props.setFocus(true);
        props.setCurrentLocation({x: props.index, y:2});
    }

    if (props.currentLocation.x === props.index && props.focus ){   
         if (props.currentLocation.y == 0 && !editingName){
            openNameInput();
        }
        else if (props.currentLocation.y == 1 && !editingCapital){ 
            openCapitalInput();
        }
        else if (props.currentLocation.y == 2 && !editingLeader){
            openLeaderInput();
        }
    }
    
    const handleClickNameEdit = (e) =>{

        const newName = e.target.value ? e.target.value : 'Not Assigned';
        const prevName = props.subRegion.name;
        if(newName !== prevName) {
            props.editRegion(props.subRegion._id, 'name', newName, prevName);
        }
        toggleNameEdit(false);
        props.setFocus(false);
    }
    
    const handleClickCapital = (e) =>{
        const newCapital = e.target.value ? e.target.value : 'Not Assigned';
        const prevCapital = props.subRegion.capital;
        if(newCapital !== prevCapital) {
        props.editRegion(props.subRegion._id, 'capital', newCapital, prevCapital);
        }
        toggleCapitalEdit(false);
        props.setFocus(false);
    }

    const handleClickLeader = (e) =>{
        const newLeader = e.target.value ? e.target.value : 'Not Assigned';
        const prevLeader = props.subRegion.leader;
        if(newLeader !== prevLeader) {
            props.editRegion(props.subRegion._id, 'leader', newLeader, prevLeader);
        }
        toggleLeaderEdit(false);
        props.setFocus(false);
    }

    const handleKeyDown = (e) =>{
        if(e.key === "ArrowRight") {
            if (props.currentLocation.y <2){
                props.setCurrentLocation({x:props.currentLocation.x, y:props.currentLocation.y + 1});
                props.setFocus(true);
            }
		}
		else if (e.key === "ArrowLeft") { 
            if (props.currentLocation.y > 0){
                props.setCurrentLocation({x:props.currentLocation.x, y:props.currentLocation.y - 1});
                props.setFocus(true);

            }
		}
        else if (e.key === "ArrowDown") { 
            if (props.currentLocation.x < props.subRegionsTotal - 1){
                props.setCurrentLocation({x:props.currentLocation.x + 1, y:props.currentLocation.y});
                props.setFocus(true);

            }
		}
        else if (e.key === "ArrowUp") { 
            if (props.currentLocation.x > 0){
                props.setCurrentLocation({x:props.currentLocation.x - 1, y:props.currentLocation.y});
                props.setFocus(true);

            }
		}
    }

    const handleClickLandmark = () =>{
        props.handleClickLandmark(props.subRegion._id);
    }

    const handleClickName = () => {
        props.handleClickName(props.subRegion._id);
    } 

    const [showDeleteMap, toggleShowDeleteMap] = useState(false);

    const setshowDeleteMap = () => {
		toggleShowDeleteMap(!showDeleteMap);
	};


    let landmarkStr = ""
    props.subRegion.landmark.map(landmark => landmarkStr += landmark + ", ");
    landmarkStr = landmarkStr.slice(0,-2);

    //
    const importAll = (r) => {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }
    const images = importAll(require.context('../image/The World', false, /\.(png)$/));
    // referenced by https://stackoverflow.com/questions/42118296/dynamically-import-images-from-a-directory-using-webpack


    return (
        <div className="spreadsheetTableCell">

            <div className="deleteColumn">
                
                
                <WButton wType ="texted" span className = "table-red-column" clickAnimation = "ripple-dark"  onClick = {setshowDeleteMap} >
                <i className="material-icons">close</i>

                </WButton>
            </div>
            <div className="nameColumn">
                {editingName ? 
                    < WInput
                    onBlur={handleClickNameEdit}
                    onKeyDown={handleKeyDown}
                     defaultValue={props.subRegion.name} 
                    inputClass="table-input-class" 
                    autoFocus={true}
                    />
                :
                    <WButton wType="texted" span className = "table-blue-column" clickAnimation = "ripple-dark"  onClick = {handleClickName} >
                        {props.subRegion.name}
                    </WButton>
                 }
                
            </div>
            <div className="capitalColumn">
                {editingCapital ? 
                    < WInput
                    onBlur={handleClickCapital}
                    onKeyDown={handleKeyDown}
                     defaultValue={props.subRegion.capital} 
                    inputClass="table-input-class" 
                    autoFocus={true}
                    />
                :
                    <WButton wType="texted" span className = "table-black-column" clickAnimation = "ripple-dark" onClick = {openCapitalInput}>
                        {props.subRegion.capital}
                    </WButton>
                 }
            </div>
           
            <div className="leaderColumn">
                {editingLeader ? 
                    < WInput
                     onBlur={handleClickLeader}
                    onKeyDown={handleKeyDown}
                     defaultValue={props.subRegion.leader} 
                    inputClass="table-input-class" 
                    autoFocus={true}
                    // onFocus = {openLeaderInput}
                    />
                :
                    <WButton wType="texted" span className = "table-black-column" clickAnimation = "ripple-dark" onClick = {openLeaderInput}>
                    {props.subRegion.leader}
                    </WButton>
                 }

                
            </div>
            <div className="flagColumn">
                <WButton wType="texted" span className = "table-black-column button_no_Respond"  >

                <img  className = "button_no_Respond" style = {{width: "151px", height: "30px" }} 
                src= { images[`${props.subRegion.flag}.png`] }  
                 alt="N/A"  
                 />

                </WButton>
            </div>
            <div className="landmarkColumn">
                <WButton wType="texted" span className = "table-blue-column" clickAnimation = "ripple-dark" onClick = {handleClickLandmark}>
                {landmarkStr}   
                </WButton>
            </div>

            {
                showDeleteMap && <DeleteSubRegionConfirmation deleteSubRegion = {props.deleteSubRegion} subRegion = {props.subRegion} index = {props.index} setshowDeleteMap = {setshowDeleteMap}/> 
            }
      </div>
    );
};

export default SubRegionEntry;