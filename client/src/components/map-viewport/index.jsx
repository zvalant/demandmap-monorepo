import { useContext, useState } from "react";
import React from "react";
import Tree from "react-d3-tree";
import { CircularProgress, Box, Typography} from "@mui/material/";
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import { useCenteredTree } from "./helpers.jsx";
import { testPart } from "../../data/test-data.mjs";
import {PartStructureContext} from "../../context/part-structure-context/part-structure-context.jsx";
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";
import "./map.styles.css";
/*
Purpose: The renderCard is used to import a custom object to be compatable with the react-d3-tree
with this format can not use React hooks.
*/
const renderCard = ({ nodeDatum, foreignObjectProps = {}, addToStructures,currentPartStructure}) => {

  let currentLocationSize = -1;
  let nodeLocationSize = -1;
  let background = "";

  if (nodeDatum.attributes.isDemandMet){
    background = "#117d16"
  }else if (nodeDatum.attributes.isComponentDemandMet){
    background="#FFA000"

  }else{
    background= "#2a329a"
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

    return (
      <React.Fragment>
        <foreignObject
          {...foreignObjectProps}
          width="445"
          height="245"
          x="-210"
          y="-30"
          onClick= {()=>{currentLocationSize!== nodeLocationSize &&  handleClick()}}

        >
          <Box sx={{ 
            backgroundColor: {background} ,
            width: "440px",
            height: "240px", 
            display: "flex", 
            flexDirection: "column" ,
            textAlign: "left", 
            border:"5px solid ", 
            borderRadius: "40px", 
            justifyContent: "top", 
            borderColor:"black",
            "&:hover": {
              borderColor: "#ffffff", 
             }
            
          }}
            
          >
            <Box m={4}>
              <Typography variant="h1">{nodeDatum.name}</Typography>
              <Typography variant="h2">{nodeDatum.attributes.description}</Typography>
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
              nodeSize={{x: 110+(JSON.stringify(currentPartStructure).length/1000), y: 250 + (JSON.stringify(currentPartStructure).length/100)
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
                  renderCard({ ...rd3tProps,addToStructures,currentPartStructure})
                  
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