import { structuresDatabase } from './structure.mongo.mjs'
import { MasterStructure } from './helpers/master-structure.mjs';
import { qadCache } from './helpers/qad-structure-cache.mjs';


export async function getAllStructures(){
    try{
        const currentStrucutres = [];
        const allStructures = await structuresDatabase.find();
        for (let i=0;i<allStructures.length;i++){
            currentStrucutres.push({
                name: allStructures[i].structure.masterStructure.name, 
                description: allStructures[i].structure.masterStructure.attributes.description,
            });
        }
        return currentStrucutres;
        
    }catch{
        return null;
    }
  
}

export async function getActiveStructure(structureParameters){
    const structureID = structureParameters;
    try{
        const dbResponse = await structuresDatabase.findById(structureID);
        if (!dbResponse){
            throw new Error("Structure Not Found");

        }
        dbResponse.timestamp = Date.now();
        await dbResponse.save();
        return dbResponse.structure;

        }catch(e){
            console.log("could not fetch active strucutre");
            return undefined;
        }
}
export async function addNewStructure(structureID){
    try{
        const response = await structuresDatabase.findById(structureID);
        if(response!=null){
            return {status: "Success" , msg: "Already existed in database"};

        }else{
            const partCache = await qadCache([structureID]);
            const currentStructure = new MasterStructure(structureID, partCache);
            await currentStructure.generateMasterStructure();
            const newSubmission = new structuresDatabase({
                _id: structureID,
                structure: currentStructure,
                timestamp: Date.now(),
            });
            await newSubmission.save();
  
            return {status: "Success", msg: "Added to database"}

        }

    }catch{
        return null
    }

}
