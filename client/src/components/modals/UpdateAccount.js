import React, { useState } 	from 'react';
import { useMutation,useApolloClient }    	from '@apollo/client';
import { UPDATE }			from '../../cache/mutations';
import { useQuery } 	from '@apollo/client';
import * as queries				from '../../cache/queries';
import { LOGOUT }                           from '../../cache/mutations';
import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol } from 'wt-frontend';
import {useHistory } from 'react-router-dom';

const UpdateAccount = (props) => {
	const [Logout] = useMutation(LOGOUT);
    const client = useApolloClient();
	let user = null;
	let history = useHistory();
	const { loading: userLoading, error: userError, data: userData, refetch: userRefetch } = useQuery(queries.GET_DB_USER);
	
    if(userError) { console.log(userError); }
	if(userLoading) { console.log(loading); }
	if(userData) { 
		let { getCurrentUser } = userData;
		if(getCurrentUser !== null) { user = getCurrentUser; }
    }


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
			if(data.updateAccount.email === 'already exists') {
				alert('User with that email already registered');
				return;
			}
			console.log(data)
			toggleLoading(false);
			props.setShowUpdate(false);
			props.fetchUser();
			Logout();
			const { data:fetchData } = await props.fetchUser();
        if (fetchData) {
            let reset = await client.resetStore();
            if (reset) {
            }
            history.replace("/");
        }



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
										barAnimation="solid" labelText={(user)?user.name:""} wType="outlined" inputType="text" 
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
										barAnimation="solid" labelText={(user)?user.email:""} wType="outlined" inputType="text" 
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
										barAnimation="solid" labelText="********" wType="outlined" inputType="password" 
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
