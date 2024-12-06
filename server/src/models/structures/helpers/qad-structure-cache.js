import { QAD_API_BASE } from "../../../services/qad/qad-api-info.js";
import axios from "axios";


export async function qadCache(currentLevelParts){
    let partCache = {}
    try{
        let testResponse = await axios.get(`${QAD_API_BASE}=${currentLevelParts[0]}`)
        if (!testResponse.data.ItemInv[0]){
            throw new Error("Invalid Structure Request");

        }
       

    }catch{
        return console.error("Invalid Request");
    }
    try{    
        while (currentLevelParts.length>0){
        let axiosCalls = [];
        let currentLevelResponse = null;
        for (let i = 0; i< currentLevelParts.length;i++){
            axiosCalls.push(axios.get(`${QAD_API_BASE}=${currentLevelParts[i]}`));
    
        }
        currentLevelResponse =await Promise.all(axiosCalls);
        let currentLevelCache = {};
        currentLevelParts = [];
        for (let i =0;i<currentLevelResponse.length;i++){
            let currentPartData = currentLevelResponse[i].data.ItemInv[0];
            currentLevelCache[currentPartData.Part] = currentPartData;
            if (currentPartData.ItemBOM){
                for (let i = 0; i< currentPartData.ItemBOM.length;i++){
                    currentLevelParts.push(currentPartData.ItemBOM[i].Comp)
                }
            }
        }
        partCache = {...partCache, ...currentLevelCache};
    }
    return partCache;



    }catch{
        console.error("QAD Cache generaton failure");
    }

}

