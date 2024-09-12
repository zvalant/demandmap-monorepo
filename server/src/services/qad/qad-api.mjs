import axios from "axios";
import { QAD_API_BASE } from "./qad-api-info.mjs";

//fetch the data from QAD (our MRP System) baised on the part number used in http request*/

export const qadPartFetch = async (part) =>{
    //Fetch qad data and store data from API call
      try {
        const response = await axios.get(`${QAD_API_BASE}=${part}`);
        return response.data;
        
      }catch (error) {
          console.log(error);
          throw new Error("Empty response data");
        }
  
      }

