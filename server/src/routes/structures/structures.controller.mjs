import {getAllStructures, getActiveStructure} from "../../models/structures/structures.model.mjs"

export async function httpGetAllStructures(req,res){
    if (!await getAllStructures()){
        return res.status(404).json({"err": "Not Found"})


    }
    const response = await getAllStructures();
    return res.status(200).json(response);
}

export async function httpAddNewStructure(req,res){
    let structureID = req.body;
    //NEED TO MAKE CHECK AGAINST DATABASE TO SEE IF PART EXITS. 
    return res.status(200).json(await addNewStructure);
}

export async function httpGetActiveStructutre(req,res){
    let structureParameters = req.body;
    try{
        return res.status(200).json(await getActiveStructure())

    }catch(error){
        return res.status(400).json({err: 'could not generate strucutre'})

    }
}

async function apicall(part){
    let structs = await httpGetAllStructures();
    console.log("31\n" ,structs);
}
apicall("6613700420")