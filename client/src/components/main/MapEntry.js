import { DirectiveLocation } from 'graphql';
import React, { useState } 	from 'react';
import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol } from 'wt-frontend';
import DeleteMapConfirmation 							from '../modals/DeleteMapConfirmation';

const MapEntry = (props) => {

    let name = props.map.name;


    const [showDeleteMap, toggleShowDeleteMap] = useState(false);

    const setshowDeleteMap = () => {
		toggleShowDeleteMap(!showDeleteMap);
	};

    const [editingMapName, toggleMapName] = useState(false);

    
    const handleRenameRegion = (e) => {
        toggleMapName(!editingMapName);
        let newName = e.target.value;
        if (e.target.value == ""){
            newName = props.map.name;
        }
        props.renameRegion(props.map._id, newName);
    }

    const handleClickMap = (e) =>{
        props.handleMapClick(props.map._id);
    }

    return (
        <div>
            
                <WRow className='table-entry'>
                    <WCol size="8">
                        {editingMapName ?
                        <WInput
                        wType = "lined"
                        className='table-input table-input-class' onBlur={handleRenameRegion}
                        autoFocus={true} defaultValue={name} type='text' color = "gray"
                        
                        />
                        :
                        <WButton className = "mapSelection-button" color= "mapSelection-Ls" onClick = {handleClickMap} >
                        {name}
                        </WButton>

                        }
                    </WCol>
                    <WCol size="2">
                        <WButton className = "mapSelection-button" color= "mapSelection-Ls" onClick={setshowDeleteMap} >
                            <i className="material-icons">close</i>
                        </WButton>
                    </WCol>
                    <WCol size="2">
                        <WButton className = "mapSelection-button" color= "mapSelection-Ls" onClick={() => toggleMapName(!editingMapName)} >
                            <i className="material-icons">edit</i>
                        </WButton>
                    </WCol>
                </WRow>

                {
                showDeleteMap && <DeleteMapConfirmation deleteRegion = {props.deleteRegion} _id = {props.map._id} setshowDeleteMap = {setshowDeleteMap}/> 
                }
        </div>


    );
};

export default MapEntry;