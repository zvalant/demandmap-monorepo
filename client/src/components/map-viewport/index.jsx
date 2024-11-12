import { useContext, useState } from "react";
import React from "react";
import Tree from "react-d3-tree";
import { CircularProgress, Box, Typography} from "@mui/material/";
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import { useCenteredTree } from "./helpers.jsx";
import {PartStructureContext} from "../../context/part-structure-context/part-structure-context.jsx";
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";
import { STRUCTUREOPTIONS, numFormat } from "../../utils/misc.mjs";
import "./map.styles.css";
/*
Purpose: The renderCard is used to import a custom object to be compatable with the react-d3-tree
with this format can not use React hooks.
*/
const renderCard = ({ nodeDatum, foreignObjectProps = {}, addToStructures,currentPartStructure, activeStructureType}) => {

  let currentLocationSize = -1;
  let nodeLocationSize = -1;
  let background = "";

  if (nodeDatum.attributes.isDemandMet){
    background = "#117D16"
  }
  else if (nodeDatum.attributes.isComponentDemandMet){
    background="#d27600"

  }
  else if(!nodeDatum.attributes.isPODemandMet&& nodeDatum.attributes.purchasePart){
    background= "#FF0000"
  }else{
    background= "#2A329A"
  }


  if ( currentPartStructure.attributes.location !== undefined){
    currentLocationSize = currentPartStructure.attributes.location.length;
  }

  if (nodeDatum.attributes.location!== undefined){
    nodeLocationSize = nodeDatum.attributes.location.length;
  }
  const handleClick = ()=>{
    let location = nodeDatum.attributes.location;
    addToStructures(location);
    console.log(foreignObjectProps);


  }

  const demand = numFormat(nodeDatum.attributes.demand);
  const qty = numFormat(nodeDatum.attributes.qty);

    return (
      <React.Fragment>
        <foreignObject
          {...foreignObjectProps}
          width="460px"
          height="300px"
          x="-210"
          y="-30"
          onClick= {()=>{currentLocationSize!== nodeLocationSize &&  handleClick()}}

        >
          <Box sx={{ 
            backgroundColor: {background} ,
            width: "450px",
            height: "290px", 
            display: "flex", 
            flexDirection: "column" ,
            textAlign: "left", 
            border:"5px solid ", 
            borderRadius: "40px", 
            justifyContent: "top", 
            alignItems: "center",
            borderColor:"black",
            "&:hover": {
              borderColor: "#ffffff", 
             }
            
          }}
            
          >
            <Box m={4}>
              <Typography variant="h1">{nodeDatum.name}</Typography>
              <Typography sx={{width: "400px", overflowWrap: "break-word", maxHeight: "115px", overflow: "hidden"}} variant="h2">DESC: {nodeDatum.attributes.description}</Typography>
              <Typography variant="h2">QTY REQ: {demand}</Typography>
              { STRUCTUREOPTIONS.OnHand == activeStructureType && <Typography variant="h2">ONHAND: {qty}</Typography>}
              { STRUCTUREOPTIONS.Available == activeStructureType && <Typography variant="h2">AVAILABLE: {qty}</Typography>}
            </Box>
          </Box>
        </foreignObject>
      </React.Fragment>
    );
  };

  /*
  Purpose: MapViewport will display the react-d3-tree based off of currentPartStructure.  
  */
const MapViewport = ()=>{
    const {isLoading,addToStructures,activeStructureType,partStructures, currentPartStructure, changeToStructure} = useContext(PartStructureContext);
    const [dimensions, translate] = useCenteredTree();

    const handleClick = ()=>{
      let index = partStructures.length;
      changeToStructure(index);

    }

    return (
      <Box height="100%"
      >

          {isLoading &&<Box display="flex" justifyContent="center" alignItems="center" height="100%"><CircularProgress size={220} thickness={4.5} color="primary" />
          </Box>}
          {currentPartStructure!== undefined && !isLoading&&
          <Box height="100vh" width="100%"><Tree
              nodeSize={{x: 115+(JSON.stringify(currentPartStructure).length/1000), y: 290 + (JSON.stringify(currentPartStructure).length/100)
            }}
              pathFunc="beizer curves"
              svgClassName="pathlines"
              scaleExtent={{min:.005,max:1}}
              separation={{ siblings: 4, nonSiblings: 4 }}
              data={currentPartStructure}
              dimensions={dimensions}
              translate={translate}
              orientation = "vertical"
              centeringTransitionDuration={200}
              renderCustomNodeElement={(rd3tProps) =>
                  renderCard({ ...rd3tProps,addToStructures,currentPartStructure, activeStructureType })
                  
              }
          />
          </Box>}
          {currentPartStructure!== undefined && !isLoading && 
          <Box 
          position="absolute" 
          top="150px" 
          right = "50px" 
          display="flex" 
          flexDirection="row" 
          alignContent="center">{ partStructures.length >1 && <ArrowBackIosOutlinedIcon sx={{
            fontSize: 30 ,
            cursor: "pointer",
            "&:hover": {
              transform: "scale(1.15)"},
           }} onClick = {()=>handleClick()}/>}<Typography variant="h3">{currentPartStructure.name}</Typography></Box>}
          

      </Box>

  )
}
export default MapViewport;