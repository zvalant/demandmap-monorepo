import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';



const Quantity = ()=>{
    const [quantity, setQuantity] = useState("");
    

    const handleChange = (event)=>{
        const {value} = event.target;
        console.log(value);
        setQuantity(value);


    }

    return (
        <Box sx={{mb: 5, height: "20px",width: "180px", m:1}}>
            <TextField
                id="filled-search"
                label="Quantity"
                type="search"
            />


  

        </Box>

    )


}

export default Quantity;