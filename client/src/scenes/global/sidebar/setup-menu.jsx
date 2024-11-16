import { Box, Button ,Autocomplete, TextField,useTheme, Typography} from "@mui/material";
//needs to be an array of part numbers later
import { tokens } from "../../../theme";
import { useContext, useState } from "react";
import { PartStructureContext } from "../../../context/part-structure-context/part-structure-context";
import "./setup-menu.styles.css"
import {STRUCTUREOPTIONS} from "../../../utils/misc.mjs"

const SetupMenu = ()=>{
    const theme = useTheme();
    const STRUCTUREOPTIONSLIST = [];
    const colors = tokens(theme.palette.mode);
    const [isSelectedPartStructure, setIsSelectedPartStructure] = useState("");
    const [isPartStructure,setIsPartStructure] = useState("");
    const [isStructureType, setIsStructureType] = useState("");
    const[isQuantity, setIsQuantity] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const {qty,setActiveStructureType,reqCount,setReqCount,setSubmittedQty,
        setSubmittedPartStructure, setSubmittedStructureType, partStructureOptions} = useContext(PartStructureContext);
    //field changes for qty strucutre type and part structure

    for (const STRUCTUREOPTION in STRUCTUREOPTIONS){
        STRUCTUREOPTIONSLIST.push(STRUCTUREOPTIONS[STRUCTUREOPTION]);

    }

    const handlePartStructureChange = (event)=>{
        setIsPartStructure(event.target.value);
    }

    const handleStructureTypeChange = (event)=>{
        setIsStructureType(event.target.value);

    }

    const handleQuantityChange = (event)=>{
        setIsQuantity(event.target.value);

    }
    // form submission handle function

    const handleSubmit = async(event)=>{

        let pulledStruture = isSelectedPartStructure;
        let parsedStructure = "";
        let idx = 0;
        try {
            while( idx< pulledStruture.length && pulledStruture[idx]+pulledStruture[idx+1]!== "||"){
                idx++;

            }

            parsedStructure = pulledStruture.slice(0,idx-1);
            setIsPartStructure(parsedStructure);

        }catch(err){
            console.log(err)
        }finally{


        }
        setIsSubmitted(true);
        setSubmittedQty(isQuantity)
        setSubmittedPartStructure(parsedStructure);
        setSubmittedStructureType(isStructureType);
        setReqCount(reqCount +1);
        


    }

    return (
        <Box minHeight="25vh" 
            overflow="hidden" 
            display="flex" flexDirection="column" 
            alignItems="center"
            >
            
        
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: "180px", 
                height: "70px",
                overflow: "hidden",
                
  
                
             }}>
                
                {partStructureOptions && 
                    <Autocomplete 
               
                    ListboxProps={{
                        style: {
                            '::WebkitScrollbar' :{
                            display: "scroll",
                            overflowX: "hidden",    
                            width: "0px", 

                            overflowX: "hidden",
                            },
                            '& ::WebkitScrollbarTrack':{
                            background: `${colors.primary[400]}`, 
                            borderRadius: "10px", 
                            },
                            
                            '&::WebkitScrollbarThumb': {
                            background: "#888",
                            borderRadius: "10px" 
                            },
                            
                            '&::WebkitScrollbarThumb:hover': {
                            background: "#555", 
                            },
                        
                          maxHeight: "200px",
                          overflow: "auto",
                    
                          

                          },
                        }}
                      
                    //need to change this after context implementation
                    onChange={(event, value) => {setIsSelectedPartStructure(value); setIsSubmitted(false)}}
                    getOptionLabel={(option) => option.toString()} 
                    
                    options={partStructureOptions.map((option) =>`${option.name} || ${option.description}`)}
                    renderInput={(params) => <TextField {...params} label="Part Structure" />}
                />              
                }
            </Box>
            <Box 
                display= "flex"
                flexDirection= "column"
                justifyContent= "center"
                width= "180px"
                height= "70px"
                overflow= "hidden">
                {STRUCTUREOPTIONSLIST && 
                <Autocomplete 
                    id="free-solo-demo"
                    onChange={(event, value) => {setIsStructureType(value);setIsSubmitted(false)}}
                    options={STRUCTUREOPTIONSLIST.map((option) =>`${option}`)}
                    renderInput={(params) => <TextField {...params} label="Structure Type" />}
                />}
            </Box>
            
            <Box 
                display= "flex"
                flexDirection= "column"
                justifyContent= "center"
                width= "180px"
                height= "70px"
                overflow= "hidden"
            >
            <TextField
                id="filled-search"
                label="Quantity"
                type="search"
                value={isQuantity}
                onChange={(event, value) => {setIsQuantity(event.target.value); setIsSubmitted(false);}}
            />
            </Box>
            <Button sx={{
                mt:.5,
              width: "180px",
              backgroundColor: colors.greenAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
        
            
        }}
        disabled = {isSubmitted}
        onClick={handleSubmit}>Submit</Button>
        </Box>
    )



    
}
export default SetupMenu;