import { Typography, Box,TextField, Button, useTheme} from "@mui/material";
import { tokens } from "../../theme";

const AddPartStructure = () =>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


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
            />
            <Button sx={{
                width: "180px",
                backgroundColor: colors.greenAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
                m:1
            }}>Submit</Button>
        </Box>

    )

}

export default AddPartStructure;