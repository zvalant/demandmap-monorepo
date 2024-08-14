import { Box, Autocomplete, TextField } from "@mui/material"

const StructureType = ({StructureOptions})=>{

    return (
    <Box sx={{width: "180px", height: "60px",m:1
        ,
        
    }}>
        {StructureOptions && 
        <Autocomplete 
            id="free-solo-demo"

            options={StructureOptions.map((option) =>`${option}`)}
            renderInput={(params) => <TextField {...params} label="Structure Type" />}
        />
}
    </Box>
    )

}
export default StructureType;