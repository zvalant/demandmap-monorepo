import { Box, colors, Typography } from "@mui/material";
import ItemContaioner from "./item-container";

/*
Purpose: 
Remaining Items will check if there are any children 
in the current structure and if so will map all
children to ItemContainer.
*/
const RemaningItems = ({part})=>{
    const incompleteParts = [];
    if (!part){
        return ;
    }
    if ('children' in part){
        for (const child of part.children){
            if (!child.attributes.isDemandMet){

            incompleteParts.push(child);
            }
        }
    }
    if (incompleteParts.length<1){
        return (
        <Box
        sx={{display: "flex", 
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
        
        }}><Typography variant="h5">No Remaining Items</Typography></Box>
    )
    }
    return (
        <Box 
        sx={{display: "flex", 
            flexDirection: "column",
            justifyContent: "center",
            width: "90%",
        }}
        >
            {incompleteParts.map(component=><ItemContaioner component={component}/>)}
        </Box>
    )


}

export default RemaningItems;