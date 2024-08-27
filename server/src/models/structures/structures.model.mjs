import { Axios } from 'axios';
// this should be changed for actual database instead of test array
import { structures } from '../../testData/test-data.mjs';

export async function getAllStructures(){
    try{
        const currentStrucutres = {};
        for (let i = 0; i<structures.length;i++){
            let currentStructure = {};
            currentStructure = {
                "name": structures[i].name,
                "description": structures[i].masterStructure.attributes.description,
            }
            currentStrucutres[`${structures[i].name}`] = currentStructure;
        }
        console.log("model response", currentStrucutres);
        return currentStrucutres;
        
    }catch{
        return null;
    }
  
}

export async function getActiveStructure(structureParameters){
    console.log(structureParameters)
    const structureID = structureParameters;
    let activeStructure = {};
    try{
        for(let i = 0;i<structures.length;i++){
            if (structures[i].name == structureID){
                console.log(structures[i]);
                return structures[i];
            }
        }
        return {err: "Structure Not Found"}
    }catch(error){
        return {err: `Structure: ${structureID} Failed to Generate`}
    }
}

getActiveStructure("6613200050");

