import {Box, Typography} from "@mui/material";
import Timeline from '@mui/lab/Timeline';



import { POInfoGeneration } from "./helpers/POInfo.mjs";
import TimelineContainer from "./timeline-container";
/*Purpose:
ActivePOs will take in the current part and pull the accumlated Pos 
and generate a line of any pos that can contribute to the required 
demand.

*/

const ActivePOs = ({part})=>{
    const remianingPOs = [];

    if (!part){
        return;
    }
    if (!part.attributes.accumulatedPO){
        return (
            <Box
            sx = {{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                mt:2
            }}>
                <Typography>NO Active POs</Typography>
            </Box>
        )
    }
    /*will map every Item and sort by date in ascending order
    */
    let accumulatedPO = part.attributes.accumulatedPO;
    for (const [key, value] of Object.entries(accumulatedPO)){
        let currentItem = POInfoGeneration({POData: accumulatedPO[key], currentStructure: part})
        remianingPOs.push(currentItem);

    }
    if (remianingPOs.length>1){
        remianingPOs.sort();
    }


    return (
        <Box
        sx = {{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "90%",
            mt: 1
        }}>
            <Timeline>
                {remianingPOs.map((po, index)=>(<TimelineContainer 
                    timelineInfo = {po}
                    index = {index}
                    poSize = {remianingPOs.length}/>))}
            </Timeline>

        </Box>




    )


}
export default ActivePOs;