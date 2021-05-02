import React, { useState } 	from 'react';

const Welcome = (props) => {
    return (
		
        <div class = "welcome">
			<img style = {{borderRadius: "30px"}} src={require('../image/Welcome Earth.png')}/>
			<div>
				Welcome To The World Data Mapper
			</div>
		</div>
    
    );
};

export default Welcome