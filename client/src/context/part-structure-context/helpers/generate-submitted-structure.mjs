import { structures } from "../../../data/test-data.mjs";
import { OnHandStructure } from "./onhand-structure.mjs";
import { AvailableStructure } from "./available-structure.mjs";
import { STRUCTUREOPTIONS } from "../../../utils/misc.mjs";
export const GenerateSubmittedStructure = (masterStructure, qty, structureType)=>{
    let testPart = structures;
    let selectedStructure = {};
    // this will be replaced with DB fetch 
    for (let i = 0;i<testPart.length;i++){
        if (testPart[i].name == masterStructure){
            masterStructure = testPart[i];
        }
    }
    let availableStructure = new AvailableStructure(masterStructure,qty);
    let onHandStructure = new OnHandStructure(masterStructure,qty);
    onHandStructure.generateOnHandStructure();
    availableStructure.generateAvailableStructure();
    switch(structureType){
        case STRUCTUREOPTIONS.available:
            selectedStructure = availableStructure.availableStructure;
            break;
        case STRUCTUREOPTIONS.onHand:
            selectedStructure = onHandStructure.onHandStructure;
            break;
        default:
            console.log("OPTION NOT FOUND!");
            selectedStructure = null;

    }



    return selectedStructure;
}




