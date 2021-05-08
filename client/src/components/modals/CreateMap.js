import React, { useState } 	from 'react';

import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol } from 'wt-frontend';

const CreateMap = (props) => {
	
	const [input, setInput] = useState("");

    // const handleCreateMap

	const updateInput = (e) => {
		setInput(e.target.value);
	}

    const handleCreateNewMap = (e) => {
		if (input === ""){
			props.addMap("Not Assigned");
		}
        else{
			props.addMap(input);
		}
        props.setshowCreateMap();
    };

	return (
		<WModal className="modal" cover="true" visible={props.setshowCreateMap}>
			<WMHeader  className="modal-header" onClose={() => props.setshowCreateMap()}>
				Create New Map
			</WMHeader >

					<WMMain>
						<WInput className="modal-input" onBlur={updateInput}  labelAnimation="up" barAnimation="solid" labelText="New Map Name" wType="outlined" inputType='text' />
						<div className="modal-spacer">&nbsp;</div>
					</WMMain >
			
			<WMFooter>
			<WRow>

				<WCol size="4" className="modal-row">
					<WButton className="modal-button" onClick={handleCreateNewMap}  span clickAnimation="ripple-light"  shape="rounded" color="modal-button">
						Create
					</WButton>				
				</WCol>

				<WCol size="4">
					<div >&nbsp;</div>
				</WCol>

				<WCol size="4" className="modal-row">
					<WButton className="modal-button" onClick={() => props.setshowCreateMap()} span clickAnimation="ripple-light"  shape="rounded" color="modal-button">
						Cancel
					</WButton>				
				</WCol>
						
			</WRow>

			</WMFooter>
		</WModal >
	);
}

export default CreateMap;