import { DirectiveLocation } from 'graphql';
import React, { useState } 	from 'react';
import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol } from 'wt-frontend';
import DeleteLandmarkConfirmation 							from '../modals/DeleteLandmarkConfirmation';

const LandmarkEntry = (props) => {
    let editable = props.index < props.regionLandmarkNum
    const [editing, toggleEditing] = useState(false);
    const [showDelete, toggleDeleting] = useState(false);



    const handleDelete = () =>{
        props.editLandmark(props.landmark,"",0);
        toggleDeleting(false);
    }
    
    const handleEdit = (e) =>{
        if(e.target.value){
            props.editLandmark(e.target.value,props.landmark,2);
        }
        toggleEditing(!editing)
    }

    return (
        <div>
                <div class="landmarkRow">
                    <div class="landmarkEdit">
                        {(editable)?
                            <WButton wType="texted" span clickAnimation = "ripple-light"  className = "landmark-edit-icon" onClick = {() => toggleEditing(!editing)}>
                                <i className="material-icons">edit</i>
                            </WButton>  
                    :
                            <></>
                        }
                    </div>
                    <div class="landmarkDelete">
                    {(editable)?
                            <WButton wType="texted" span clickAnimation = "ripple-light" className = "landmark-delete-icon" onClick = {() =>toggleDeleting(true)} >
                                <i className="material-icons">delete_outline</i>
                            </WButton>  
                    :
                            <></>
                    }
                    </div>
                    {
                        (editing)?
                        <WInput
                        className='landmarkText landmarkInput' onBlur = {handleEdit }
                        autoFocus={true}  type='text' color = "gray" defaultValue={props.landmark}
                        />
                        :
                        <div class="landmarkText">
                            {props.landmark}
                        </div>
                    }
                    
                </div>
                {
                showDelete && <DeleteLandmarkConfirmation handleDelete = {handleDelete}   showDelete = {showDelete} toggleDeleting = {toggleDeleting} /> 
                }
            
 
        </div>
    );
};

export default LandmarkEntry;