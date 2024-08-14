import { testPart } from "../../../data/test-data.mjs";
import  {MasterStructure}  from "./master-structure.mjs";
import { OnHandStructure } from "./onhand-structure.mjs";
import { AvailableStructure } from "./available-structure.mjs";
import { STRUCTURETYPESTITLES } from "../../../utils/misc.mjs";
export const GenerateSubmittedStructure = (masterStructure, qty, structureType)=>{
    let selectedStructure = {};
    // this will be replaced with DB fetch 
    for (let i = 0;i<testPart.length;i++){
        if (testPart[i].name == masterStructure){
            masterStructure = testPart[i];
        }
    }
    console.log("current master structure", masterStructure);
    let availableStructure = new AvailableStructure(masterStructure,qty);
    let onHandStructure = new OnHandStructure(masterStructure,qty);
    onHandStructure.generateOnHandStructure();
    availableStructure.generateAvailableStructure();
    switch(structureType){
        case STRUCTURETYPESTITLES.available:
            selectedStructure = availableStructure.availableStructure;
            break;
        case STRUCTURETYPESTITLES.onHand:
            selectedStructure = onHandStructure.onHandStructure;
            break;
        default:
            console.log("OPTION NOT FOUND!");
            selectedStructure = null;

    }



    return selectedStructure;
}




