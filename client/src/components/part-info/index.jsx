import { Box, Typography, useTheme} from "@mui/material";
import { tokens } from "../../theme";


/*
Purpose: Provide General part info in the data section. Items are currently all static but could vary data dependent
on structure type in the future. 


*/

const PartInfo = ({part})=>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    //will need to change math for structure selection only set for available
    if (!part){
        return ;
    }

    return (
        <Box m={2}>
            <Typography variant="h6">Part Number: {part.name}</Typography>
            <Typography variant="h6">Desc: {part.attributes.description}</Typography>
            <Typography variant="h6">Cost: ${part.attributes.cost}</Typography>
            <Typography variant="h6">Qty Req: {part.attributes.demand}</Typography>
            <Typography variant="h6">Qty On Hand: {part.attributes.qty+part.attributes.qtyAllocated}</Typography>
            <Typography variant="h6">Qty Available: {part.attributes.qty}</Typography>


            
        </Box>

    )
}
export default PartInfo;