import {getAllStructures, getActiveStructure, addNewStructure} from "../../models/structures/structures.model.mjs"
import { qadPartFetch } from "../../services/qad/qad-api.mjs";

export async function httpGetAllStructures(req,res){
    const response = await getAllStructures();
    if (!response){
        return res.status(404).json({"ERROR": "No Structures Found"});

    }else{
        return res.status(200).json(response);
    }
    
}

export async function httpAddNewStructure(req,res){
    let structure = req.body;
    try{ await qadPartFetch(structure.structureID);

    }catch{
        return res.status(400).json({ERROR: "Invalid Request"})
        
    }
    const response = await addNewStructure(structure.structureID);
    if (!response){
        return res.status(500).json({"ERROR": "Could Not Generate Structure"});
    }
    return res.status(200).json(response);
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

