import React, { useState } 	from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

const Welcome = (props) => {
    return (
		(props.auth)?  <Redirect exact from="/welcome" to = {"/MapSelection/" + props.user._id} /> : 
	
        <div class = "welcome">
			<img style = {{borderRadius: "30px"}} src={require('../image/Welcome Earth.png')}/>
			<div>
				Welcome To The World Data Mapper
			</div>
		</div>
    
    );
};

export default Welcome