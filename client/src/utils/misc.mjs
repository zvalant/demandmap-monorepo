import axios from "axios";

/*
Purpose: 
format numbers in the display to be fixed to 2 decimal places.
*/
export const numFormat = (num)=>{
    try{
        num = Number(num).toFixed(2);
    }catch(e){
        console.log(e);
        num = "Not Found"
    }
    finally{
        return num;
    }
}

export const STRUCTUREOPTIONS = {
        available :"Available",
        onHand: "OnHand"
    }
export const qadPartFetch = async (part) =>{
    //Fetch qad data and store data from API call
        try {
        const response = await axios.get(`http://kc-qadprd-01:8080/qadui/cgi-bin/cgiip/WService=ws-default/us/xx/xxgetitemdata.p?item=${part}`);
        return response.data;
        
        }catch (error) {
            console.log(error);
            throw new Error("Empty response data");
        }
    
        }

