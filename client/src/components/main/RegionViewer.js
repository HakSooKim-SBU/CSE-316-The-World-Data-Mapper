import React, { useState } 				from 'react';
import { WLayout, WLHeader, WLMain, WLSide, WInput, WRow, WCol, WButton } from 'wt-frontend';


const RegionViewer = (props) => {
    const region = props.activeRegion
    
    return (
        <div class="regionViewer">
            <div class="regionViewerLS">
                <div class="regionViewer-icons">
                    <WButton wType="texted" className = "regionViewer-icon" clickAnimation = "ripple-light" shape = "Rounded" >
                        <i className="material-icons">add</i>
                    </WButton>
                    <WButton wType="texted" className = "regionViewer-icon" clickAnimation = "ripple-light" shape = "Rounded" >
                        <i className="material-icons">add</i>
                    </WButton>
                </div>
                <div class="regionViewer-flag"></div>
                <div class="regionViewer-space"></div>
                <div class="regionViewer-textbox">
                <WRow>
                    <WCol size ="12" className = "RegionViewerText">
                        Region Name:  {region.name}; 
                    </WCol>
                </WRow>
                <WRow>
                    <WCol size ="12"  className = "RegionViewerText">
                        Parent Region:  <span style={{paddingLeft: "3%"}}>{props.activeRegion.name}</span>
                    </WCol>
                </WRow>
                <WRow>
                    <WCol size ="12"  className = "RegionViewerText">
                        Region Capital:  {region.capital}; 
                    </WCol>

                </WRow>
                <WRow>
                    <WCol size ="12"  className = "RegionViewerText">
                        Region Leader:  {region.leader}; 
                    </WCol>
                </WRow>
                <WRow>
                    <WCol size ="12"  className = "RegionViewerText">
                        # Of Sub Regions:  {region.subRegion.length};
                    </WCol>
                </WRow>
                </div>
            </div>
            <div class="regionViewerEmptyColumn">

            </div>
            <div class="regionViewerRS">
                <div class="regionViewer-LMheader">
                    Region LandMark
                </div>
                <div class="regionViewer-LMtable"></div>
                <div class="regionViewer-LMaddbox">
                <WRow>
                    <WCol size="1">
                        <WButton wType="Ghost" span className = "regionViwer-add" clickAnimation = "ripple-light" >
                            <i className="material-icons">add</i>
                        </WButton>
                    </WCol>
                    <WCol size="11">
                        <WInput 
                            className="regionViewer-landmarkInput" name="password" labelAnimation="shrink" filled = "filled"
                            barAnimation="left-to-right" labelText="Enter Landmark" wType="outlined"  
                        />
                    </WCol>
                </WRow>


                </div>
            </div>
        </div>        
        

    );
};

export default RegionViewer;