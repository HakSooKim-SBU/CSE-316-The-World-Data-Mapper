import React from 'react';
import { WButton }                from 'wt-frontend';


const Logo = (props) => {
    return (
        <WButton className="logo" onClick={props.goHome} wType="texted">
            The World Data Mapper
        </WButton>
    );
};

export default Logo;