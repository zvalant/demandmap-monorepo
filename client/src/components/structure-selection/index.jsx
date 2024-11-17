import React, { useState } from "react";
import Autocomplete from '@mui/material/Autocomplete';
import { TextField,  Box } from "@mui/material";
import "./scrollbar.css"
/*
Purpose:
StructureSelection will take all available part structures
that are available to select. **MUI componenet includes 
no options display**
for 
*/



const StructureSelection = ({structures})=>{
    console.log(structures);


    return (
        <Box sx={{width: "180px", height: "60px",m:1
            
            
        }}>
            {structures && 
            <Autocomplete 
                id="free-solo-demo"

                options={structures.map((option) =>`${option.name} ${option.attributes.description}`)}
                renderInput={(params) => <TextField {...params} label="Part Structure" />}
            />
}
        </Box>
    
        
    )

}
export default StructureSelection;
