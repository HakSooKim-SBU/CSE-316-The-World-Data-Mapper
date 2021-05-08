import React, { useState } 	from 'react';

import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol } from 'wt-frontend';

const DeleteMapConfirmation = (props) => {

    const handleDeleteMap = (e) => {
        props.deleteSubRegion(props._id);
		props.setshowDeleteMap();
    }

	return (
		<WModal className="modal" cover="true" visible={props.setshowDeleteMap}>
			<WMHeader  className="modal-header" onClose={() => props.setshowDeleteMap()}>
				Confirm Deletion
			</WMHeader >
			
			<WMFooter>
			<WRow>

				<WCol size="4" className="modal-row">
					<WButton className="modal-button" onClick={() => handleDeleteMap()}  span clickAnimation="ripple-light"  shape="rounded" color="modal-button">
						Delete
					</WButton>				
				</WCol>

				<WCol size="4">
					<div >&nbsp;</div>
				</WCol>

				<WCol size="4" className="modal-row">
					<WButton className="modal-button" onClick={() => props.setshowDeleteMap()} span clickAnimation="ripple-light"  shape="rounded" color="modal-button">
						Cancel
					</WButton>				
				</WCol>
						
			</WRow>

			</WMFooter>
		</WModal >
	);
}

export default DeleteMapConfirmation;