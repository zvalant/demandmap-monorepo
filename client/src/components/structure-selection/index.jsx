import React, { useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';
import { testPart } from "../../data/test-data";
import { TextField,  Box } from "@mui/material";
import "./scrollbar.css"
import { ClassNames } from "@emotion/react";




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
