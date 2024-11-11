import { Box, colors, Typography } from "@mui/material";
import ItemContaioner from "./item-container";
const RemaningItems = ({part})=>{
    const incompleteParts = [];
    if (!part){
        return ;
    }
    console.log(part);
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