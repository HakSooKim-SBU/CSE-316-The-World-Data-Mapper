import React, { useState } 	from 'react';

import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol } from 'wt-frontend';

const DeleteLandmarkConfirmation = (props) => {

	return (
		<WModal className="modal" cover="true" visible={props.showDelete}>
			<WMHeader  className="modal-header" onClose={() => props.toggleDeleting(false)}>
				Confirm Deletion
			</WMHeader >
			
			<WMFooter>
			<WRow>

				<WCol size="4" className="modal-row">
					<WButton className="modal-button" onClick={() => props.handleDelete()}  span clickAnimation="ripple-light"  shape="rounded" color="modal-button">
						Delete
					</WButton>				
				</WCol>

				<WCol size="4">
					<div >&nbsp;</div>
				</WCol>

				<WCol size="4" className="modal-row">
					<WButton className="modal-button" onClick={() => props.toggleDeleting(false)} span clickAnimation="ripple-light"  shape="rounded" color="modal-button">
						Cancel
					</WButton>				
				</WCol>
						
			</WRow>

			</WMFooter>
		</WModal >
	);
}

export default DeleteLandmarkConfirmation;