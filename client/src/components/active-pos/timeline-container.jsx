import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, {
    timelineOppositeContentClasses,
  } from '@mui/lab/TimelineOppositeContent';


const TimelineContainer = ({timelineInfo, index, poSize})=>{
    let date = timelineInfo[0];
    let qty = timelineInfo[1];
    let partNumber = timelineInfo[2];
    if (index+1==poSize){
        return (
            <TimelineItem sx={{display: "flex", flexDirection: "row"}}>
            <TimelineOppositeContent sx={{width: "110px"
            }}>{date}</TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineDot/>
            </TimelineSeparator>
            <TimelineContent sx={{width: "110px"
            }}>{partNumber} QTY: {qty}</TimelineContent>
        </TimelineItem>
        )

    }else{
        return(
            <TimelineItem sx={{display: "flex", flexDirection: "row"}}>
            <TimelineOppositeContent
            sx={{width: "110px"
            }}>{date}</TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineDot/>
                <TimelineConnector/>
            </TimelineSeparator>
            <TimelineContent
          sx={{width: "110px"
          }}>{partNumber} QTY: {qty}</TimelineContent>
        </TimelineItem>
            )

    }


}
export default TimelineContainer;
