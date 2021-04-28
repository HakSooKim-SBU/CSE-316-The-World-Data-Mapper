import React, { useState } 	from 'react';
import { useMutation }    	from '@apollo/client';
import { UPDATE }			from '../../cache/mutations';


import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol } from 'wt-frontend';

const UpdateAccount = (props) => {
	const [input, setInput] = useState({ email: '', password: '', name: '' });
	const [loading, toggleLoading] = useState(false);
	const [Update] = useMutation(UPDATE);

	
	const updateInput = (e) => {
		const { name, value } = e.target;
		const updated = { ...input, [name]: value };
		setInput(updated);
	};

	const handleUpdateAccount = async (e) => {
		for (let field in input) {
			if (!input[field]) {
				alert('All fields must be filled out to update');
				return;
			}
		}
		const { loading, error, data } = await Update({ variables: { ...input } });
		if (loading) { toggleLoading(true) };
		if (error) { return `Error: ${error.message}` };
		if (data) {
			console.log(data)
			toggleLoading(false);
			props.fetchUser();
			props.setShowUpdate(false);

		};
	};

	return (
		<WModal className="modal"  cover="true" visible={props.showUpdate}>
			<WMHeader  className="modal-header" onClose={() => props.setShowUpdate(false)}>
                Enter Updated Account Information
			</WMHeader>

			{
				loading ? <div />
					: <WMMain>
							<WRow className="modal-col-gap modal ">
								<WCol size="3" className="modal-row">
									<div>Name : </div>
								</WCol>
								
								<WCol size="9">
									<WInput 
										className="modal-input" onBlur={updateInput} name="name" labelAnimation="up" 
										barAnimation="solid" labelText="Name" wType="outlined" inputType="text" 
									/>
								</WCol>
							</WRow>

							<div className="modal-spacer">&nbsp;</div>

							<WRow className="modal-col-gap modal">

								<WCol size="3" className="modal-row">	
									<div>Email : </div>
								</WCol>
								<WCol size="9">
									<WInput 
										className="modal-input" onBlur={updateInput} name="email" labelAnimation="up" 
										barAnimation="solid" labelText="Email Address" wType="outlined" inputType="text" 
									/>
								</WCol>
							</WRow>

							<div className="modal-spacer">&nbsp;</div>

							<WRow className="modal-col-gap modal">
								<WCol size="3" className="modal-row">
									<div>Password : </div>
								</WCol>
								<WCol size="9">
									<WInput 
										className="modal-input" onBlur={updateInput} name="password" labelAnimation="up" 
										barAnimation="solid" labelText="Password" wType="outlined" inputType="text" 
									/>
								</WCol>
							</WRow>

					</WMMain>
			}

			<WMFooter>
				<WRow>

					<WCol size="4" className="modal-row">
						<WButton className="modal-button " onClick={handleUpdateAccount} span clickAnimation="ripple-light"  shape="rounded" color="modal-button">
							Update
						</WButton>					
					</WCol>

					<WCol size="4">
						<div >&nbsp;</div>
					</WCol>

					<WCol size="4" className="modal-row">
						<WButton className="modal-button " onClick={() => props.setShowUpdate(false)} span clickAnimation="ripple-light" shape="rounded" color="modal-button">
							Cancel
						</WButton>				
					</WCol>
						
				</WRow>
			</WMFooter>
			
		</WModal>
	);
}

export default UpdateAccount;
