import { DirectiveLocation } from 'graphql';
import React, { useState } 	from 'react';
import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol } from 'wt-frontend';

const SubRegionEntry = (props) => {
    // subRegion ={entry} renameRegion = {props.renameRegion}
    // deleteRegion = {props.deleteRegion} setActiveRegion = {props.setActiveRegion}
    

    return (
        <div className="spreadsheetTableCell">

            <div className="deleteColumn">
                
                
                <WButton wType ="texted" span className = "table-red-column" clickAnimation = "ripple-dark" >
                <i className="material-icons">close</i>

                </WButton>
            </div>
            <div className="nameColumn">
                <WButton wType="texted" span className = "table-blue-column" clickAnimation = "ripple-dark" >
                    {props.subRegion.name}
                </WButton>
            </div>
            <div className="capitalColumn">
                <WButton wType="texted" span className = "table-black-column" clickAnimation = "ripple-dark" >
                    {props.subRegion.capital}
                </WButton>
            </div>
            <div className="leaderColumn">
                <WButton wType="texted" span className = "table-black-column" clickAnimation = "ripple-dark" >
                    {props.subRegion.leader}
                </WButton>
            </div>
            <div className="flagColumn">
                <WButton wType="texted" span className = "table-black-column" clickAnimation = "ripple-dark" >
                    {props.subRegion.flag}
                </WButton>
            </div>
            <div className="landmarkColumn">
                <WButton wType="texted" span className = "table-blue-column" clickAnimation = "ripple-dark" >
                    <i className="material-icons">close</i>
                </WButton>
            </div>

      </div>


    );
};

export default SubRegionEntry;