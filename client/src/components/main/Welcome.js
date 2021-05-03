import React, { useState } 	from 'react';
import { Redirect } from 'react-router';

const Welcome = (props) => {
	// let userId = (props.user) ? props.user._id : " ";
	// const to = "/MapSelection/" + userId;
	// if ()
    return (
		(props.user !== null)?  <Redirect from='/' to = {`/MapSelection/${props.user._id}`} /> :
        <div class = "welcome">
			<img style = {{borderRadius: "30px"}} src={require('../image/Welcome Earth.png')}/>
			<div>
				Welcome To The World Data Mapper
			</div>
		</div>
    
    );
};

export default Welcome