import { DirectiveLocation } from 'graphql';
import React, { useState } 				from 'react';
import { WLayout, WLHeader, WLMain, WCol, WRow, WCContent, WButton } from 'wt-frontend';
import RegionEntry from './RegionEntry';


const RegionSpreadSheet = (props) => {
    const currentRegionName = props.activeRegion.name;
    
    // subRegions
    // activeRegion
    return (
        <div className = "regionSpreadSheet">
            <div class="SpreadSheet-title">
                    Region Name :
                     <span style={{paddingLeft: "3%"}}>{currentRegionName}</span>
            </div>
            <div class="SpreadSheet-icon">
                <WRow>
                    <WCol size="4">
                        <WButton wType="texted" span className = "SpreadSheet-table-icons-add" >
                            <i className="material-icons">add</i>
                        </WButton>
                    </WCol>
                    <WCol size="4">
                        <WButton wType="texted" span hoverAnimation = "darken" className = "SpreadSheet-table-icons-undo-redo" >
                            <i className="material-icons">undo</i>
                        </WButton>
                    </WCol>
                    <WCol size="4">
                        <WButton wType="texted" span hoverAnimation = "darken" className = "SpreadSheet-table-icons-undo-redo" >
                            <i className="material-icons">redo</i>
                        </WButton>
                    </WCol>
                </WRow>

            </div>

            <div class="SpreadSheet-tableHeader">

            </div>


            <div class="SpreadSheet-tableBody">

            </div>
        </div>

       
            /* <div className = "mapSelection-Ls">
            {
                entries.map((entry, index) => (
                    <RegionEntry 
                    map ={entry} renameMap = {props.renameMap}
                    deleteMap = {props.deleteMap} selectMap = {props.selectMap}
                    
                    />
                ))
                
            }
            </div>

            <div className = "mapSelection-Rs">
                
            <img style = {{height: "90%", width:"100%"}}src={require('../image/Welcome Earth.png')}/>
            <WButton className="modal-button " span clickAnimation="ripple-light" hoverAnimation="darken" color="primary" onClick = {setshowCreateMap}>
                Create New Map
			</WButton>
            

            </div>

            {
                showCreateMap && (<CreateMap setshowCreateMap={setshowCreateMap} addMap = {props.addMap}/>)
            } */
            
        

    );
};

export default RegionSpreadSheet;

                    
                