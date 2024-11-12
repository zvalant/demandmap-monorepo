/*
Purpose: Contains data sections of the active top node.  Currently RemainingItems & 
PartInfo
*/

import { Box, Typography } from "@mui/material"
import RemaningItems from "../../../components/remaining-items";
import PartInfo from "../../../components/part-info";
import { useContext } from "react";
import { PartStructureContext } from "../../../context/part-structure-context/part-structure-context";
import * as React from 'react';
import ActivePOs from "../../../components/active-pos";

const DataMenu = ()=>{
    const {currentPartStructure} = useContext(PartStructureContext);


    return (
        <Box display="flex" flexDirection="column" >
            <Box display="flex" flexDirection= "column" alignItems="center">
                <Typography variant="h5">REMAINING ITEMS</Typography>
                <Box sx={{
                    mt: 2,
                    width: "100%",
                    maxHeight: "30vh",
                    minHeight: "10vh",
                    overflow: "scroll",
                    overflowX: "hidden",
                }}>
                <RemaningItems part={currentPartStructure}/>
                </Box>
            </Box>
                    
            <Box sx={{
                display: "flex",
                    mt: 2,
                    width: "100%",
                    maxHeight: "30vh",
                    minHeight: "10vh",
                    overflow: "scroll",
                    overflowX: "hidden",
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                <Typography variant = "h5">Active POs</Typography>
                <ActivePOs part = {currentPartStructure}/>

            </Box>
            <Box display="flex" flexDirection= "column" alignItems="center"
              >
              <Typography variant="h5">PART INFO</Typography>
              <PartInfo part={currentPartStructure}/>
            </Box>
        </Box>
        

    )

}

export default DataMenu;