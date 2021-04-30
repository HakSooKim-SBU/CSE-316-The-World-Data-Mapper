import { DirectiveLocation } from 'graphql';
import React, { useState } 				from 'react';
import { WLayout, WLHeader, WLMain, WCol, WRow, WCContent, WButton } from 'wt-frontend';
import SubRegionEntry from './SubRegionEntry';


const RegionSpreadSheet = (props) => {
    const currentRegionName = props.activeRegion.name;
    let entries = props.subRegions;
    // subRegions
    // activeRegion
    return (
        <div className = "regionSpreadSheet">

            <div class="SpreadSheet-icon">
                <WRow>
                    <WCol size="4">
                        <WButton wType="texted" span className = "SpreadSheet-table-icons-add" clickAnimation = "ripple-light" shape = "pill" onClick = {props.addSubRegion} >
                            <i className="material-icons">add</i>
                        </WButton>
                    </WCol>
                    <WCol size="4">
                        <WButton wType="texted" span hoverAnimation = "darken" className = "SpreadSheet-table-icons-undo-redo" clickAnimation = "ripple-light" shape = "pill" >
                            <i className="material-icons">undo</i>
                        </WButton>
                    </WCol>
                    <WCol size="4">
                        <WButton wType="texted" span hoverAnimation = "darken" className = "SpreadSheet-table-icons-undo-redo" clickAnimation = "ripple-light" shape = "pill" >
                            <i className="material-icons">redo</i>
                        </WButton>
                    </WCol>
                </WRow>

            </div>

            <div class="SpreadSheet-title">
                    Region Name : <span style={{paddingLeft: "3%"}}>{currentRegionName}</span>
            </div>
            
            <div class="SpreadSheet-empty"></div>

            <div class="SpreadSheet-titleHeader"> 
                <WButton wType="texted" span clickAnimation = "ripple-light" className = "SpreadSheet-Header-icons" >
                    Name<span style={{paddingLeft: "15px"}}></span><i className="material-icons">arrow_downward</i>
                </WButton>
            </div>
            <div class="SpreadSheet-capitalHeader"> 
                <WButton wType="texted" span clickAnimation = "ripple-light" className = "SpreadSheet-Header-icons" >
                    Capital<span style={{paddingLeft: "15px"}}></span><i className="material-icons">arrow_downward</i>
                </WButton>
            </div>
            <div class="SpreadSheet-leaderHeader">
                <WButton wType="texted" span clickAnimation = "ripple-light" className = "SpreadSheet-Header-icons" >
                    Leader<span style={{paddingLeft: "15px"}}></span><i className="material-icons">arrow_downward</i>
                </WButton>
            </div>
            <div class="SpreadSheet-flagHeader">
                <WButton wType="texted" span clickAnimation = "ripple-light" className = "SpreadSheet-Header-icons" >
                    Flag<span style={{paddingLeft: "15px"}}></span><i className="material-icons">arrow_downward</i>
                </WButton>
            </div>
            <div class="SpreadSheet-landmarkHeader">
                <WButton wType="texted" span clickAnimation = "ripple-light" className = "SpreadSheet-Header-icons" >
                    Landmarks<span style={{paddingLeft: "15px"}}></span><i className="material-icons">arrow_downward</i>
                </WButton>    
            </div>



            <div class="SpreadSheet-tableBody">
            {
                entries.map((entry, index) => (
                    <SubRegionEntry 
                    subRegion ={entry} setShowViewer = {props.setShowViewer} 
                   setActiveRegion = {props.setActiveRegion} 
                    />
                ))
                
            }

            </div>




        </div>

       
        
        

    );
};

export default RegionSpreadSheet;

                    
                