import React                                from 'react';
import { useQuery } 	                    from '@apollo/client';
import * as queries				            from '../../cache/queries';
import RootRegionNavigatorEntry 			from './RootRegionNavigatorEntry';


const AncestorRegionNavigator = () => {
    const pathname = window.location.pathname 
    let _id = ""
    if (pathname.startsWith("/RegionSpreadSheet/")){
        _id = pathname.replace("/RegionSpreadSheet/","");
    }
    else if (pathname.startsWith("/RegionViewer/")){
        _id = pathname.replace("/RegionViewer/","");
    }
    let rootRegions = []
    const { data: dataRootsRegion, error: errorRootsRegion, loading: loadingRootsRegion} = useQuery(queries.GET_ROOTREGIONS_BYID, {variables: { regionId: _id }});
	if(loadingRootsRegion) { console.log(loadingRootsRegion, 'loading'); }
	if(errorRootsRegion) { console.log(errorRootsRegion, 'error'); }
	if(dataRootsRegion && dataRootsRegion.getRootRegionsById !== null) { 
        for(let rootRegion of dataRootsRegion.getRootRegionsById) {
			rootRegions.push(rootRegion)
		}
        rootRegions.pop();
    }
    
    return (
        <div style = {{float: "left"}}>
            {
            rootRegions.map((entry, index) => (
                <RootRegionNavigatorEntry 
                rootRegion ={entry} index = {index}
                />
            ))
            }
        </div>
    );
};


export default AncestorRegionNavigator;