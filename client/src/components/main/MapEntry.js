import { DirectiveLocation } from 'graphql';
import React, { useState } 	from 'react';
import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol } from 'wt-frontend';

const MapEntry = (props) => {

    let name = props.map.name;

    const [editingMapName, toggleMapName] = useState(false);

    

    const handleRenameMap = (e) => {
        toggleMapName(!editingMapName);
        let newName = e.target.value;
        props.renameMap(props.map._id, newName);
    }

    const handleDeleteMap = (e) => {
        props.deleteMap(props.map._id)
    }

    const handleClickMap = (e) =>{
        props.selectMap(props.map)
    }


    return (
        <WRow className='table-entry'>
            <WCol size="8">
                {editingMapName ?
                <WInput
                wType = "lined"
                className='table-input table-input-class' onBlur={handleRenameMap}
                autoFocus={true} defaultValue={name} type='text' color = "gray"
                
                />
                :
                <WButton className = "mapSelection-button" color= "mapSelection-Ls" onClick = {handleClickMap} >
                {name}
                </WButton>

                }
            </WCol>
            <WCol size="2">
                <WButton className = "mapSelection-button" color= "mapSelection-Ls" onClick={() => handleDeleteMap()} >
                    <i className="material-icons">close</i>
                </WButton>
            </WCol>
            <WCol size="2">
                <WButton className = "mapSelection-button" color= "mapSelection-Ls" onClick={() => toggleMapName(!editingMapName)} >
                    <i className="material-icons">edit</i>
                </WButton>
            </WCol>

        </WRow>


    );
};

export default MapEntry;