import React, { useState } 	from 'react';
import { REGISTER }			from '../../cache/mutations';
import { useMutation }    	from '@apollo/client';

import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol } from 'wt-frontend';

const CreateAccount = (props) => {
	const [input, setInput] = useState({ email: '', password: '', name: '' });
	const [loading, toggleLoading] = useState(false);
	const [Register] = useMutation(REGISTER);

	
	const updateInput = (e) => {
		const { name, value } = e.target;
		const updated = { ...input, [name]: value };
		setInput(updated);
	};

	const handleCreateAccount = async (e) => {
		for (let field in input) {
			if (!input[field]) {
				alert('All fields must be filled out to register');
				return;
			}
		}
		const { loading, error, data } = await Register({ variables: { ...input } });
		if (loading) { toggleLoading(true) };
		if (error) { return `Error: ${error.message}` };
		if (data) {
			console.log(data)
			toggleLoading(false);
			if(data.register.email === 'already exists') {
				alert('User with that email already registered');
			}
			else {
				props.fetchUser();
			}
			props.setShowCreate(false);

		};
	};

	return (
		<WModal className="modal"  cover="true" visible={props.setShowCreate}>
			<WMHeader  className="modal-header" onClose={() => props.setShowCreate(false)}>
				Create A New Account
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
										barAnimation="solid" labelText="Password" wType="outlined" inputType="password" 
									/>
								</WCol>
							</WRow>

					</WMMain>
			}

			<WMFooter>
				<WRow>

					<WCol size="4" className="modal-row">
						<WButton className="modal-button " onClick={handleCreateAccount} span clickAnimation="ripple-light"  shape="rounded" color="modal-button">
							Register
						</WButton>					
					</WCol>

					<WCol size="4">
						<div >&nbsp;</div>
					</WCol>

					<WCol size="4" className="modal-row">
						<WButton className="modal-button " onClick={() => props.setShowCreate(false)} span clickAnimation="ripple-light" shape="rounded" color="modal-button">
							Cancel
						</WButton>				
					</WCol>
						
				</WRow>
			</WMFooter>
			
		</WModal>
	);
}

export default CreateAccount;
