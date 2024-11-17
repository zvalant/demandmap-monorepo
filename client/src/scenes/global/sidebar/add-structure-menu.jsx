import { useContext, useState } from "react";
import { Box,TextField, Button, useTheme} from "@mui/material";
import { tokens } from "../../../theme";
import { PartStructureContext } from "../../../context/part-structure-context/part-structure-context";

/*
Purpose: 
AddPartStructure will have a text box and submit button to
allow a user to add a part structure if part structure is
not currently stored in DB.
*/
const AddPartStructure = () =>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isStructure, setIsStrucutre] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const {submittedStructureCount,setSubmittedStructureCount, setSubmittedStructureOption} = useContext(PartStructureContext);

    const handleSubmit = async(event)=>{
        setIsSubmitted(true);
        setSubmittedStructureCount(submittedStructureCount+1);
        setSubmittedStructureOption(isStructure);
        
       
    }

    return (
        <Box width="180px" 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        m={1}
        
        
        >
            <TextField
                id="filled-search"
                label="Add Structure"
                type="search"
                value={isStructure}
                onChange={(event, value)=>{setIsStrucutre(event.target.value); setIsSubmitted(false)}}
            />
            <Button sx={{
                width: "180px",
                backgroundColor: colors.greenAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
                m:1
            }}
            disabled = {isSubmitted}
            onClick={handleSubmit}>Submit</Button>
        </Box>

    )

}

export default AddPartStructure;