import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import RemaningItems from "../../components/remaining-items";
import { tokens } from "../../theme";
import MapViewport from "../../components/map-viewport";

const Dashboard = ()=>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box m="20px" backgroundColor={colors.primary[400]} border="5px" height="100vh" borderRadius="10px" overflow="hidden">
            <MapViewport/>
            
        </Box>

       
        
    )
  
}
export default Dashboard;