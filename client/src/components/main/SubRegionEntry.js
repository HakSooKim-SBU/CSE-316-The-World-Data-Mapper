import { DirectiveLocation } from 'graphql';
import React, { useState } 	from 'react';
import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol } from 'wt-frontend';
import DeleteSubRegionConfirmation 							from '../modals/DeleteSubRegionConfirmation';

const SubRegionEntry = (props) => {


    // const [editingName, toggleDateEdit] = useState(false);
    const [editingCapital, toggleCapitalEdit] = useState(false);
    const [editingLeader, toggleLeaderEdit] = useState(false);

    const handleClickName = () => {
        props.handleClickName(props.subRegion._id);
    } 

    const [showDeleteMap, toggleShowDeleteMap] = useState(false);

    const setshowDeleteMap = () => {
		toggleShowDeleteMap(!showDeleteMap);
	};
    
    const handleClickCapital = (e) =>{
        toggleCapitalEdit(!editingCapital);
        const newCapital = e.target.value ? e.target.value : 'Not Assigned';
        const prevCapital = props.subRegion.capital;
        if(newCapital !== prevCapital) {
            props.editRegion(props.subRegion._id, 'capital', newCapital, prevCapital);
        }
    }

    const handleClickLeader = (e) =>{
        toggleLeaderEdit(!editingLeader);
        const newLeader = e.target.value ? e.target.value : 'Not Assigned';
        const prevLeader = props.subRegion.leader;
        if(newLeader !== prevLeader) {
            props.editRegion(props.subRegion._id, 'leader', newLeader, prevLeader);
        }
    }

    const handleClickLandmark = () =>{
        props.handleClickLandmark(props.subRegion._id);
    }

    return (
        <div className="spreadsheetTableCell">

            <div className="deleteColumn">
                
                
                <WButton wType ="texted" span className = "table-red-column" clickAnimation = "ripple-dark"  onClick = {setshowDeleteMap} >
                <i className="material-icons">close</i>

                </WButton>
            </div>
            <div className="nameColumn">
                <WButton wType="texted" span className = "table-blue-column" clickAnimation = "ripple-dark"  onClick = {handleClickName} >
                    {props.subRegion.name}
                </WButton>
            </div>
            <div className="capitalColumn">
                {editingCapital ? 
                    < WInput
                     onBlur={handleClickCapital}
                    onKeyDown={(e) => {if(e.keyCode === 13) handleClickCapital(e)}}
                    autoFocus={true} defaultValue={props.subRegion.capital} 
                    inputClass="table-input-class" 
                    />
                :
                    <WButton wType="texted" span className = "table-black-column" clickAnimation = "ripple-dark" onClick = { ()=> toggleCapitalEdit(!editingCapital)}>
                        {props.subRegion.capital}
                    </WButton>
                 }
            </div>
           
            <div className="leaderColumn">
                {editingLeader ? 
                    < WInput
                     onBlur={handleClickLeader}
                    onKeyDown={(e) => {if(e.keyCode === 13) handleClickLeader(e)}}
                    autoFocus={true} defaultValue={props.subRegion.leader} 
                    inputClass="table-input-class" 
                    />
                :
                    <WButton wType="texted" span className = "table-black-column" clickAnimation = "ripple-dark" onClick = { ()=> toggleLeaderEdit(!editingLeader)}>
                    {props.subRegion.leader}
                    </WButton>
                 }

                
            </div>
            <div className="flagColumn">
                <WButton wType="texted" span className = "table-black-column" clickAnimation = "ripple-dark" >
                    {props.subRegion.flag}
                </WButton>
            </div>
            <div className="landmarkColumn">
                <WButton wType="texted" span className = "table-blue-column" clickAnimation = "ripple-dark" onClick = {handleClickLandmark}>
                    <i className="material-icons">close</i>
                </WButton>
            </div>

            {
                showDeleteMap && <DeleteSubRegionConfirmation deleteSubRegion = {props.deleteSubRegion} subRegion = {props.subRegion} index = {props.index} setshowDeleteMap = {setshowDeleteMap}/> 
            }
      </div>


    );
};

export default SubRegionEntry;