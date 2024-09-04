import {getAllStructures, getActiveStructure} from "../../models/structures/structures.model.mjs"
import { qadPartFetch } from "../../services/qad-api.mjs";

export async function httpGetAllStructures(req,res){
    if (!await getAllStructures()){
        return res.status(404).json({"err": "Not Found"})


    }
    const response = await getAllStructures();
    return res.status(200).json(response);
}

export async function httpAddNewStructure(req,res){
    let structure = req.body;
    try{ await qadPartFetch(structure.structureID);

    }catch{
        return res.status(400).json({ERROR: "Invalid Request"})
        
    }
    //NEED TO MAKE CHECK AGAINST DATABASE TO SEE IF PART EXITS. 
    return res.status(200).json(await addNewStructure);
}

export async function httpGetActiveStructure(req,res){
    let structureParameters = Number(req.params.id);
    try{
        let structure =  (await getActiveStructure(structureParameters));
        if (!structure){
            throw new Error("Invalid Structure Request");
        }
        return res.status(200).json(structure);

    }catch(error){
        return res.status(400).json({err: 'Invalid Structure Request'})

    }
}
