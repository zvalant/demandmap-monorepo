import {Box, colors, Typography} from "@mui/material";
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, {
    timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';


import { POInfoGeneration } from "./helpers/POInfo.mjs";
import TimelineContainer from "./timeline-container";

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
    let accumulatedPO = part.attributes.accumulatedPO;
    console.log(part);
    for (const [key, value] of Object.entries(accumulatedPO)){
        let currentItem = POInfoGeneration({POData: accumulatedPO[key], currentStructure: part})
        remianingPOs.push(currentItem);

    }
    console.log("before reverse sort", remianingPOs);
    if (remianingPOs.length>1){
        remianingPOs.sort((a,b)=>new Date(a[0]).getTime()- new Date(b[0]).getTime());
        remianingPOs.reverse();
    }


    console.log("after reverse sort", remianingPOs);

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