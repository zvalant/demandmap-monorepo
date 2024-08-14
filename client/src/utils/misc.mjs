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
/*
Purpose: 
fetch the data from QAD (our MRP System) baised on the part number used in http request*/

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


export const STRUCTURETYPESTITLES = {
        available :"Available",
        onHand: "OnHand"
    }
