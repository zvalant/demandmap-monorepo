import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import React from 'react';
import TimelineOppositeContent, {
    timelineOppositeContentClasses,
  } from '@mui/lab/TimelineOppositeContent';

/*Purpose:
TimelineContainer will take in the info for a purchase Item 
that is currently on order and create the component that 
will have the date of arrival on the left and the part number
and qty coming in by the arrival date.  
*/
const TimelineContainer = ({timelineInfo, index, poSize})=>{
    let date = timelineInfo[0];
    let qty = timelineInfo[1];
    let partNumber = timelineInfo[2];
    let description = timelineInfo[3];
    let isDemandMet = timelineInfo[4];

    if (index+1==poSize){
        return (
            <TimelineItem sx={{display: "flex", flexDirection: "row"}}>
            <TimelineOppositeContent sx={{width: "125px"
            }}>{date}</TimelineOppositeContent>
            <TimelineSeparator>
                { isDemandMet && <TimelineDot color='success'/>}
                { !isDemandMet && <TimelineDot color = 'warning'/>}
            </TimelineSeparator>
            <TimelineContent sx={{width: "125px"
            }}>{partNumber} <br/>{description} <br/>QTY: {qty}</TimelineContent>
        </TimelineItem>
        )

    }else{
        return(
            <TimelineItem sx={{display: "flex", flexDirection: "row"}}>
            <TimelineOppositeContent
            sx={{width: "125px"
            }}>{date}</TimelineOppositeContent>
            <TimelineSeparator>
            { isDemandMet && <TimelineDot color='success'/>}
            { !isDemandMet && <TimelineDot color = 'warning'/>}
                <TimelineConnector/>
            </TimelineSeparator>
            <TimelineContent
          sx={{width: "125px",
            whiteSpace: "pre-wrap"
          }}>{partNumber} <br/>{description} <br/>QTY: {qty}</TimelineContent>
        </TimelineItem>
            )

    }


}
export default TimelineContainer;
